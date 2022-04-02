import { PublicKey, Transaction } from '@solana/web3.js';
import { PDA, TransactionWithMetadata } from '../../types';
import { InitVaultParams, InitVaultProtoConfigParams } from './params';
import { InitVaultProtoConfigPreview } from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>>;
  getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
  getVaultPDA(params: InitVaultParams): PDA;
}
