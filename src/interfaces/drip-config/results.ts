import { PublicKey } from '@solana/web3.js';

export interface Token {
  mint: PublicKey;
  decimals: number;
  symbol?: string;
  iconUrl?: string;
}

export interface VaultProtoConfig {
  pubkey: PublicKey;
  granularity: number;
}

export interface Vault {
  pubkey: PublicKey;
  protoConfig: PublicKey;
  tokenAMint: PublicKey;
  tokenBMint: PublicKey;
  tokenAAccount: PublicKey;
  tokenBAccount: PublicKey;
  treasuryTokenBAccount: PublicKey;
  oracleConfig?: PublicKey;
  maxSlippageBps: number;
  maxPriceDeviationBps: number;
}
