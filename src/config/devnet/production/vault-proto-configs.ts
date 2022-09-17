import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt: {
    pubkey: new PublicKey('Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt'),
    granularity: 60,
  },
  Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK: {
    pubkey: new PublicKey('Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK'),
    granularity: 3600,
  },
};
