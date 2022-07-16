import { Address } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export enum ErrorCode {
  VaultAlreadyExists = 1,
  VaultDoesNotExist,
  VaultPeriodAlreadyExists,
  VaultPeriodDoesNotExist,
  VaultProtoConfigDoesNotExist,
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

  public constructor(vaultPubkey: Address) {
    super(`Vault ${vaultPubkey.toString()} already exists`);
  }
}

export class VaultDoesNotExistError extends DripError {
  public readonly code = ErrorCode.VaultDoesNotExist;

  public constructor(vaultPubkey: Address) {
    super(`Vault ${vaultPubkey.toString()} does not exist`);
  }
}

export class VaultProtoConfigDoesNotExistError extends DripError {
  public readonly code = ErrorCode.VaultProtoConfigDoesNotExist;

  public constructor(vaultProtoConfig: Address) {
    super(`Vault Proto Config ${vaultProtoConfig.toString()} does not exist`);
  }
}
export class VaultPeriodAlreadyExistsError extends DripError {
  public readonly code = ErrorCode.VaultPeriodAlreadyExists;

  public constructor(vaultPeriodPubkey: Address) {
    super(`Vault period ${vaultPeriodPubkey.toString()} already exists`);
  }
}

export class VaultPeriodDoesNotExistError extends DripError {
  public readonly code = ErrorCode.VaultPeriodDoesNotExist;

  public constructor(vaultPeriodPubkey: Address) {
    super(`Vault period ${vaultPeriodPubkey.toString()} does not exist`);
  }
}

export class PositionDoesNotExistError extends DripError {
  public readonly code = ErrorCode.PositionDoesNotExist;

  public constructor(positionPubkey: Address) {
    super(`Vault position ${positionPubkey.toString()} does not exist`);
  }
}
