import { PublicKey } from '@solana/web3.js';
import { Token } from '../types';

export const tokens: Record<string, Token> = {
  '7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M': {
    mint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
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
  H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa: {
    mint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    symbol: 'BTC',
  },
};
