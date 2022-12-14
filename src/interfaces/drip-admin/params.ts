import { Address } from '@project-serum/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
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
   * Drip granularity in seconds
   */
  granularity: Granularity | BN;
  /**
   * Drip Trigger spread in basis points
   */
  tokenADripTriggerSpread: number;
  /**
   * Withdrawal spread in basis points
   */
  tokenBWithdrawalSpread: number;
  /**
   * Withdrawal spread in basis points
   */
  tokenBReferralSpread: number;
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
  whitelistedSwaps: Address[];
  maxSlippageBps: number;
}

export interface InitOracleConfigParams {
  tokenAMint: Address;
  tokenAPrice: Address;
  tokenBMint: Address;
  tokenBPrice: Address;
  updateAuthority: Address;

  enabled: boolean;
  source: number;
}

export interface SetVaultOracleConfigParams {
  vault: Address;
  newOracleConfig: Address;
}

export interface SetVaultSwapWhitelistParams {
  vault: Address;
  whitelistedSwaps: Address[];
}
