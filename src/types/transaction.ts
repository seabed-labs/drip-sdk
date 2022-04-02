import { Transaction } from '@solana/web3.js';

export type TransactionWithMetadata<T> = {
  tx: Transaction;
  metadata: T;
};
