import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '7ZrPseXCAEtXEbPvxWtmiQN1V3bkh9ASdBBejWQmEEM': {
    // USDT -> BTC @ minutely
    pubkey: new PublicKey('7ZrPseXCAEtXEbPvxWtmiQN1V3bkh9ASdBBejWQmEEM'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    tokenBMint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    tokenAAccount: new PublicKey('2p2nwqznQGFoVHNyTJf3DyZXngoLig4ZkB1QvL8GDd77'),
    tokenBAccount: new PublicKey('XkrLs6usgJVgRmm1KUA8DfAyLd4XGeWsWB5PU44AYjv'),
    treasuryTokenBAccount: new PublicKey('r1utrDwXi2umimDucMiCTHVKTkbGbjL8uTYBZLgvx3M'),
  },
  uN35hnMJ2FhNUr5BsRSmcThNLwvUiehxLTSFf3U1K2T: {
    // BTC -> USDT @ minutely
    pubkey: new PublicKey('uN35hnMJ2FhNUr5BsRSmcThNLwvUiehxLTSFf3U1K2T'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('5nY3xT4PJe7NU41zqBx5UACHDckrimmfwznv4uLenrQg'),
    tokenBMint: new PublicKey('8ULDKGmKJJaZa32eiL36ARr6cFaZaoAXAosWeg5r17ra'),
    tokenAAccount: new PublicKey('2bH8ZwygGZr9LgbPGaidcs3wMechtARohWdeANTwnUV2'),
    tokenBAccount: new PublicKey('EgagDa6GhwLW3X8EjkoeRJDH8CogXrZYVQM891KDpwy5'),
    treasuryTokenBAccount: new PublicKey('4i1BDQh233h3NHCVGPT8p3H4cUG81MuxAir64D55VtdU'),
  },
  '2KVoQTUs1JxwSqAaccYuuDWVtPZkH2obdxZGk3uxnEnY': {
    // WSOL -> USDC @ minutely
    pubkey: new PublicKey('2KVoQTUs1JxwSqAaccYuuDWVtPZkH2obdxZGk3uxnEnY'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('HccjVMaH1q9BV96UmNmqsZqLwByKn5sQb7fGHY3rzCon'),
    tokenBAccount: new PublicKey('93VGpBizDzGCXyigZh3zZXeGhtRRdFa1wUen3dfLnEhQ'),
    treasuryTokenBAccount: new PublicKey('4id8gqEqZ823zrcVYSM6e2NwhihXqWNJfrjjhMQ3ZC2G'),
  },
  '783BESo7zDZmVXSnwjFFxJ6L81LEVW47j1U92xv1tmKL': {
    // USDC -> WSOL @ minutely
    pubkey: new PublicKey('783BESo7zDZmVXSnwjFFxJ6L81LEVW47j1U92xv1tmKL'),
    protoConfig: new PublicKey('HWtY2TzvkuMX8vXPzEivs27Ao1SvZz2qWsyY8dhGk4dY'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('6eWshRewQKiUrRR4oaj2mEk4Z2QPhDjPP7scsZGjYfaC'),
    tokenBAccount: new PublicKey('DH6Mx8vPV4eRtZP6q1RQ1D3X4BsrXuGLrFoxBgzQbvLo'),
    treasuryTokenBAccount: new PublicKey('7W1KxceuEoZNUwigFwHm3y1wVhQRpBtvWc6HX9wB1o61'),
  },
};
