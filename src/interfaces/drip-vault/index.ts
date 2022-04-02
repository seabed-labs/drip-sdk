import { Transaction } from '@solana/web3.js';
import { DepositPreview } from './previews';
import { DepositParams, GetPositionParams, InitVaultPeriodParams } from './params';
import { DripPosition } from '../drip-position';

export interface DripVault {
  getDepositPreview(params: DepositParams): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs TX is too big
  getDepositTx(params: DepositParams | DepositPreview): Promise<Transaction>;

  getInitVaultPeriodTx(params: InitVaultPeriodParams): Promise<Transaction>;

  getTriggerDCAPreview(): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs TX is too big
  getTriggerDCATx(): Promise<Transaction>;

  getPosition(params: GetPositionParams): Promise<DripPosition>;
}
