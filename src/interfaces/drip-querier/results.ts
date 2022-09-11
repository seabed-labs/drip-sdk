import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

export interface VaultProtoConfigAccount {
  granularity: BN;
  tokenADripTriggerSpread: number;
  tokenBWithdrawalSpread: number;
  tokenBReferralSpread: number;
  admin: PublicKey;
}

export interface VaultAccount {
  protoConfig: PublicKey;
  tokenAMint: PublicKey;
  tokenBMint: PublicKey;
  tokenAAccount: PublicKey;
  tokenBAccount: PublicKey;
  treasuryTokenBAccount: PublicKey;
  whitelistedSwaps: PublicKey[];

  lastDripPeriod: BN;
  dripAmount: BN;
  dripActivationTimestamp: BN;
  bump: number;
  limitSwaps: boolean;
  maxSlippageBps: number;
}

export interface VaultPeriodAccount {
  vault: PublicKey;
  periodId: BN;
  dar: BN;
  twap: BN;
  dripTimestamp: number;
  bump: number;
}

export interface VaultPositionAccount {
  vault: PublicKey;
  positionAuthority: PublicKey;
  referrer: PublicKey;
  depositedTokenAAmount: BN;
  withdrawnTokenBAmount: BN;
  depositTimestamp: BN;
  dripPeriodIdBeforeDeposit: BN;
  numberOfSwaps: BN;
  periodicDripAmount: BN;
  isClosed: boolean;
  bump: number;
}
