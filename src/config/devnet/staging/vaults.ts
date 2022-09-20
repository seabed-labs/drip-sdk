import { PublicKey } from '@solana/web3.js';
import { Vault } from '../../types';

export const vaults: Record<string, Vault> = {
  BhRNxNFnPMxi4C8Y2trRY6hsGXa4iqJDjaJ5JPoCMQZB: {
    // BTC -> USDT @ minutely
    pubkey: new PublicKey('BhRNxNFnPMxi4C8Y2trRY6hsGXa4iqJDjaJ5JPoCMQZB'),
    protoConfig: new PublicKey('Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('DbcTP9hndmm7dT7TdHwL8CE2YfYiifZo2GwCaLxZ7Ykv'),
    tokenBAccount: new PublicKey('EJHt3ewH7pWCakhF2nG7CE6wC8UAgrnN6ywYpAX325yM'),
    treasuryTokenBAccount: new PublicKey('2NGk3RsgvsCLw6LwqQwenV3yjiYLmCARmYjXhcYQ35xq'),
  },
  BwJj7DYyMR1xMnWK1PGKPLi5u2ZP5EDBFBkPAAv4UDP8: {
    // USDT -> BTC @ minutely
    pubkey: new PublicKey('BwJj7DYyMR1xMnWK1PGKPLi5u2ZP5EDBFBkPAAv4UDP8'),
    protoConfig: new PublicKey('Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('HPTSZFzxKUsJKPrxSyYh6TuGQV7qfBqpW6c4A8DERxFr'),
    tokenBAccount: new PublicKey('9Swein4rvYYN1MJyFBjfTdvx8Lh3wzabwtWKddPWdhrP'),
    treasuryTokenBAccount: new PublicKey('6smBUZt2e7Dz9o6hWoXmY78n1rpXrgpNwNFtocZMU5QN'),
  },
  '3Pf5vBUEGmhuiRJ97ZrePPYeMazy9Z3QaE8mVePREfwj': {
    // WSOL -> USDC @ minutely
    pubkey: new PublicKey('3Pf5vBUEGmhuiRJ97ZrePPYeMazy9Z3QaE8mVePREfwj'),
    protoConfig: new PublicKey('Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('GoxXxzhWknzNprpS6yWvW3nkDTpkCayHMWLxfPBbKj4u'),
    tokenBAccount: new PublicKey('2xyFSZXrMLmS2MvcXvQR9KCZMrtiFT9giharvVUobNJU'),
    treasuryTokenBAccount: new PublicKey('DipGJLj17uVHVbser4zurteSCTtuGpfX2jK81qrhzmzE'),
  },
  EQVCYMpNAQ5Eo9aSygeMK5WyDqj4iR9TAn55aZJLu4m: {
    // USDC -> WSOL @ minutely
    pubkey: new PublicKey('EQVCYMpNAQ5Eo9aSygeMK5WyDqj4iR9TAn55aZJLu4m'),
    protoConfig: new PublicKey('Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('44fLbAYUWBi3XqUVEJZVZSrP5hsRU5HGmRqFTkoZvjaG'),
    tokenBAccount: new PublicKey('Dvqyic4523mSs4jXmWpZpymsCFvsNpX3gN4myq4XkWfF'),
    treasuryTokenBAccount: new PublicKey('DsNg246VTwM1DJ6Ctswk3SM9piCVCXG7VKobkaUdDYJW'),
  },
  Eekhp9kM4LswT9KNtVPsZx46d8QSPvFkJ6prmY2tzkwg: {
    // BTC -> USDT @ hourly
    pubkey: new PublicKey('Eekhp9kM4LswT9KNtVPsZx46d8QSPvFkJ6prmY2tzkwg'),
    protoConfig: new PublicKey('CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('5c8jofNjn7xcaZHr6cGQ5neXihgFBAppW6nK2NwcpYh9'),
    tokenBAccount: new PublicKey('9Wvi7abn1XMHtWkFC5BByjRRvmFgvS5z6pzAhTvKHSMM'),
    treasuryTokenBAccount: new PublicKey('2NGk3RsgvsCLw6LwqQwenV3yjiYLmCARmYjXhcYQ35xq'),
  },
  '2BzPdgjMRvcfpuG6R3b5GCiCt6fwVn1Uj8iJxeWFb7vt': {
    // USDT -> BTC @ hourly
    pubkey: new PublicKey('2BzPdgjMRvcfpuG6R3b5GCiCt6fwVn1Uj8iJxeWFb7vt'),
    protoConfig: new PublicKey('CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('Bdn62SSZew19NuT3mKczaYcNiJtBvLamdjUN3cmtiYPd'),
    tokenBAccount: new PublicKey('wFUnEAaowAYRdHSaqJ8UTdMsd93pkaHixECXn4hwYM3'),
    treasuryTokenBAccount: new PublicKey('6smBUZt2e7Dz9o6hWoXmY78n1rpXrgpNwNFtocZMU5QN'),
  },
  '5B9YQfb4n3Sb5USacpdHBpL1YVKxXXn2pnc4gjseXps5': {
    // WSOL -> USDC @ hourly
    pubkey: new PublicKey('5B9YQfb4n3Sb5USacpdHBpL1YVKxXXn2pnc4gjseXps5'),
    protoConfig: new PublicKey('CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('Dsobe41LN8dzzQFx2QzDbjuYn2VjW2BqkJPRi7dVy3tu'),
    tokenBAccount: new PublicKey('8mKNApd4K4r5haGtDAAa4uknueeYYeL5atGgXiQue9GA'),
    treasuryTokenBAccount: new PublicKey('DipGJLj17uVHVbser4zurteSCTtuGpfX2jK81qrhzmzE'),
  },
  '9C2SmeN67kWv4wQdE4kDj4EAncGsWSYARvdwnPzwFTEV': {
    // USDC -> WSOL @ hourly
    pubkey: new PublicKey('9C2SmeN67kWv4wQdE4kDj4EAncGsWSYARvdwnPzwFTEV'),
    protoConfig: new PublicKey('CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('9sFWh2DXtHuC2XwE55V4DQ49Zroi4TjHuofK861HLh8C'),
    tokenBAccount: new PublicKey('BCBNqmuVXobpJugVXjSgYqMg1UvGGFgg9KLNKje6s1Ei'),
    treasuryTokenBAccount: new PublicKey('DsNg246VTwM1DJ6Ctswk3SM9piCVCXG7VKobkaUdDYJW'),
  },
};
