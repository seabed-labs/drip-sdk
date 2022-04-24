import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL: {
    mint: new PublicKey('EpurvB9cZ9WkcFePxH7V8vNpZy3nGQLsp2gcGehAWcAL'),
    symbol: 'SOL',
  },
  '31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC': {
    mint: new PublicKey('31nFDfb3b4qw8JPx4FaXGgEk8omt7NuHpPkwWCSym5rC'),
    symbol: 'USDC',
  },
};
