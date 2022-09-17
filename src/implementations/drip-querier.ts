import { Address, Program, AnchorProvider, BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Vault, Token, VaultProtoConfig } from '../config/types';
import { Drip } from '../idl/type';
import DripIDL from '../idl/idl.json';
import { DripQuerier, QuoteToken } from '../interfaces';
import {
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfigAccount,
} from '../interfaces/drip-querier/results';
import { toPubkey } from '../utils';
import { getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { findVaultPeriodPubkey, findVaultPositionPubkey } from '../helpers';
import {
  PositionDoesNotExistError,
  VaultDoesNotExistError,
  VaultPeriodDoesNotExistError,
  VaultProtoConfigDoesNotExistError,
} from '../errors';
import Decimal from 'decimal.js';
import { Config } from '../config';

export class DripQuerierImpl implements DripQuerier {
  private readonly vaultProgram: Program<Drip>;

  constructor(provider: AnchorProvider, private readonly config: Config) {
    this.vaultProgram = new Program(DripIDL as unknown as Drip, config.programId, provider);
  }

  async getAveragePrice(positionPubkey: Address, quoteToken: QuoteToken): Promise<Decimal> {
    const [position] = await this.fetchVaultPositionAccounts(positionPubkey);
    if (!position) {
      throw new PositionDoesNotExistError(positionPubkey);
    }

    const [vault] = await this.fetchVaultAccounts(position.vault);
    if (!vault) {
      throw new VaultDoesNotExistError(position.vault);
    }

    const [vaultProtoConfig] = await this.fetchVaultProtoConfigAccounts(vault.protoConfig);
    if (!vaultProtoConfig) {
      throw new VaultProtoConfigDoesNotExistError(vault.protoConfig);
    }

    const [positionStartPeriodId, positionCurrentPeriodId] = [
      position.dripPeriodIdBeforeDeposit,
      BN.min(position.dripPeriodIdBeforeDeposit.add(position.numberOfSwaps), vault.lastDripPeriod),
    ];

    const [startPeriodPubkey, currentPeriodPubkey] = [
      findVaultPeriodPubkey(this.vaultProgram.programId, {
        vault: position.vault,
        periodId: positionStartPeriodId,
      }),
      findVaultPeriodPubkey(this.vaultProgram.programId, {
        vault: position.vault,
        periodId: positionCurrentPeriodId,
      }),
    ];

    const [startPeriod, currentPeriod] = await this.fetchVaultPeriodAccounts(
      startPeriodPubkey,
      currentPeriodPubkey
    );

    const [tokenA, tokenB] = await Promise.all([
      getMint(this.vaultProgram.provider.connection, vault.tokenAMint),
      getMint(this.vaultProgram.provider.connection, vault.tokenBMint),
    ]);

    if (!startPeriod) {
      throw new VaultPeriodDoesNotExistError(startPeriodPubkey);
    }

    if (!currentPeriod) {
      throw new VaultPeriodDoesNotExistError(currentPeriodPubkey);
    }

    const [twapStartX64, twapCurrentX64] = [startPeriod.twap, currentPeriod.twap];

    const averageBOverAPriceX64 = twapCurrentX64
      .mul(positionCurrentPeriodId)
      .sub(twapStartX64.mul(positionStartPeriodId))
      .div(positionCurrentPeriodId.sub(positionStartPeriodId));

    const averageBOverAPriceDecimalX64 = new Decimal(averageBOverAPriceX64.toString());
    const averageBOverAPriceDecimalRaw = averageBOverAPriceDecimalX64.div(new Decimal(2).pow(64));
    const averageBOverAPriceDecimal = averageBOverAPriceDecimalRaw
      .mul(new Decimal(10).pow(tokenA.decimals))
      .div(new Decimal(10).pow(tokenB.decimals));

    const dripSpreadA = vaultProtoConfig.tokenADripTriggerSpread;
    const withdrawSpreadB =
      vaultProtoConfig.tokenBWithdrawalSpread + vaultProtoConfig.tokenBReferralSpread;
    const oneE4 = new Decimal(1e4);

    const priceMultiplierNumerator = oneE4.sub(dripSpreadA).mul(oneE4.sub(withdrawSpreadB));
    const priceMultiplierDenominator = oneE4.mul(oneE4);

    switch (quoteToken) {
      case QuoteToken.TokenB:
        return averageBOverAPriceDecimal
          .mul(priceMultiplierNumerator)
          .div(priceMultiplierDenominator);
      case QuoteToken.TokenA:
        const averageAOverBPriceDecimals = new Decimal(1).div(averageBOverAPriceDecimal);
        return averageAOverBPriceDecimals
          .mul(priceMultiplierDenominator)
          .div(priceMultiplierNumerator);
    }
  }

  public async getAllVaults(): Promise<Record<string, Vault>> {
    // test
    return this.config.vaults;
  }

  public async getAllPositions(user: Address): Promise<Record<string, VaultPositionAccount>> {
    const userPubkey = toPubkey(user);
    const userTokenAccounts =
      await this.vaultProgram.provider.connection.getParsedTokenAccountsByOwner(userPubkey, {
        programId: TOKEN_PROGRAM_ID,
      });

    const userPossibleNftAccounts = userTokenAccounts.value.filter((tokenAccountData) => {
      const tokenAmount = tokenAccountData.account.data.parsed.info.tokenAmount.amount;
      return tokenAmount === '1';
    });

    const userPossibleNftMints: PublicKey[] = userPossibleNftAccounts.map((nftAccount) =>
      toPubkey(nftAccount.account.data.parsed.info.mint)
    );

    const userPossiblePositionAccounts = userPossibleNftMints.map((mintPubkey) =>
      findVaultPositionPubkey(this.vaultProgram.programId, {
        positionNftMint: mintPubkey,
      })
    );

    const userPositionAccounts = (await this.vaultProgram.account.position.fetchMultiple(
      userPossiblePositionAccounts
    )) as (VaultPositionAccount | null)[];

    return userPositionAccounts.reduce(
      (map, position, i) => ({
        ...map,
        ...(position ? { [userPossiblePositionAccounts[i].toBase58()]: position } : {}),
      }),
      {}
    );
  }

  public async getAllTokenAs(givenTokenB?: PublicKey): Promise<Record<string, Token>> {
    const vaults = this.config.vaults;
    const tokenAPubkeys = (
      givenTokenB
        ? Object.values(vaults).filter((vault) => vault.tokenBMint.equals(givenTokenB))
        : Object.values(vaults)
    ).map((vault) => vault.tokenAMint);

    return tokenAPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: this.config.tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
  }

  public async getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>> {
    const vaults = this.config.vaults;
    const tokenBPubkeys = (
      givenTokenA
        ? Object.values(vaults).filter((vault) => vault.tokenAMint.equals(givenTokenA))
        : Object.values(vaults)
    ).map((vault) => vault.tokenBMint);

    return tokenBPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: this.config.tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
  }

  public async getSupportedVaultProtoConfigsForPair(
    tokenA: Address,
    tokenB: Address
  ): Promise<VaultProtoConfig[]> {
    const vaults = this.config.vaults;
    const vaultsForPair = Object.values(vaults).filter(
      (vault) =>
        vault.tokenAMint.equals(toPubkey(tokenA)) && vault.tokenBMint.equals(toPubkey(tokenB))
    );

    const vaultProtoConfigKeysForPairMap = vaultsForPair.reduce(
      (acc, vault) => ({
        ...acc,
        [vault.protoConfig.toBase58()]: true,
      }),
      {} as Partial<Record<string, boolean>>
    );

    const vaultProtoConfigs = this.config.vaultProtoConfigs;

    return Object.values(vaultProtoConfigs).filter(
      (vaultProtoConfig) => !!vaultProtoConfigKeysForPairMap[vaultProtoConfig.pubkey.toBase58()]
    );
  }

  public async fetchVaultProtoConfigAccounts(
    ...pubkeys: Address[]
  ): Promise<(VaultProtoConfigAccount | null)[]> {
    return (await this.vaultProgram.account.vaultProtoConfig.fetchMultiple(
      pubkeys
    )) as (VaultProtoConfigAccount | null)[];
  }

  public async fetchVaultAccounts(...pubkeys: Address[]): Promise<(VaultAccount | null)[]> {
    return (await this.vaultProgram.account.vault.fetchMultiple(
      pubkeys
    )) as (VaultAccount | null)[];
  }

  public async fetchVaultPeriodAccounts(
    ...pubkeys: Address[]
  ): Promise<(VaultPeriodAccount | null)[]> {
    return (await this.vaultProgram.account.vaultPeriod.fetchMultiple(
      pubkeys
    )) as (VaultPeriodAccount | null)[];
  }

  public async fetchVaultPositionAccounts(
    ...pubkeys: Address[]
  ): Promise<(VaultPositionAccount | null)[]> {
    return (await this.vaultProgram.account.position.fetchMultiple(
      pubkeys
    )) as (VaultPositionAccount | null)[];
  }
}
