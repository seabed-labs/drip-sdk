import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  '8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra': {
    mint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    symbol: 'USDC',
  },
  '5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg': {
    mint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    symbol: 'BTC',
  },
};
