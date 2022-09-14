import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  Bqkkq8AsaAyhgL53zEazJ1wYMqiHjEdF7osA8XAREE2q: {
    // BTC -> USDT @ minutely
    pubkey: new PublicKey('Bqkkq8AsaAyhgL53zEazJ1wYMqiHjEdF7osA8XAREE2q'),
    protoConfig: new PublicKey('Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('3izWz3sCKGxKfLVMZyZMXx6wPZWtP78i1i8hu2z5gxRi'),
    tokenBAccount: new PublicKey('8GpVGuqaeAjShYJvXGujYLxLe5MFo8wDLtS9osmgUE1n'),
    treasuryTokenBAccount: new PublicKey('2NGk3RsgvsCLw6LwqQwenV3yjiYLmCARmYjXhcYQ35xq'),
  },
  B89HUcrgyNRCAffb33v52NucUrYbMZtxfPzcW3EwzXWs: {
    // USDT -> BTC @ minutely
    pubkey: new PublicKey('B89HUcrgyNRCAffb33v52NucUrYbMZtxfPzcW3EwzXWs'),
    protoConfig: new PublicKey('Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('2CmYJwpVk5VPSjodhje8nuuZKmDjqQCL8XhhNddK6Eud'),
    tokenBAccount: new PublicKey('72z6Bv7C7o9SVzXxust2mr4ot5xAth5vSFP8x2oW3Nj2'),
    treasuryTokenBAccount: new PublicKey('6smBUZt2e7Dz9o6hWoXmY78n1rpXrgpNwNFtocZMU5QN'),
  },
  Chn9T1M93piu89GnnPDzAsjHwKjoMKC8CCgX9wmtvUqp: {
    // WSOL -> USDC @ minutely
    pubkey: new PublicKey('Chn9T1M93piu89GnnPDzAsjHwKjoMKC8CCgX9wmtvUqp'),
    protoConfig: new PublicKey('Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('zbisyztfxqBWKvp5NGqiuVVrMsyCmqqBUTAaha8QxRc'),
    tokenBAccount: new PublicKey('BiTJqgqAun3sWMbTcbzADQNomVLkLPRaxL1MhvniKJqv'),
    treasuryTokenBAccount: new PublicKey('DipGJLj17uVHVbser4zurteSCTtuGpfX2jK81qrhzmzE'),
  },
  EErEQN63Tubyq7zHRW9y4ndHukPs3hMTEq6zQG7LQETz: {
    // USDC -> WSOL @ minutely
    pubkey: new PublicKey('EErEQN63Tubyq7zHRW9y4ndHukPs3hMTEq6zQG7LQETz'),
    protoConfig: new PublicKey('Gyp96fazJPVCHzWXXZGrTDeXKBUH9tfyyrVPhMZsRwUt'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('2Hk5i9FHdM5g8CALC1gojDLtm6fyXoWkSPwty5mKMhQT'),
    tokenBAccount: new PublicKey('2AGsvncovnVRZzjMcJfM3QToxjPdgngU6cJjYJPkhPT7'),
    treasuryTokenBAccount: new PublicKey('DsNg246VTwM1DJ6Ctswk3SM9piCVCXG7VKobkaUdDYJW'),
  },

  '6mCv8tF2wxq3pjPaT7r7Qf9xLyTwQwWJMYncdJsatpDP': {
    // BTC -> USDT @ hourly
    pubkey: new PublicKey('6mCv8tF2wxq3pjPaT7r7Qf9xLyTwQwWJMYncdJsatpDP'),
    protoConfig: new PublicKey('Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK'),
    tokenAMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenBMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenAAccount: new PublicKey('2Sd2b1F5HnyXu7xF4fJHDE6zNVi1feTiFx6dGvnBkztD'),
    tokenBAccount: new PublicKey('FcFFEPAT2jj2VrxagfXHBumFV8UPREh1bfHB1gEe59C'),
    treasuryTokenBAccount: new PublicKey('2NGk3RsgvsCLw6LwqQwenV3yjiYLmCARmYjXhcYQ35xq'),
  },
  BY2YSxzwZwPh7MAJ86hsbu1uop9SyhZWyKqfXtN6FNu4: {
    // USDT -> BTC @ hourly
    pubkey: new PublicKey('BY2YSxzwZwPh7MAJ86hsbu1uop9SyhZWyKqfXtN6FNu4'),
    protoConfig: new PublicKey('Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK'),
    tokenAMint: new PublicKey('H9gBUJs5Kc5zyiKRTzZcYom4Hpj9VPHLy4VzExTVPgxa'),
    tokenBMint: new PublicKey('7ihthG4cFydyDnuA3zmJrX13ePGpLcANf3tHLmKLPN7M'),
    tokenAAccount: new PublicKey('EimqzigfbofUf7vmMki95MBHr9Hw7jXiLghtWTVqav9'),
    tokenBAccount: new PublicKey('DFT8qZjYiq18gsPyatxToG6V5yuzgmyQRKUModHxpmsB'),
    treasuryTokenBAccount: new PublicKey('6smBUZt2e7Dz9o6hWoXmY78n1rpXrgpNwNFtocZMU5QN'),
  },
  J3nPeD3VrP3i23pDgsG9uXiPURd7ptRXoixL8CJRQbRW: {
    // WSOL -> USDC @ hourly
    pubkey: new PublicKey('J3nPeD3VrP3i23pDgsG9uXiPURd7ptRXoixL8CJRQbRW'),
    protoConfig: new PublicKey('Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK'),
    tokenAMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenBMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenAAccount: new PublicKey('CTjje9bqA7g8DDHgftYVErqA9QZ2YqcEGgZgLN9LspZa'),
    tokenBAccount: new PublicKey('HdrtUVPkkpK8HjyqqzVMDhEvCDL91aXEZgdXsXtEtvki'),
    treasuryTokenBAccount: new PublicKey('DipGJLj17uVHVbser4zurteSCTtuGpfX2jK81qrhzmzE'),
  },
  '5VfSyiFenN99Nk3KTsuB93E6783cpB1rdJkjFdg9qSLK': {
    // USDC -> WSOL @ hourly
    pubkey: new PublicKey('5VfSyiFenN99Nk3KTsuB93E6783cpB1rdJkjFdg9qSLK'),
    protoConfig: new PublicKey('Ao6uXF5RgpWjzJbkXdDmwJj2CYr9SQQ1BcaHCsYf6AEK'),
    tokenAMint: new PublicKey('EmXq3Ni9gfudTiyNKzzYvpnQqnJEMRw2ttnVXoJXjLo1'),
    tokenBMint: new PublicKey('So11111111111111111111111111111111111111112'),
    tokenAAccount: new PublicKey('GZMCsmgy1TT8aAQGAekcUf98fbnenXw6SPfXcdetqzep'),
    tokenBAccount: new PublicKey('5JdF2jAE9W4mm5ZEdMyULWgiPACu65UcjZNNigzRZU9e'),
    treasuryTokenBAccount: new PublicKey('DsNg246VTwM1DJ6Ctswk3SM9piCVCXG7VKobkaUdDYJW'),
  },
};
