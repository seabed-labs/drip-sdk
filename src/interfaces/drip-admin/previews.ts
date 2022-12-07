import { Keypair } from '@solana/web3.js';
import { InitOracleConfigParams, InitVaultProtoConfigParams } from './params';

export interface InitVaultProtoConfigPreview extends InitVaultProtoConfigParams {
  vaultProtoConfigKeypair: Keypair;
}

export function isInitVaultProtoConfigPreview(obj: any): obj is InitVaultProtoConfigPreview {
  return Boolean(obj.vaultProtoConfigKeypair);
}

export interface InitOracleConfigPreview extends InitOracleConfigParams {
  oracleConfigKeypair: Keypair;
}

export function isInitOracleConfigPreview(obj: any): obj is InitOracleConfigPreview {
  return Boolean(obj.oracleConfigKeypair);
}
