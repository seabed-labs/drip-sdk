import { Address, Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Configs } from '../config';
import { Vault, Token, VaultProtoConfig } from '../config/types';
import { DcaVault } from '../idl/type';
import DcaVaultIDL from '../idl/idl.json';
import { DripQuerier } from '../interfaces';
import {
  VaultAccount,
  VaultPeriodAccount,
  VaultPositionAccount,
  VaultProtoConfigAccount,
} from '../interfaces/drip-querier/results';
import { Network } from '../models';
import { toPubkey } from '../utils';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { ONE } from '../constants';
import { findVaultPositionPubkey } from '../helpers';
import { Granularity } from '../interfaces/drip-admin/params';

export class DripQuerierImpl implements DripQuerier {
  private readonly vaultProgram: Program<DcaVault>;

  constructor(provider: Provider, private readonly network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
  }

  public async getAllVaults(): Promise<Record<string, Vault>> {
    // test
    return Configs[this.network].vaults;
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
    const vaults = Configs[this.network].vaults;
    const tokenAPubkeys = (
      givenTokenB
        ? Object.values(vaults).filter((vault) => vault.tokenBMint.equals(givenTokenB))
        : Object.values(vaults)
    ).map((vault) => vault.tokenAMint);

    return tokenAPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: Configs[this.network].tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
  }

  public async getAllTokenBs(givenTokenA?: PublicKey): Promise<Record<string, Token>> {
    const vaults = Configs[this.network].vaults;
    const tokenBPubkeys = (
      givenTokenA
        ? Object.values(vaults).filter((vault) => vault.tokenAMint.equals(givenTokenA))
        : Object.values(vaults)
    ).map((vault) => vault.tokenBMint);

    return tokenBPubkeys.reduce(
      (map, tokenPubkey) => ({
        ...map,
        [tokenPubkey.toBase58()]: Configs[this.network].tokens[tokenPubkey.toBase58()],
      }),
      {} as Record<string, Token>
    );
  }

  public async getSupportedVaultProtoConfigsForPair(
    tokenA: Address,
    tokenB: Address
  ): Promise<VaultProtoConfig[]> {
    const vaults = Configs[this.network].vaults;
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

    const vaultProtoConfigs = Configs[this.network].vaultProtoConfigs;

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
