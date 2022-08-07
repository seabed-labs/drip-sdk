import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

export interface VaultProtoConfigAccount {
  granularity: BN;
  tokenADripTriggerSpread: number;
  tokenBWithdrawalSpread: number;
  admin: PublicKey;
}

export interface VaultAccount {
  protoConfig: PublicKey;
  tokenAMint: PublicKey;
  tokenBMint: PublicKey;
  tokenAAccount: PublicKey;
  tokenBAccount: PublicKey;
  treasuryTokenBAccount: PublicKey;
  lastDripPeriod: BN;
  dripAmount: BN;
  dripActivationTimestamp: BN;
  bump: number;
  whitelistedSwaps: PublicKey[];
}

export interface VaultPeriodAccount {
  vault: PublicKey;
  periodId: BN;
  twap: BN;
  dar: BN;
  bump: number;
  dripTimestamp: number;
}

export interface VaultPositionAccount {
  vault: PublicKey;
  positionAuthority: PublicKey;
  depositedTokenAAmount: BN;
  withdrawnTokenBAmount: BN;
  depositTimestamp: BN;
  dripPeriodIdBeforeDeposit: BN;
  numberOfSwaps: BN;
  periodicDripAmount: BN;
  isClosed: boolean;
  bump: number;
}
