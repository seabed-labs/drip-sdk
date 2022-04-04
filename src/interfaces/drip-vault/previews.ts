import { Address, BN } from '@project-serum/anchor';

export interface DepositPreview {
  vault: Address;
  amount: BN;
  dripAmount: BN;
  dcaCycles: number;
}

export function isDepositPreview(obj: any): obj is DepositPreview {
  return Boolean(obj.dcaCycles);
}
