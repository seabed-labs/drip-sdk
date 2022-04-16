import { PublicKey } from '@solana/web3.js';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';
import { InitVaultParams, InitVaultProtoConfigParams } from './params';
import { InitVaultProtoConfigPreview } from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>>;
  initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>>;

  getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
  initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
}
