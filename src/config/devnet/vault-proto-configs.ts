import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '4A87ZpDramFGHwPABoVpRWtUaJvsm3LgefPqwWDpUhdV': {
    pubkey: new PublicKey('4A87ZpDramFGHwPABoVpRWtUaJvsm3LgefPqwWDpUhdV'),
    granularity: 60,
  },
  B7kUk469u5mMMcCrVQW8TWCZDVikVE8k8Z68R3hYWGsY: {
    pubkey: new PublicKey('B7kUk469u5mMMcCrVQW8TWCZDVikVE8k8Z68R3hYWGsY'),
    granularity: 3600,
  },
};
