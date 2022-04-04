import { PublicKey } from '@solana/web3.js';
import { Network } from '../models';

export interface Config {
  vaultProgramId: PublicKey;
}

export const Configs: Record<Network, Config> = {
  [Network.Mainnet]: {
    vaultProgramId: PublicKey.default,
  },
  [Network.Devnet]: {
    vaultProgramId: new PublicKey('3Q1eJ9m3jYJ3F32gcJYL7gMPn9kj87MzzjgoAL7VSN6E'),
  },
};
