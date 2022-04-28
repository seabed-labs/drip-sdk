import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq: {
    mint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    symbol: 'SOL',
  },
  ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8: {
    mint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    symbol: 'USDC',
  },
  '54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H': {
    mint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    symbol: 'ETH',
  },
};
