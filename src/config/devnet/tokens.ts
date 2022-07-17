import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6: {
    mint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    symbol: 'USDC',
  },
  DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd: {
    mint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    symbol: 'ETH',
  },
  EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg: {
    mint: new PublicKey('EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg'),
    symbol: 'BTC',
  },
  '8LXJFDvW9nrp4MXb4rSW7eSvxAhdzmdiUpNHiDdzJaNP': {
    mint: new PublicKey('8LXJFDvW9nrp4MXb4rSW7eSvxAhdzmdiUpNHiDdzJaNP'),
    symbol: 'TSOL',
  },
};
