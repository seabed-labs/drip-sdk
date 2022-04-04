import { Address } from '@project-serum/anchor';
import BN from 'bn.js';
import { Granularity } from '../drip-admin/params';

export interface DCAParamsCycles {
  dcaCycles: number;
}

export interface DCAParamsTime {
  expiry: Date;
}

export function isDcaCyclesParam(obj: any): obj is DCAParamsCycles {
  return obj.dcaCycles != null;
}

export function isDcaTimeParam(obj: any): obj is DCAParamsTime {
  return obj.expiry != null;
}

export function expiryToDcaCycles(expiry: Date, granularity: Granularity): number {
  const nowInSeconds = new Date().getTime() / 1e3;
  const expirySeconds = expiry.getTime() / 1e3;
  const delta = expirySeconds - nowInSeconds;

  return delta / granularity;
}

export interface DepositParams {
  amount: BN;
  dcaParams: DCAParamsCycles | DCAParamsTime;
}

export interface InitVaultPeriodParams {
  periodId: BN;
}
