import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';

export interface WithdrawBPreview {
  tokenBAmountBeingWithdrawn: BN;
  withdrawnToTokenAccount: PublicKey;
}

export interface ClosePositionPreview {
  tokenAAmountBeingWithdrawn: BN;
  withdrawnToTokenAAccount: PublicKey;
  tokenBAmountBeingWithdrawn: BN;
  withdrawnToTokenBAccount: PublicKey;
}
