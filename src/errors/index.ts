import { PublicKey } from '@solana/web3.js';

export enum ErrorCode {
  VaultAlreadyExists = 1,
}

export abstract class DripError extends Error {
  public abstract readonly code: ErrorCode;

  public static isDripError(error: Error): error is DripError {
    return !!(error as any).code;
  }
}

export class VaultAlreadyExistsError extends DripError {
  public readonly code = ErrorCode.VaultAlreadyExists;

  public constructor(vaultPubkey: PublicKey) {
    super(`Vault ${vaultPubkey.toBase58()} already exists`);
  }
}
