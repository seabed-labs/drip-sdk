import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '2WintQnjYhYJpgJtBxgHqBefuJoD71TDeGMCJa9shsr3': {
    // BTC -> USDT @ minutely
    pubkey: new PublicKey('2WintQnjYhYJpgJtBxgHqBefuJoD71TDeGMCJa9shsr3'),
    protoConfig: new PublicKey('2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('8Tq1poiHWnJvN1QbUJXGHqvsMvH6MPmjMzjJRP1KSpYY'),
    tokenBAccount: new PublicKey('FpKy57H9AD1G9Srjg9n158u6pvEAxcwyEmLKJ6sqg8h7'),
    treasuryTokenBAccount: new PublicKey('FpKy57H9AD1G9Srjg9n158u6pvEAxcwyEmLKJ6sqg8h7'),
  },
  '3EbcNELVsQLJvVGpeXpgyKJkLiCRZ2XtWZSsrSXYKQnz': {
    // USDT -> BTC @ minutely
    pubkey: new PublicKey('3EbcNELVsQLJvVGpeXpgyKJkLiCRZ2XtWZSsrSXYKQnz'),
    protoConfig: new PublicKey('2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('2y6EhpdzZP5pYhv57UmnE9qZgJdpJfsHHukifJ3g91m2'),
    tokenBAccount: new PublicKey('4CNm6Aq9x5HG3JWw15Um4TwUa3925aiPXKRCZANftz82'),
    treasuryTokenBAccount: new PublicKey('HoVHHXz36nhBbXSZi7LMw8EZK76H6GrUujf1EvwxCpDA'),
  },
  oGiepvtwpb2Z4ZpgpftrTdD9M7DDhJShCawdwEmXMAV: {
    // WSOL -> USDC @ minutely
    pubkey: new PublicKey('oGiepvtwpb2Z4ZpgpftrTdD9M7DDhJShCawdwEmXMAV'),
    protoConfig: new PublicKey('2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('6YJ9qnNaP8besenvcK5UCz7drSB1v5Ej2T6aPCHdm6Sm'),
    tokenBAccount: new PublicKey('5i7X3c7RfATw3jqwPi7mH5uJ3KYgHF7UYo2j4MsC3Ctr'),
    treasuryTokenBAccount: new PublicKey('8k5zSJ6K39PEAnhtAJuv4CYm1hPYPKDUBVpZ4NxzdpuS'),
  },
  EiQtfh9ebmxE4BuSWGEs4A3mdcdz4Le6rmosU4e6gstf: {
    // USDC -> WSOL @ minutely
    pubkey: new PublicKey('EiQtfh9ebmxE4BuSWGEs4A3mdcdz4Le6rmosU4e6gstf'),
    protoConfig: new PublicKey('2CEDnU1Kh9LAJqMbeMuftWF7iL3Dp2hMcmkkHMjV4gNh'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('HCd5dhmSfzVGHAUzauS1ehmxAuDF2jL4Skdm8Wx8jRS2'),
    tokenBAccount: new PublicKey('9vjNcRL8698cyS7JAvNxQ6AMrCxYdp7YMgjYV3zQAfQK'),
    treasuryTokenBAccount: new PublicKey('62z9wZYAKaqxsDgPy37ZRxm5EhkbuhFxWPrh3BbzoC7D'),
  },

  EtkvYKm94fcc3u7J5z3yZmanf6K8iZ8Yx1AtXfCzxxMF: {
    // BTC -> USDT @ hourly
    pubkey: new PublicKey('EtkvYKm94fcc3u7J5z3yZmanf6K8iZ8Yx1AtXfCzxxMF'),
    protoConfig: new PublicKey('4uQwsDiH5QVLCiJihcZkxF99ytD4LyqEK3V2wArHvxAV'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('98NJqbUmmMxzMcusHdbci1koTKSKcqXMgE5E3XAGCdvQ'),
    tokenBAccount: new PublicKey('CvYb37a1wB2SNjRG1CVwDv45C7ZbDAYLB9wv3tgTvDmw'),
    treasuryTokenBAccount: new PublicKey('FpKy57H9AD1G9Srjg9n158u6pvEAxcwyEmLKJ6sqg8h7'),
  },
  FD3jP3GE3GLfLeXx5kX3wWSBcnAHAM159noSWu7akxij: {
    // USDT -> BTC @ hourly
    pubkey: new PublicKey('FD3jP3GE3GLfLeXx5kX3wWSBcnAHAM159noSWu7akxij'),
    protoConfig: new PublicKey('4uQwsDiH5QVLCiJihcZkxF99ytD4LyqEK3V2wArHvxAV'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('1LPzAeHXpZVH72YpYBuNVRVYtayy6sU7Kw3gPEPd325'),
    tokenBAccount: new PublicKey(''),
    treasuryTokenBAccount: new PublicKey('HoVHHXz36nhBbXSZi7LMw8EZK76H6GrUujf1EvwxCpDA'),
  },
  GyAoXz8q1uPQLigar9nkFfXLn1nRz81o6c1fAzBdBShP: {
    // WSOL -> USDC @ hourly
    pubkey: new PublicKey('GyAoXz8q1uPQLigar9nkFfXLn1nRz81o6c1fAzBdBShP'),
    protoConfig: new PublicKey('4uQwsDiH5QVLCiJihcZkxF99ytD4LyqEK3V2wArHvxAV'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('GmKoaucqSB93LuJctV4bEs4ohM6bXQArQyBn7DFYHgGi'),
    tokenBAccount: new PublicKey('DS9vxUUMtfgchrHg6cnc1YskLZWM5s8JtiCY7qHhNC3z'),
    treasuryTokenBAccount: new PublicKey('8k5zSJ6K39PEAnhtAJuv4CYm1hPYPKDUBVpZ4NxzdpuS'),
  },
  '6yVm9DCdNEcboNZS2vHDzuYLxNZm3k9f1zPPM77cw4X8': {
    // USDC -> WSOL @ hourly
    pubkey: new PublicKey('6yVm9DCdNEcboNZS2vHDzuYLxNZm3k9f1zPPM77cw4X8'),
    protoConfig: new PublicKey('4uQwsDiH5QVLCiJihcZkxF99ytD4LyqEK3V2wArHvxAV'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('4UHNve2Gf7YkJCn4EcQ8cn11xLsL2bqQXV631LDaHynD'),
    tokenBAccount: new PublicKey('6YMjJ7AthAXKZbSjeQcqjpZVpcfjrs6xC7UouzwSd2As'),
    treasuryTokenBAccount: new PublicKey('62z9wZYAKaqxsDgPy37ZRxm5EhkbuhFxWPrh3BbzoC7D'),
  },
};
