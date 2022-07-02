import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX: {
    mint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    symbol: 'SOL',
  },
  '5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa': {
    mint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    symbol: 'USDC',
  },
  DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ: {
    mint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    symbol: 'ETH',
  },
};
