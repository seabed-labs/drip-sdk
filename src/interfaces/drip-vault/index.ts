import { PublicKey, Transaction } from '@solana/web3.js';
import { DepositPreview } from './previews';
import { DepositParams, InitVaultPeriodParams } from './params';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';

// TODO: Currently we don't support trigger DCA through this interface. Add support for it later.
export interface DripVault {
  getDepositPreview(params: DepositParams): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs if TX is too big
  getDepositTx(
    params: DepositParams | DepositPreview
  ): Promise<TransactionWithMetadata<{ positionNftMint: PublicKey; position: PublicKey }>>;
  deposit(params: DepositParams | DepositPreview): Promise<
    BroadcastTransactionWithMetadata<{
      positionNftMint: PublicKey;
      position: PublicKey;
    }>
  >;

  getInitVaultPeriodTx(params: InitVaultPeriodParams): Promise<
    TransactionWithMetadata<{
      vaultPeriodPubkey: PublicKey;
    }>
  >;
  initVaultPeriod(params: InitVaultPeriodParams): Promise<
    BroadcastTransactionWithMetadata<{
      vaultPeriodPubkey: PublicKey;
    }>
  >;
}
