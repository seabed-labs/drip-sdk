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
  J2ipdPYZSt6yCQoykFFmtce2dkX1GM4xpDXaKrTZwM2h: {
    pubkey: new PublicKey('J2ipdPYZSt6yCQoykFFmtce2dkX1GM4xpDXaKrTZwM2h'),
    granularity: 60,
  },
  '6UjFL22VY4MwDkgAjrHF3iu9unyRJAYD3qUqNZNoC9b2': {
    pubkey: new PublicKey('6UjFL22VY4MwDkgAjrHF3iu9unyRJAYD3qUqNZNoC9b2'),
    granularity: 60,
  },
};
