import { PublicKey } from '@solana/web3.js';
import { ClientEnv, Network } from '../models';
import * as devnetProd from './devnet/production';
import * as mainnetProd from './mainnet/production';
import * as devnetStaging from './devnet/staging';
import { Vault, VaultProtoConfig, Token } from './types';

export interface Config {
  programId: PublicKey;
  tokens: Record<string, Token>;
  vaultProtoConfigs: Record<string, VaultProtoConfig>;
  vaults: Record<string, Vault>;
}
/*
Valid Pairs: 
- (Devnet, Staging)
- (Devnet, Production)
- (Mainnet, _), the same program on mainnet is used in all clientEnv's
*/
export function getConfig(network: Network, clientEnv: ClientEnv): Config {
  switch (network) {
    case Network.Mainnet:
      return mainnetProd;
    case Network.Devnet:
      switch (clientEnv) {
        case ClientEnv.Production:
          return devnetProd;
        case ClientEnv.Staging:
          return devnetStaging;
      }
    case Network.Localnet:
    default:
      throw new Error(`invalid (network, clientEnv): (${network}, ${clientEnv})`);
  }
}
export * from './types';
