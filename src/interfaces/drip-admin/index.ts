import { Keypair, PublicKey } from '@solana/web3.js';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';
import { InitVaultParams, InitVaultProtoConfigParams } from './params';
import { InitVaultProtoConfigPreview } from './previews';

export * from './params';
export * from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>>;
  initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigKeypair: Keypair }>>;

  getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
  initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
}
