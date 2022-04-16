import { Address, BN, Program, Provider } from '@project-serum/anchor';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import { DripVault } from '../interfaces';
import { Network } from '../models';
import DcaVaultIDL from '../idl/idl.json';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from '@solana/web3.js';
import {
  DepositParams,
  InitVaultPeriodParams,
  isDcaCyclesParam,
  expiryToDcaCycles,
} from '../interfaces/drip-vault/params';
import { DepositPreview, isDepositPreview } from '../interfaces/drip-vault/previews';
import { toPubkey } from '../utils';
import { findVaultPeriodPubkey, findVaultPositionPubkey, findVaultPubkey } from '../helpers';
import { VaultDoesNotExistError, VaultPeriodAlreadyExistsError } from '../errors';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../types';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { makeSolscanUrl } from '../utils/transaction';

export class DripVaultImpl implements DripVault {
  private readonly vaultProgram: Program<DcaVault>;
  private readonly vaultPubkey: PublicKey;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  private constructor(
    private readonly provider: Provider,
    private readonly network: Network,
    vaultPubkey: Address
  ) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
    this.vaultPubkey = toPubkey(vaultPubkey);
  }

  public static async fromVaultSeeds(
    vaultSeeds: { protoConfig: Address; tokenAMint: Address; tokenBMint: Address },
    provider: Provider,
    network: Network
  ): Promise<DripVaultImpl> {
    const vaultPubkey = findVaultPubkey(Configs[network].vaultProgramId, vaultSeeds);
    const config = Configs[network];
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(vaultPubkey);
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public static async fromVaultPubkey(
    vaultPubkey: Address,
    provider: Provider,
    network: Network
  ): Promise<DripVaultImpl> {
    const config = Configs[network];
    const vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);

    const vault = await vaultProgram.account.vault.fetchNullable(vaultPubkey);
    if (!vault) {
      throw new VaultDoesNotExistError(toPubkey(vaultPubkey));
    }

    return new DripVaultImpl(provider, network, vaultPubkey);
  }

  public async getDepositPreview(params: DepositParams): Promise<DepositPreview> {
    const vault = await this.vaultProgram.account.vault.fetch(this.vaultPubkey);
    const vaultProtoConfig = await this.vaultProgram.account.vaultProtoConfig.fetch(
      vault.protoConfig
    );

    const dcaCycles = isDcaCyclesParam(params.dcaParams)
      ? params.dcaParams.dcaCycles
      : expiryToDcaCycles(params.dcaParams.expiry, vaultProtoConfig.granularity.toNumber());

    const dripAmount = params.amount.divn(dcaCycles);

    return {
      vault: this.vaultPubkey,
      amount: params.amount,
      dripAmount,
      dcaCycles,
    };
  }

  public async getDepositTx(
    params: DepositParams | DepositPreview
  ): Promise<TransactionWithMetadata<{ positionNftMint: PublicKey; position: PublicKey }>> {
    const preview = isDepositPreview(params) ? params : await this.getDepositPreview(params);
    const vault = await this.vaultProgram.account.vault.fetchNullable(preview.vault);

    if (!vault) {
      throw new VaultDoesNotExistError(toPubkey(preview.vault));
    }

    const currentPeriodId = vault.periodId;
    const depositExpiryPeriodId = vault.periodId.addn(preview.dcaCycles);

    const currentPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: preview.vault,
      periodId: currentPeriodId,
    });

    const depositExpiryPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: preview.vault,
      periodId: depositExpiryPeriodId,
    });

    const [currentPeriod, depositExpiryPeriod] = await Promise.all([
      this.vaultProgram.account.vaultPeriod.fetchNullable(currentPeriodPubkey),
      this.vaultProgram.account.vaultPeriod.fetchNullable(depositExpiryPeriodPubkey),
    ]);

    let tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    });

    if (!currentPeriod) {
      const { tx: initCurrentPeriodTx } = await this.getInitVaultPeriodTx({
        periodId: currentPeriodId,
      });
      tx = tx.add(...initCurrentPeriodTx.instructions);
    }

    if (!depositExpiryPeriod) {
      const { tx: initExpiryPeriodTx } = await this.getInitVaultPeriodTx({
        periodId: depositExpiryPeriodId,
      });
      tx = tx.add(...initExpiryPeriodTx.instructions);
    }

    const positionMintKeypair = Keypair.generate();
    const positionPubkey = findVaultPositionPubkey(this.vaultProgram.programId, {
      positionNftMint: positionMintKeypair.publicKey,
    });

    const [userTokenAAccount, userPositionNftAccount] = await Promise.all([
      // TODO: For now, we'll assume the caller has an ATA with enough Token A for the deposit
      getAssociatedTokenAddress(
        toPubkey(vault.tokenAMint),
        this.provider.wallet.publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      getAssociatedTokenAddress(
        positionMintKeypair.publicKey,
        this.provider.wallet.publicKey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
    ]);

    const depositIx = await this.vaultProgram.methods
      .deposit({
        tokenADepositAmount: preview.amount,
        dcaCycles: new BN(preview.dcaCycles),
      })
      .accounts({
        vault: this.vaultPubkey,
        vaultPeriodEnd: depositExpiryPeriodPubkey,
        userPosition: positionPubkey,
        tokenAMint: vault.tokenAMint,
        userPositionNftMint: positionMintKeypair.publicKey,
        vaultTokenAAccount: vault.tokenAAccount,
        userTokenAAccount,
        userPositionNftAccount,
        depositor: this.provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    tx = tx.add(depositIx);
    tx.partialSign(positionMintKeypair);

    return {
      tx,
      metadata: {
        positionNftMint: positionMintKeypair.publicKey,
        position: positionPubkey,
      },
    };
  }

  async deposit(
    params: DepositParams | DepositPreview
  ): Promise<
    BroadcastTransactionWithMetadata<{ positionNftMint: PublicKey; position: PublicKey }>
  > {
    const { tx, metadata } = await this.getDepositTx(params);
    const txHash = await this.provider.send(tx);

    return {
      id: txHash,
      solscan: makeSolscanUrl(txHash, this.network),
      metadata,
    };
  }

  public async getInitVaultPeriodTx(
    params: InitVaultPeriodParams
  ): Promise<TransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>> {
    const { periodId } = params;

    const vault = await this.vaultProgram.account.vault.fetch(this.vaultPubkey);

    const vaultPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: this.vaultPubkey,
      periodId,
    });

    const vaultPeriod = await this.vaultProgram.account.vaultPeriod.fetchNullable(
      vaultPeriodPubkey
    );

    if (vaultPeriod) {
      throw new VaultPeriodAlreadyExistsError(vaultPeriodPubkey);
    }

    const tx = await this.vaultProgram.methods
      .initVaultPeriod({
        periodId,
      })
      .accounts({
        vaultPeriod: vaultPeriodPubkey,
        vault: this.vaultPubkey,
        tokenAMint: vault.tokenAMint,
        tokenBMint: vault.tokenBMint,
        vaultProtoConfig: vault.protoConfig,
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    return {
      tx,
      metadata: {
        vaultPeriodPubkey,
      },
    };
  }

  async initVaultPeriod(params: InitVaultPeriodParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPeriodPubkey: PublicKey;
    }>
  > {
    const { tx, metadata } = await this.getInitVaultPeriodTx(params);
    const txHash = await this.provider.send(tx);

    return {
      id: txHash,
      solscan: makeSolscanUrl(txHash, this.network),
      metadata,
    };
  }
}
