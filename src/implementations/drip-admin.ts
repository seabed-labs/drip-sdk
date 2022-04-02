import { Program, Provider } from '@project-serum/anchor';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from '@solana/web3.js';
import { Configs } from '../config';
import { DcaVault } from '../idl/type';
import DcaVaultIDL from '../idl/idl.json';
import { DripAdmin } from '../interfaces';
import { InitVaultProtoConfigParams, InitVaultParams } from '../interfaces/drip-admin/params';
import { Network } from '../models';
import {
  InitVaultProtoConfigPreview,
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
import { makeSolscanUrl } from '../utils/transaction';

export class DripAdminImpl implements DripAdmin {
  private readonly vaultProgram: Program<DcaVault>;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  constructor(private readonly provider: Provider, private readonly network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
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
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>> {
    const { granularity, triggerDcaSpread, baseWithdrawalSpread } = params;
    const vaultProtoConfigKeypair = isInitVaultProtoConfigPreview(params)
      ? params.vaultProtoConfigKeypair
      : Keypair.generate();

    const tx = await this.vaultProgram.methods
      .initVaultProtoConfig({
        granularity: new BN(granularity.toString()),
        triggerDcaSpread,
        baseWithdrawalSpread,
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
        vaultProtoConfigPubkey: vaultProtoConfigKeypair.publicKey,
      },
    };
  }

  public async initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>> {
    const { tx, metadata } = await this.getInitVaultProtoConfigTx(params);
    const txHash = await this.provider.send(tx);

    return {
      id: txHash,
      solscan: makeSolscanUrl(txHash, this.network),
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
        tokenAMint: params.tokenAMint,
        tokenBMint: params.tokenBMint,
        vaultProtoConfig: params.protoConfig,
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
      .initVault()
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

    const tx = new Transaction().add(initVaultIx).add(initVaultPeriodIx);

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
    const txHash = await this.provider.send(tx);

    return {
      id: txHash,
      solscan: makeSolscanUrl(txHash, this.network),
      metadata,
    };
  }
}
