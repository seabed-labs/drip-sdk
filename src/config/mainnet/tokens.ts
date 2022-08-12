import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  '7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxa': {
    mint: new PublicKey('7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs'),
    symbol: 'ETH',
  },
  So11111111111111111111111111111111111111112: {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    symbol: 'SOL',
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    mint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    symbol: 'USDC',
  },
  '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E': {
    mint: new PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
    symbol: 'BTC',
  },
};
