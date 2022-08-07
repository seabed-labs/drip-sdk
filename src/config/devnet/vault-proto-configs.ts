import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY: {
    pubkey: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    granularity: 60,
  },
  '3pHuZFxyDYoG7WzKouWvuuSqE5KidNy2tdf2f9Z2VZby': {
    pubkey: new PublicKey('3pHuZFxyDYoG7WzKouWvuuSqE5KidNy2tdf2f9Z2VZby'),
    granularity: 3600,
  },
  '2f3eTcDyph3S2DbQpdCVEHSba3iugZkWZUHPukTiJ6Aa': {
    pubkey: new PublicKey('2f3eTcDyph3S2DbQpdCVEHSba3iugZkWZUHPukTiJ6Aa'),
    granularity: 86400,
  },
};
