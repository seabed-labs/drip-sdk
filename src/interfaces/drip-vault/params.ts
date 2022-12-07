import { Address } from '@project-serum/anchor';
import BN from 'bn.js';
import { Granularity } from '../drip-admin/params';

export interface DripParamsNumberOfSwaps {
  numberOfSwaps: number;
}

export interface DripParamsTime {
  expiry: Date;
}

export function isDripCyclesParam(obj: any): obj is DripParamsNumberOfSwaps {
  return obj.numberOfSwaps != null;
}

export function isDripTimeParam(obj: any): obj is DripParamsTime {
  return obj.expiry != null;
}

export function expiryToNumberOfSwaps(expiry: Date, granularity: Granularity): number {
  const nowInSeconds = new Date().getTime() / 1e3;
  const expirySeconds = expiry.getTime() / 1e3;
  const delta = expirySeconds - nowInSeconds;

  return Math.ceil(delta / granularity);
}

export interface DepositParams {
  amount: BN;
  dripParams: DripParamsNumberOfSwaps | DripParamsTime;
  referrer?: Address;
}

export interface InitVaultPeriodParams {
  periodId: BN;
}
