import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '7ZrPseXCAEtXEbPvxWtmiQN1V3bkh9ASdBBejWQmEEM': {
    // USDC -> BTC @ minutely
    pubkey: new PublicKey('7ZrPseXCAEtXEbPvxWtmiQN1V3bkh9ASdBBejWQmEEM'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    tokenBMint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    tokenAAccount: new PublicKey('2p2nwqznQGFoVHNyTJf3DyZXngoLig4ZkB1QvL8GDd77'),
    tokenBAccount: new PublicKey('XkrLs6usgJVgRmm1KUA8DfAyLd4XGeWsWB5PU44AYjv'),
    treasuryTokenBAccount: new PublicKey('r1utrDwXi2umimDucMiCTHVKTkbGbjL8uTYBZLgvx3M'),
  },
};
