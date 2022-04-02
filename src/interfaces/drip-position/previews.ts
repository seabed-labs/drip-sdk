import BN from 'bn.js';

export interface WithdrawBPreview {
  tokenBAmountBeingWithdrawn: BN;
}

export interface ClosePositionPreview {
  tokenAAmountBeingWithdrawn: BN;
  tokenBAmountBeingWithdrawn: BN;
}
