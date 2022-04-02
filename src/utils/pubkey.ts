import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export function toPubkey(addr: Address): PublicKey {
  return new PublicKey(addr.toString());
}

export function toPubkeyBuffer(addr: Address): Buffer {
  return toPubkey(addr).toBuffer();
}
