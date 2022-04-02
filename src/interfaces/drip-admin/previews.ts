import { Keypair } from '@solana/web3.js';
import { InitVaultProtoConfigParams } from './params';

export interface InitVaultProtoConfigPreview extends InitVaultProtoConfigParams {
  vaultProtoConfigKeypair: Keypair;
}

export function isInitVaultProtoConfigPreview(obj: any): obj is InitVaultProtoConfigPreview {
  return Boolean(obj.vaultProtoConfigKeypair);
}
