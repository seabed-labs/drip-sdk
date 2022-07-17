import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  Go7ZkjazsGRxsyELSmcKx6yiM7MamnbuLPWMArZyoysX: {
    // ETH -> BTC @ minutely
    pubkey: new PublicKey('Go7ZkjazsGRxsyELSmcKx6yiM7MamnbuLPWMArZyoysX'),
    protoConfig: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    tokenAMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenBMint: new PublicKey('EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg'),
    tokenAAccount: new PublicKey('HgHu1umrGLvGnA8dP3TAux1Xqz3wJZAAnXqzbwNHu3wg'),
    tokenBAccount: new PublicKey('38XytyqGShKpHYGyEEHWzDTQkHFmosf9hrszxQGUuXeq'),
    treasuryTokenBAccount: new PublicKey('H7yf8hwm5c7LuyJp2U5Xsy3AeDKE4oFRyLekNtQ95wrA'),
  },

  E7cbM1JKHrfzWer6cknsKvyHQrxS4YordHwyhd4v7Z5A: {
    // ETH -> USDC @ minutely
    pubkey: new PublicKey('E7cbM1JKHrfzWer6cknsKvyHQrxS4YordHwyhd4v7Z5A'),
    protoConfig: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    tokenAMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenBMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenAAccount: new PublicKey('EqvGU5Z1adk2QLtUvwpwcFurw5KHt4chj3GG3Yew7mu3'),
    tokenBAccount: new PublicKey('3DES8D5zAnCbxViQcWkQo9THhwf7EUP3u4gWYR2jBosE'),
    treasuryTokenBAccount: new PublicKey('6w1hP3J4kevSior2QzuFzZ18f5RvncisUWdFKftu4Cot'),
  },

  ntNzFrgS136dvr33dEapWC7RjEEw2YXXZzbgdY5sZfc: {
    // USDC -> ETH @ minutely
    pubkey: new PublicKey('ntNzFrgS136dvr33dEapWC7RjEEw2YXXZzbgdY5sZfc'),
    protoConfig: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenAAccount: new PublicKey('9UAqoxB8Pw4Nigqrix7TcKJahd3VyCa8eFaWpi6uT7NG'),
    tokenBAccount: new PublicKey('7GmJ5zMhsmmHDiVXrY4WkG7UgfJ1GwjCPT2gg5BaKEDF'),
    treasuryTokenBAccount: new PublicKey('5b8sM4DP29aboKPHYuEHfeESnda7oHZsVKnPbrApSdNo'),
  },

  GKuA76VZD9uZxWP4CcafrAWetnR5uAEsUpuNakSETQwx: {
    // USDC -> BTC @ minutely
    pubkey: new PublicKey('GKuA76VZD9uZxWP4CcafrAWetnR5uAEsUpuNakSETQwx'),
    protoConfig: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg'),
    tokenAAccount: new PublicKey('CasAiYvgfSamA1MUcz4CwW1RiGZVaxAfw2BQckv9mdFz'),
    tokenBAccount: new PublicKey('96ngohdfGSkiBDL8Dt6FPiS9qnT6M6smEfYYrvQhEf7T'),
    treasuryTokenBAccount: new PublicKey('H7yf8hwm5c7LuyJp2U5Xsy3AeDKE4oFRyLekNtQ95wrA'),
  },

  ABrpoRdtNNsL2U5VRY3KnfRwjRvUCFP4Mj4jBieguLAs: {
    // USDC -> TSOL @ minutely
    pubkey: new PublicKey('ABrpoRdtNNsL2U5VRY3KnfRwjRvUCFP4Mj4jBieguLAs'),
    protoConfig: new PublicKey('22FnWdXzQ1tTrvjFaZ2S7Qs3RmGHbZtEr7jVjWFebrrv'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('8LXJFDvW9nrp4MXb4rSW7eSvxAhdzmdiUpNHiDdzJaNP'),
    tokenAAccount: new PublicKey('4hg5NUTrmquPESbk1HLx4Kq9GosscDXiPcfxDfy51URB'),
    tokenBAccount: new PublicKey('J8pLoqp1vU4ygGgLHm66RBcVhpvDecQubVb5BR4RRotp'),
    treasuryTokenBAccount: new PublicKey('Hh8UkohhcxP7cHWn2WAVzdHM3obphoXqKdHRba711KBX'),
  },

  Gu334N6Rb13iUkhyyE3Wwz1pZJR8ZC9jCvwNjUyeEm9R: {
    // USDC -> ETH @ hourly
    pubkey: new PublicKey('Gu334N6Rb13iUkhyyE3Wwz1pZJR8ZC9jCvwNjUyeEm9R'),
    protoConfig: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenAAccount: new PublicKey('43Wzrr5EuUHAii4re8qhUfvYQWFhgqAhGeguFKvBKtYV'),
    tokenBAccount: new PublicKey('6gpeT8U4QA4rmxXrBR9pJrPoeo7dwjcxNthJdzdaNK87'),
    treasuryTokenBAccount: new PublicKey('5b8sM4DP29aboKPHYuEHfeESnda7oHZsVKnPbrApSdNo'),
  },

  '9ESAesbWSZztbWB9HbXNj1K5CGHAnX6DEjoeS7gTAs7y': {
    // USDC -> BTC @ hourly
    pubkey: new PublicKey('9ESAesbWSZztbWB9HbXNj1K5CGHAnX6DEjoeS7gTAs7y'),
    protoConfig: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg'),
    tokenAAccount: new PublicKey('CdK9NtHNwDXSfbFHeF1Mi6HmJnCUseZMGEoQMLp9aCzi'),
    tokenBAccount: new PublicKey('6tdsgGA5j73aC4bkpAu6M3QxikzFdof5tesyXBv7pBta'),
    treasuryTokenBAccount: new PublicKey('H7yf8hwm5c7LuyJp2U5Xsy3AeDKE4oFRyLekNtQ95wrA'),
  },

  DukgQ1AwUv9iRNSq2sEZDBMkhnfwuMbAdxBr1tkjyYKG: {
    // USDC -> TSOL @ hourly
    pubkey: new PublicKey('DukgQ1AwUv9iRNSq2sEZDBMkhnfwuMbAdxBr1tkjyYKG'),
    protoConfig: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    tokenAMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenBMint: new PublicKey('8LXJFDvW9nrp4MXb4rSW7eSvxAhdzmdiUpNHiDdzJaNP'),
    tokenAAccount: new PublicKey('8GA8WZpehW2u74jFVVNMhjFui3ojfpcqQKzQkTBvmRHP'),
    tokenBAccount: new PublicKey('CVyGg5vgYcZacZCgd2pTDf47E43MBdtmjoN9p9qNqaN1'),
    treasuryTokenBAccount: new PublicKey('Hh8UkohhcxP7cHWn2WAVzdHM3obphoXqKdHRba711KBX'),
  },

  GN4hSZ1M2HTjRBWne1aNaUhoJ4izM8cDmp5qQfW2DT7B: {
    // ETH -> USDC @ hourly
    pubkey: new PublicKey('GN4hSZ1M2HTjRBWne1aNaUhoJ4izM8cDmp5qQfW2DT7B'),
    protoConfig: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    tokenAMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenBMint: new PublicKey('BzTNAVYYHn9aSfUKeNQ2Fv635MsY6WnHMVRMZgb4hbc6'),
    tokenAAccount: new PublicKey('BXen4WTZz7ghEQyMhBniyqeurN9y1oxMcoXmuoMZr1rT'),
    tokenBAccount: new PublicKey('8R9MnFuNTF8QVdyisfBRPqcVhS6coWUXMSdtUEHGT1ui'),
    treasuryTokenBAccount: new PublicKey('6w1hP3J4kevSior2QzuFzZ18f5RvncisUWdFKftu4Cot'),
  },

  Em5LH5XzEm4K96LJx1ABsUC9nkKFGxM4adwbYedYLVqF: {
    // ETH -> BTC @ hourly
    pubkey: new PublicKey('Em5LH5XzEm4K96LJx1ABsUC9nkKFGxM4adwbYedYLVqF'),
    protoConfig: new PublicKey('J6wYVgtJek7ady5wzvtZF6ivF26YqMHtxbTXfzSPZGFp'),
    tokenAMint: new PublicKey('DqakM9iwYs425rToh9LCXzfzc1Xh3A3nrz36QkSJTfNd'),
    tokenBMint: new PublicKey('EMtrTfsR7FvvJFg8J6g9y332L4PGzo3qDSztQbvbswpg'),
    tokenAAccount: new PublicKey('8y6mfER2Gi4Yxr8Azx5vThdWCkzQtZfScXw2rLpEzSZ5'),
    tokenBAccount: new PublicKey('8pgto4u5qvHCjdLBh2hUPeYLniw5u3TNr6Zf2kskJXCs'),
    treasuryTokenBAccount: new PublicKey('H7yf8hwm5c7LuyJp2U5Xsy3AeDKE4oFRyLekNtQ95wrA'),
  },
};
