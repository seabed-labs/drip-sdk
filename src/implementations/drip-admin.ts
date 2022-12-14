import { Program, AnchorProvider, Address } from '@project-serum/anchor';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from '@solana/web3.js';
import { IDL, Drip } from '../idl/drip';
import { DripAdmin } from '../interfaces';
import {
  InitVaultProtoConfigParams,
  InitVaultParams,
  InitOracleConfigParams,
  SetVaultOracleConfigParams,
  SetVaultSwapWhitelistParams,
} from '../interfaces/drip-admin/params';
import { Network } from '../models';
import {
  InitOracleConfigPreview,
  InitVaultProtoConfigPreview,
  isInitOracleConfigPreview,
  isInitVaultProtoConfigPreview,
} from '../interfaces/drip-admin/previews';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../types';
import { BN } from 'bn.js';
import { ZERO } from '../constants';
import { toPubkey } from '../utils';
import { VaultAlreadyExistsError } from '../errors';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { findVaultPeriodPubkey, findVaultPubkey } from '../helpers';
import { makeExplorerUrl } from '../utils/transaction';

export class DripAdminImpl implements DripAdmin {
  private readonly vaultProgram: Program<Drip>;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  constructor(
    private readonly provider: AnchorProvider,
    private readonly network: Network,
    private readonly programId: Address
  ) {
    this.vaultProgram = new Program(IDL, this.programId, provider);
  }
  public async getSetVaultSwapWhitelistTx(params: SetVaultSwapWhitelistParams): Promise<
    TransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingWhitelist: PublicKey[];
      newWhitelist: PublicKey[];
    }>
  > {
    const vaultAccount = await this.vaultProgram.account.vault.fetchNullable(
      toPubkey(params.vault)
    );
    if (!vaultAccount) {
      throw new Error(`vault ${params.vault.toString()} does not exist`);
    }
    const vaultProtoConfigAccount = await this.vaultProgram.account.vaultProtoConfig.fetchNullable(
      vaultAccount.protoConfig
    );
    if (!vaultProtoConfigAccount) {
      throw new Error(`vault proto config ${vaultAccount.protoConfig.toString()} does not exist`);
    }
    if (this.provider.wallet.publicKey.toString() !== vaultProtoConfigAccount.admin.toString()) {
      throw new Error(
        `current provider wallet ${this.provider.wallet.publicKey.toString()} does not match proto config admin ${vaultProtoConfigAccount.admin.toString()}`
      );
    }
    const tx = await this.vaultProgram.methods
      .setVaultSwapWhitelist({
        whitelistedSwaps: params.whitelistedSwaps.map((adr) => toPubkey(adr)),
      })
      .accounts({
        vaultUpdateCommonAccounts: {
          vault: toPubkey(params.vault),
          vaultProtoConfig: vaultAccount.protoConfig,
          admin: this.provider.wallet.publicKey,
        },
      })
      .transaction();
    return {
      tx,
      metadata: {
        vaultPubkey: toPubkey(params.vault),
        vaultProtoConfig: vaultAccount.protoConfig,
        existingWhitelist: vaultAccount.whitelistedSwaps,
        newWhitelist: params.whitelistedSwaps.map((adr) => toPubkey(adr)),
      },
    };
  }

  public async setVaultSwapWhitelist(params: SetVaultSwapWhitelistParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingWhitelist: PublicKey[];
      newWhitelist: PublicKey[];
    }>
  > {
    const { tx, metadata } = await this.getSetVaultSwapWhitelistTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);
    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public async getSetVaultOracleConfigTx(params: SetVaultOracleConfigParams): Promise<
    TransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingOracleConfig: PublicKey;
      newOracleConfig: PublicKey;
    }>
  > {
    const vaultAccount = await this.vaultProgram.account.vault.fetchNullable(
      toPubkey(params.vault)
    );
    if (!vaultAccount) {
      throw new Error(`vault ${params.vault.toString()} does not exist`);
    }
    const vaultProtoConfigAccount = await this.vaultProgram.account.vaultProtoConfig.fetchNullable(
      vaultAccount.protoConfig
    );
    if (!vaultProtoConfigAccount) {
      throw new Error(`vault proto config ${vaultAccount.protoConfig.toString()} does not exist`);
    }
    if (this.provider.wallet.publicKey.toString() !== vaultProtoConfigAccount.admin.toString()) {
      throw new Error(
        `current provider wallet ${this.provider.wallet.publicKey.toString()} does not match proto config admin ${vaultProtoConfigAccount.admin.toString()}`
      );
    }
    const oracleConfigAccount = await this.vaultProgram.account.oracleConfig.fetchNullable(
      toPubkey(params.newOracleConfig)
    );
    if (!oracleConfigAccount) {
      throw new Error(
        `new vault oracle config ${vaultAccount.oracleConfig.toString()} does not exist`
      );
    }
    const ixAccounts = {
      vaultUpdateCommonAccounts: {
        vault: toPubkey(params.vault),
        vaultProtoConfig: vaultAccount.protoConfig,
        admin: this.provider.wallet.publicKey,
      },
      newOracleConfig: params.newOracleConfig,
    };
    const tx = await this.vaultProgram.methods
      .setVaultOracleConfig()
      .accounts({
        ...ixAccounts,
      })
      .transaction();
    return {
      tx,
      metadata: {
        vaultPubkey: toPubkey(params.vault),
        vaultProtoConfig: vaultAccount.protoConfig,
        existingOracleConfig: vaultAccount.oracleConfig,
        newOracleConfig: toPubkey(params.newOracleConfig),
      },
    };
  }

  public async setVaultOracleConfig(params: SetVaultOracleConfigParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPubkey: PublicKey;
      vaultProtoConfig: PublicKey;
      existingOracleConfig: PublicKey;
      newOracleConfig: PublicKey;
    }>
  > {
    const { tx, metadata } = await this.getSetVaultOracleConfigTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);
    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public getInitOracleConfigPreview(params: InitOracleConfigParams): InitOracleConfigPreview {
    const oracleConfigKeypair = Keypair.generate();
    return {
      ...params,
      oracleConfigKeypair,
    };
  }

  public async getInitOracleProtoConfigTx(
    params: InitOracleConfigParams | InitOracleConfigPreview
  ): Promise<TransactionWithMetadata<{ oracleConfigKeypair: Keypair }>> {
    const oracleConfigKeypair = isInitOracleConfigPreview(params)
      ? params.oracleConfigKeypair
      : Keypair.generate();
    const tx = await this.vaultProgram.methods
      .initOracleConfig({
        enabled: params.enabled,
        source: params.source,
        updateAuthority: toPubkey(params.updateAuthority),
      })
      .accounts({
        oracleConfig: oracleConfigKeypair.publicKey,
        tokenAMint: toPubkey(params.tokenAMint),
        tokenAPrice: toPubkey(params.tokenAPrice),
        tokenBMint: toPubkey(params.tokenBMint),
        tokenBPrice: toPubkey(params.tokenBPrice),
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([oracleConfigKeypair])
      .transaction();

    return {
      tx,
      metadata: {
        oracleConfigKeypair,
      },
    };
  }

  public async initOracleConfig(
    params: InitOracleConfigParams | InitOracleConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ oracleConfigKeypair: Keypair }>> {
    const { tx, metadata } = await this.getInitOracleProtoConfigTx(params);
    const txHash = await this.provider.sendAndConfirm(tx, [metadata.oracleConfigKeypair]);
    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public getInitVaultProtoConfigPreview(
    params: InitVaultProtoConfigParams
  ): InitVaultProtoConfigPreview {
    const vaultProtoConfigKeypair = Keypair.generate();
    return {
      ...params,
      vaultProtoConfigKeypair,
    };
  }

  public async getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>> {
    const { granularity, tokenADripTriggerSpread, tokenBWithdrawalSpread, tokenBReferralSpread } =
      params;
    const vaultProtoConfigKeypair = isInitVaultProtoConfigPreview(params)
      ? params.vaultProtoConfigKeypair
      : Keypair.generate();

    const tx = await this.vaultProgram.methods
      .initVaultProtoConfig({
        granularity: new BN(granularity.toString()),
        tokenADripTriggerSpread,
        tokenBWithdrawalSpread,
        tokenBReferralSpread,
        admin: toPubkey(params.admin),
      })
      .accounts({
        vaultProtoConfig: vaultProtoConfigKeypair.publicKey,
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([vaultProtoConfigKeypair])
      .transaction();

    return {
      tx,
      metadata: {
        vaultProtoConfigKeypair,
      },
    };
  }

  public async initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>> {
    const { tx, metadata } = await this.getInitVaultProtoConfigTx(params);
    const txHash = await this.provider.sendAndConfirm(tx, [metadata.vaultProtoConfigKeypair]);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }

  public async getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>> {
    const vaultPubkey = findVaultPubkey(this.vaultProgram.programId, params);
    const vaultAccount = await this.vaultProgram.account.vault.fetchNullable(vaultPubkey);

    if (vaultAccount) {
      throw new VaultAlreadyExistsError(vaultPubkey);
    }

    const vaultGenesisPeriodId = ZERO;
    const vaultGenesisPeriodPubkey = findVaultPeriodPubkey(this.vaultProgram.programId, {
      vault: vaultPubkey,
      periodId: vaultGenesisPeriodId,
    });

    const initVaultPeriodIxPromise = this.vaultProgram.methods
      .initVaultPeriod({
        periodId: vaultGenesisPeriodId,
      })
      .accounts({
        vaultPeriod: vaultGenesisPeriodPubkey,
        vault: vaultPubkey,
        creator: this.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const [tokenAAccount, tokenBAccount] = await Promise.all([
      getAssociatedTokenAddress(
        toPubkey(params.tokenAMint),
        vaultPubkey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      getAssociatedTokenAddress(
        toPubkey(params.tokenBMint),
        vaultPubkey,
        true,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
    ]);

    const initVaultIx = await this.vaultProgram.methods
      .initVault({
        maxSlippageBps: params.maxSlippageBps,
        whitelistedSwaps: params.whitelistedSwaps.map(toPubkey),
      })
      .accounts({
        vault: vaultPubkey,
        vaultProtoConfig: params.protoConfig,
        tokenAAccount,
        tokenBAccount,
        treasuryTokenBAccount: params.tokenBFeeTreasury,
        tokenAMint: params.tokenAMint,
        tokenBMint: params.tokenBMint,
        creator: this.provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();

    const initVaultPeriodIx = await initVaultPeriodIxPromise;

    const tx = new Transaction({
      recentBlockhash: (await this.provider.connection.getLatestBlockhash()).blockhash,
      feePayer: this.provider.wallet.publicKey,
    })
      .add(initVaultIx)
      .add(initVaultPeriodIx);

    return {
      tx,
      metadata: {
        vaultPubkey,
      },
    };
  }

  public async initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>> {
    const { tx, metadata } = await this.getInitVaultTx(params);
    const txHash = await this.provider.sendAndConfirm(tx);

    return {
      id: txHash,
      explorer: makeExplorerUrl(txHash, this.network),
      metadata,
    };
  }
}
