import { Transaction } from '@solana/web3.js';
import { ClosePositionPreview, WithdrawBPreview } from './previews';

export interface DripPosition {
  getWithdrawBPreview(): Promise<WithdrawBPreview>;
  getWithdrawBTx(): Promise<Transaction>;

  getClosePositionPreview(): Promise<ClosePositionPreview>;
  getClosePositionTx(): Promise<Transaction>;
}
