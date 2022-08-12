import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh': {
    pubkey: new PublicKey('2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh'),
    granularity: 60,
  },
};
