import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  '9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW': {
    pubkey: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    granularity: 60,
  },
  '6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD': {
    pubkey: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    granularity: 3600,
  },
  '4ieXinDEGqhV73PvsjopH8KQyJQNF7wrBR1sHZM61CYb': {
    pubkey: new PublicKey('4ieXinDEGqhV73PvsjopH8KQyJQNF7wrBR1sHZM61CYb'),
    granularity: 86400,
  },
};
