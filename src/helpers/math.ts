import BN from 'bn.js';
import { ZERO } from '../constants';

export function calculateWithdrawTokenAAmount(
  i: BN,
  j: BN,
  numberOfSwaps: BN,
  periodicDripAmount: BN
): BN {
  const completedSwaps = j.sub(i);
  if (numberOfSwaps.lte(completedSwaps)) {
    return ZERO;
  }

  const remainingSwaps = numberOfSwaps.sub(completedSwaps);
  return remainingSwaps.mul(periodicDripAmount);
}

export function calculateWithdrawTokenBAmount(
  i: BN,
  j: BN,
  twapIX64: BN,
  twapJX64: BN,
  periodicDripAmount: BN,
  triggerDcaSpread: BN
): BN {
  if (i.eq(j)) {
    return ZERO;
  }

  // (twap_j * j - twap_i * i) / (j - i)
  const averagePriceFromStartX64 = twapJX64.mul(j).sub(twapIX64.mul(i)).div(j.sub(i));

  // periodic_drip_amount * (j-i)
  const drippedSoFar = periodicDripAmount.mul(j.sub(i));

  // calculate fees (already charged by now during each drip)
  const feesAmount = drippedSoFar.mul(triggerDcaSpread).divn(1e4);

  // subtract fees
  const drippedSoFarAfterFees = drippedSoFar.sub(feesAmount);

  // average_price_from_start * dripped_so_far
  const amountBX64 = averagePriceFromStartX64.mul(drippedSoFarAfterFees);

  return amountBX64.shrn(64);
}
