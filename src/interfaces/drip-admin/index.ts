import { Transaction } from '@solana/web3.js';
import { InitVaultParams, InitVaultProtoConfigParams } from './params';
import { InitVaultProtoConfigPreview } from './previews';

export interface DripAdmin {
  getInitVaultProtoConfigPreview(params: InitVaultProtoConfigParams): InitVaultProtoConfigPreview;
  getInitVaultProtoConfigTx(
    params: InitVaultProtoConfigParams | InitVaultProtoConfigPreview
  ): Promise<Transaction>;
  getInitVaultTx(params: InitVaultParams): Promise<Transaction>;
}
