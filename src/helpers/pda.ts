import { Address, BN } from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { PublicKey } from '@solana/web3.js';
import { CONSTANT_SEEDS } from '../constants';
import { toPubkey, toPubkeyBuffer } from '../utils';

export function findVaultPubkey(
  vaultProgramId: Address,
  seeds: { protoConfig: Address; tokenAMint: Address; tokenBMint: Address }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [
      Buffer.from(CONSTANT_SEEDS.vault),
      toPubkeyBuffer(seeds.tokenAMint),
      toPubkeyBuffer(seeds.tokenBMint),
      toPubkeyBuffer(seeds.protoConfig),
    ],
    toPubkey(vaultProgramId)
  );
  return publicKey;
}

export function findVaultPeriodPubkey(
  vaultProgramId: Address,
  seeds: { vault: Address; periodId: BN }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [
      Buffer.from(CONSTANT_SEEDS.vaultPeriod),
      toPubkeyBuffer(seeds.vault),
      Buffer.from(seeds.periodId.toString()),
    ],
    toPubkey(vaultProgramId)
  );
  return publicKey;
}

export function findVaultPositionPubkey(
  vaultProgramId: Address,
  seeds: { positionNftMint: Address }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [Buffer.from(CONSTANT_SEEDS.userPosition), toPubkeyBuffer(seeds.positionNftMint)],
    toPubkey(vaultProgramId)
  );
  return publicKey;
}

export function findTokenSwapPubkey(tokenProgramId: Address, seeds: { swap: Address }): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [Buffer.from(CONSTANT_SEEDS.userPosition), toPubkeyBuffer(seeds.swap)],
    toPubkey(tokenProgramId)
  );
  return publicKey;
}
