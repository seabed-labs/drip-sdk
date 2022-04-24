import { PublicKey } from '@solana/web3.js';

export enum ErrorCode {
  VaultAlreadyExists = 1,
  VaultDoesNotExist,
  VaultPeriodAlreadyExists,
  PositionDoesNotExist,
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

export class VaultDoesNotExistError extends DripError {
  public readonly code = ErrorCode.VaultDoesNotExist;

  public constructor(vaultPubkey: PublicKey) {
    super(`Vault ${vaultPubkey.toBase58()} does not exist`);
  }
}

export class VaultPeriodAlreadyExistsError extends DripError {
  public readonly code = ErrorCode.VaultPeriodAlreadyExists;

  public constructor(vaultPeriodPubkey: PublicKey) {
    super(`Vault period ${vaultPeriodPubkey.toBase58()} already exists`);
  }
}

export class PositionDoesNotExistError extends DripError {
  public readonly code = ErrorCode.PositionDoesNotExist;

  public constructor(positionPubkey: PublicKey) {
    super(`Vault position ${positionPubkey.toBase58()} does not exist`);
  }
}