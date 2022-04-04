import { PublicKey, Transaction } from '@solana/web3.js';
import { DepositPreview } from './previews';
import { DepositParams, GetPositionParams, InitVaultPeriodParams } from './params';
import { DripPosition } from '../drip-position';
import { TransactionWithMetadata } from '../../types';
import { Address } from '@project-serum/anchor';

export interface DripVault {
  getDepositPreview(params: DepositParams): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs TX is too big
  getDepositTx(
    params: DepositParams | DepositPreview
  ): Promise<TransactionWithMetadata<{ positionNftMint: PublicKey; position: PublicKey }>>;

  getInitVaultPeriodTx(params: InitVaultPeriodParams): Promise<Transaction>;

  getTriggerDCAPreview(): Promise<DepositPreview>;
  // Might need to return an abstraction that holds multiple TXs TX is too big
  getTriggerDCATx(): Promise<Transaction>;

  getPosition(params: GetPositionParams): Promise<DripPosition>;
}
