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
  uN35hnMJ2FhNUr5BsRSmcThNLwvUiehxLTSFf3U1K2T: {
    // BTC -> USDC @ minutely
    pubkey: new PublicKey('uN35hnMJ2FhNUr5BsRSmcThNLwvUiehxLTSFf3U1K2T'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    tokenBMint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    tokenAAccount: new PublicKey('2bH8ZwygGZr9LgbPGaidcs3wMechtARohWdeANTwnUV2'),
    tokenBAccount: new PublicKey('EgagDa6GhwLW3X8EjkoeRJDH8CogXrZYVQM891KDpwy5'),
    treasuryTokenBAccount: new PublicKey('4i1BDQh233h3NHCVGPT8p3H4cUG81MuxAir64D55VtdU'),
  },
};
