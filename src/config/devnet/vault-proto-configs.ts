import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv': {
    pubkey: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    granularity: 60,
  },
  J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp: {
    pubkey: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    granularity: 3600,
  },
};
