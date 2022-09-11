import { PublicKey } from '@solana/web3.js';
import { Network } from '../models';
import * as devnet from './devnet';
import * as mainnet from './mainnet';
import * as staging from './staging';
import { Vault, VaultProtoConfig, Token } from './types';

export interface Config {
  defaultProgramId: PublicKey;
  tokens: Record<string, Token>;
  vaultProtoConfigs: Record<string, VaultProtoConfig>;
  vaults: Record<string, Vault>;
}

export const Configs: Record<Network, Config> = {
  [Network.MainnetProd]: mainnet,
  [Network.DevnetProd]: devnet,
  [Network.DevnetStaging]: staging,
};

export * from './types';
