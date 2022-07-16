import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '6E9JT6hW92Mf6DioroeC6xbPxbjWPn7NAM1J2an2TLLi': {
    pubkey: new PublicKey('6E9JT6hW92Mf6DioroeC6xbPxbjWPn7NAM1J2an2TLLi'),
    granularity: 60,
  },
};
