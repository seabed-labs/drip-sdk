import { Address, BN } from '@project-serum/anchor';

export interface DepositPreview {
  vault: Address;
  amount: BN;
  dripAmount: BN;
  dcaCycles: number;
}

export interface TriggerDCA {
  vault: Address;
  amount: BN;
  dripAmount: BN;
  dcaCycles: number;
}
