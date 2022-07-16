import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  GAstZSga54WrsQdDZ9pgch6Xe9Lyxaiyx4sY23nKyEZ4: {
    mint: new PublicKey('GAstZSga54WrsQdDZ9pgch6Xe9Lyxaiyx4sY23nKyEZ4'),
    symbol: 'SOL',
  },
  E3R1FopVaFpPAXojjdhJvWfKyaPuGHrx2GY7RCvHn7Dy: {
    mint: new PublicKey('E3R1FopVaFpPAXojjdhJvWfKyaPuGHrx2GY7RCvHn7Dy'),
    symbol: 'USDC',
  },
};
