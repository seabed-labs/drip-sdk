import { Address } from '@project-serum/anchor';
import BN from 'bn.js';

export interface DCAParamsCycles {
  dcaCycles: number;
}

export interface DCAParamsTime {
  expiry: Date;
}

export interface DepositParams {
  amount: BN;
  dcaParams: DCAParamsCycles | DCAParamsTime;
}

export interface InitVaultPeriodParams {
  periodId: BN;
}

export type GetPositionParams =
  | {
      positionMintPublicKey: Address;
    }
  | {
      positionPublicKey: Address;
    };
