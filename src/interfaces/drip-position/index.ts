import { PublicKey, Transaction } from '@solana/web3.js';
import { BroadcastTransactionWithMetadata, TransactionWithMetadata } from '../../types';
import { ClosePositionPreview, WithdrawBPreview } from './previews';

export interface DripPosition {
  getWithdrawBPreview(): Promise<WithdrawBPreview>;
  getWithdrawBTx(): Promise<
    TransactionWithMetadata<{
      withdrawnToTokenAccount: PublicKey;
    }>
  >;
  withdrawB(): Promise<
    BroadcastTransactionWithMetadata<{
      withdrawnToTokenAccount: PublicKey;
    }>
  >;

  getClosePositionPreview(): Promise<ClosePositionPreview>;
  getClosePositionTx(): Promise<Transaction>;
  closePosition(): Promise<BroadcastTransactionWithMetadata<undefined>>;
}
