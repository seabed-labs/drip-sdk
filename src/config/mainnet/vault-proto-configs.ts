import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  // 200 bps fees
  '6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv': {
    pubkey: new PublicKey('6i3GfRb48FtUYB1e3UqfamT1D52UtGtTkF6tMF1F6YHv'),
    granularity: 86400,
  },
  // 50 bps fees
  BK7m7aEb5SrJBSAzMBGumnRhRvF3C7j7fssUrPKPTwxG: {
    pubkey: new PublicKey('BK7m7aEb5SrJBSAzMBGumnRhRvF3C7j7fssUrPKPTwxG'),
    granularity: 86400,
  },
};
