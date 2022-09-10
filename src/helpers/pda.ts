import { Address, BN } from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { PublicKey } from '@solana/web3.js';
import { CONSTANT_SEEDS } from '../constants';
import { toPubkey, toPubkeyBuffer } from '../utils';

export function findVaultPubkey(
  programId: Address,
  seeds: { protoConfig: Address; tokenAMint: Address; tokenBMint: Address }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [
      Buffer.from(CONSTANT_SEEDS.vault),
      toPubkeyBuffer(seeds.tokenAMint),
      toPubkeyBuffer(seeds.tokenBMint),
      toPubkeyBuffer(seeds.protoConfig),
    ],
    toPubkey(programId)
  );

  return publicKey;
}

export function findVaultPeriodPubkey(
  programId: Address,
  seeds: { vault: Address; periodId: BN }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [
      Buffer.from(CONSTANT_SEEDS.vaultPeriod),
      toPubkeyBuffer(seeds.vault),
      Buffer.from(seeds.periodId.toString()),
    ],
    toPubkey(programId)
  );

  return publicKey;
}

export function findVaultPositionPubkey(
  programId: Address,
  seeds: { positionNftMint: Address }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [Buffer.from(CONSTANT_SEEDS.userPosition), toPubkeyBuffer(seeds.positionNftMint)],
    toPubkey(programId)
  );

  return publicKey;
}

export function findMPLTokenMetadataAccount(
  metaplexProgramId: Address,
  seeds: { mint: Address }
): PublicKey {
  const [publicKey] = findProgramAddressSync(
    [
      Buffer.from(CONSTANT_SEEDS.mplTokenMetadata),
      toPubkeyBuffer(metaplexProgramId),
      toPubkeyBuffer(seeds.mint),
    ],
    toPubkey(metaplexProgramId)
  );

  return publicKey;
}
