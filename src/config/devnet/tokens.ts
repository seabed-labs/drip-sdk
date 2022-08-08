import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  '8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra': {
    mint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    symbol: 'USDT',
  },
  So11111111111111111111111111111111111111112: {
    mint: new PublicKey('So11111111111111111111111111111111111111112'),
    symbol: 'WSOL',
  },
  EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1: {
    mint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    symbol: 'USDC',
  },
  '5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg': {
    mint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    symbol: 'BTC',
  },
};
