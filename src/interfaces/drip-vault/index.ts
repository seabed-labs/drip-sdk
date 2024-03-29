import { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { DepositPreview } from './previews';
import { DepositParams, InitVaultPeriodParams } from './params';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';

export * from './params';
export * from './previews';

// TODO: Currently we don't support dripXXX through this interface. Add support for it later.
export interface DripVault {
  getDepositPreview(params: DepositParams): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs if TX is too big
  getDepositTx(
    params: DepositParams | DepositPreview
  ): Promise<TransactionWithMetadata<{ positionNftMint: Keypair; position: PublicKey }>>;
  deposit(params: DepositParams | DepositPreview): Promise<
    BroadcastTransactionWithMetadata<{
      positionNftMint: Keypair;
      position: PublicKey;
    }>
  >;

  getDepositWithMetadataTx(params: DepositParams | DepositPreview): Promise<
    TransactionWithMetadata<{
      positionNftMint: Keypair;
      position: PublicKey;
      positionMetadataAccount: PublicKey;
    }>
  >;
  depositWithMetadata(params: DepositParams | DepositPreview): Promise<
    BroadcastTransactionWithMetadata<{
      positionNftMint: Keypair;
      position: PublicKey;
      positionMetadataAccount: PublicKey;
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
