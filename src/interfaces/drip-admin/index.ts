import { PublicKey } from '@solana/web3.js';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';
import {
  InitTokenSwapParams,
  InitVaultParams,
  InitVaultPeriodParams,
  InitVaultProtoConfigParams,
} from './params';
import { InitVaultProtoConfigPreview } from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<TransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>>;
  initVaultProtoConfig(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<BroadcastTransactionWithMetadata<{ vaultProtoConfigPubkey: PublicKey }>>;

  getInitVaultPeriodTx(
    params: InitVaultPeriodParams
  ): Promise<TransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>>;
  initVaultPeriod(
    params: InitVaultPeriodParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPeriodPubkey: PublicKey }>>;

  getInitVaultTx(
    params: InitVaultParams
  ): Promise<TransactionWithMetadata<{ vaultPubkey: PublicKey }>>;
  initVault(
    params: InitVaultParams
  ): Promise<BroadcastTransactionWithMetadata<{ vaultPubkey: PublicKey }>>;

  // getInitTokenSwapTx(
  //   params: InitTokenSwapParams
  // ): Promise<TransactionWithMetadata<{ swapPubkey: PublicKey }>>;

  // initTokenSwap(
  //   params: InitTokenSwapParams
  // ): Promise<BroadcastTransactionWithMetadata<{ swapPubkey: PublicKey }>>;
}
