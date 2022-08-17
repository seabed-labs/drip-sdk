import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv': {
    pubkey: new PublicKey('6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv'),
    granularity: 86400,
  },
};
