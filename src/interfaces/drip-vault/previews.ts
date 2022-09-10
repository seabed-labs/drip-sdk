import { Address, BN } from '@project-serum/anchor';

export interface DepositPreview {
  vault: Address;
  referrer?: Address;
  amount: BN;
  dripAmount: BN;
  numberOfSwaps: number;
}

export function isDepositPreview(obj: any): obj is DepositPreview {
  return Boolean(obj.numberOfSwaps);
}
