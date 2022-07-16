import { Address } from '@project-serum/anchor';
import BN from 'bn.js';

export enum Granularity {
  Minutely = 60,
  Hourly = 60 * 60,
  Daily = 24 * 60 * 60,
  Weekly = 7 * 24 * 60 * 60,
  Monthly = 30 * 24 * 60 * 60,
  Yearly = 365.25 * 24 * 60 * 60,
}

export interface InitVaultProtoConfigParams {
  /**
   * DCA granularity in seconds
   */
  granularity: Granularity | BN;
  /**
   * Trigger DCA spread in basis points
   */
  triggerDcaSpread: number;
  /**
   * Withdrawal spread in basis points
   */
  baseWithdrawalSpread: number;
  /**
   * Vault Admin
   */
  admin: Address;
}

export interface InitVaultParams {
  protoConfig: Address;
  tokenAMint: Address;
  tokenBMint: Address;
  tokenBFeeTreasury: Address;
}
