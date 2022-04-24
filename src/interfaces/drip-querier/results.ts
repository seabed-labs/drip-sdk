import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import * as Config from '../../config/types';

export type Vault = Config.Vault;
export type VaultProtoConfig = Config.VaultProtoConfig;
export type Token = Config.Token;

export interface VaultProtoConfigAccount {
  granularity: BN;
  triggerDcaSpread: number;
  baseWithdrawalSpread: number;
}

export interface VaultAccount {
  protoConfig: PublicKey;
  tokenAMint: PublicKey;
  tokenBMint: PublicKey;
  tokenAAccount: PublicKey;
  tokenBAccount: PublicKey;
  treasuryTokenBAccount: PublicKey;
  lastDcaPeriod: BN;
  dripAmount: BN;
  dcaActivationTimestamp: BN;
  bump: number;
}

export interface VaultPeriodAccount {
  vault: PublicKey;
  periodId: BN;
  twap: BN;
  dar: BN;
  bump: number;
}

export interface VaultPositionAccount {
  positionAuthority: PublicKey;
  depositedTokenAAmount: BN;
  withdrawnTokenBAmount: BN;
  vault: PublicKey;
  depositTimestamp: BN;
  dcaPeriodIdBeforeDeposit: BN;
  numberOfSwaps: BN;
  periodicDripAmount: BN;
  isClosed: boolean;
  bump: number;
}
