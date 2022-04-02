import { Program, Provider } from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
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
import { TransactionWithMetadata } from '../types';
import { BN } from 'bn.js';

export class DripAdminImpl implements DripAdmin {
  private readonly vaultProgram: Program<DcaVault>;

  // For now we can do this, but we should transition to taking in a read-only connection here instead and
  // letting users only pass in signer at the end if they choose to else sign and broadcast the tx themselves
  // We should also decouple anchor from this to make it an actual SDK
  constructor(private readonly provider: Provider, network: Network) {
    const config = Configs[network];
    this.vaultProgram = new Program(DcaVaultIDL as DcaVault, config.vaultProgramId, provider);
  }

  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview {
    const vaultProtoConfigKeypair = Keypair.generate();

    return {
      ...params,
      vaultProtoConfigKeypair,
    };
  }

  async getInitVaultProtoConfigTx(
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

  getInitVaultTx(params: InitVaultParams): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }
}
