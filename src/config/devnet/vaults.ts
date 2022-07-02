import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '2k3nyxNQM9uZYqjg9QMZX6bgysdX33qA2K1S32GFryA5': {
    // SOL -> USDC @ minutely
    pubkey: new PublicKey('2k3nyxNQM9uZYqjg9QMZX6bgysdX33qA2K1S32GFryA5'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenBMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenAAccount: new PublicKey('GEZGArFvdqMyF4hixou9m6rEEQtKfSu7xKgi9iKejQ5Y'),
    tokenBAccount: new PublicKey('91wtsxi19rDSuh2TuQKxZvWyi1STDQEpYimAFoMy58by'),
    treasuryTokenBAccount: new PublicKey('CDbSKgX914DaxUyLigvWE9KsXVY58CNx5R5DyoeVTgqZ'),
  },
  '9Vtm4ZChccXZFgXGYJd7upp4nGgux7VVVLHdSHRzQh3E': {
    // ETH -> USDC @ minutely
    pubkey: new PublicKey('9Vtm4ZChccXZFgXGYJd7upp4nGgux7VVVLHdSHRzQh3E'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenBMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenAAccount: new PublicKey('AnfzHthpirdPcTczKB4AGE3mjrtKJxdHKxeAcLKe563Q'),
    tokenBAccount: new PublicKey('2NCL3vmGBv4aZebffdgF5YntCRpKheHSHm4Jp2qGzm5K'),
    treasuryTokenBAccount: new PublicKey('CDbSKgX914DaxUyLigvWE9KsXVY58CNx5R5DyoeVTgqZ'),
  },
  '4DmUAEYJLtXAr1PnN3hZeVr4xomX21HSjdw1GXKLEYCV': {
    // USDC -> SOL @ minutely
    pubkey: new PublicKey('4DmUAEYJLtXAr1PnN3hZeVr4xomX21HSjdw1GXKLEYCV'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenBMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenAAccount: new PublicKey('BpKysZv64EJoKuUytXp47TfT4LXqFqQWuYSERfsygraV'),
    tokenBAccount: new PublicKey('2k3WNU9uJ7iJNaJEtZbzpbU4DfLrsBVas3mNsLkcvBz8'),
    treasuryTokenBAccount: new PublicKey('5M871YQuBtHAEqF24v5KQe4TPTrsCzpQpQnKYrAUdHnQ'),
  },
  H2nZb8isAPrLmPEp8JQKf8FtXRXjbfJauYXZnS3jmDH7: {
    // ETH -> SOL @ minutely
    pubkey: new PublicKey('H2nZb8isAPrLmPEp8JQKf8FtXRXjbfJauYXZnS3jmDH7'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenBMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenAAccount: new PublicKey('9bWPtAFNwLhvVgyNXz1bQQapjxvMkYo9Gi7Xm5L4QMJ4'),
    tokenBAccount: new PublicKey('Aw4HvPFzD5UojUQbxTS6i9xVjiPzFn9PsQ23N6yBT7v9'),
    treasuryTokenBAccount: new PublicKey('5M871YQuBtHAEqF24v5KQe4TPTrsCzpQpQnKYrAUdHnQ'),
  },
  '6ittfR2hr8mqvtdcz88gp3fhSR75MwJFRRwPiTJ13dsr': {
    // USDC -> ETH @ minutely
    pubkey: new PublicKey('6ittfR2hr8mqvtdcz88gp3fhSR75MwJFRRwPiTJ13dsr'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenBMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenAAccount: new PublicKey('6WzNiGn2764zXyvaj39sYLn37WtZWq1MHjSTSYvP2f4g'),
    tokenBAccount: new PublicKey('9LWuEW4fnSVVSR1PuNjJTZhyUytx7BQ1GhnePCcDgSYh'),
    treasuryTokenBAccount: new PublicKey('C7jTC6KcFP57riH9AqFzcXHBE1KTkDFDHaHDZ5Y2sVcX'),
  },
  '2nDdCHhcyGXPuogXLGjKqkjrRbqiXjcCkL1L59198mxy': {
    // SOL -> ETH @ minutely
    pubkey: new PublicKey('2nDdCHhcyGXPuogXLGjKqkjrRbqiXjcCkL1L59198mxy'),
    protoConfig: new PublicKey('9qHr7wYoRKkAFQEJw7BDB4Cq8sT4CGfAco3cNH7krBPW'),
    tokenAMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenBMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenAAccount: new PublicKey('GGUnPPZkRPzGyFmKKQ6m82J7G2iapmYLq4nSgfkKse8c'),
    tokenBAccount: new PublicKey('Bwqxe2njiRJNf7Rx2KmemQThsA5iZ3qAJnKjXnibKFqd'),
    treasuryTokenBAccount: new PublicKey('C7jTC6KcFP57riH9AqFzcXHBE1KTkDFDHaHDZ5Y2sVcX'),
  },
  '75psBFvrRBUi2RHcH224a5yJRWuww7M2q9ZqANF1dsoE': {
    // SOL -> USDC @ hourly
    pubkey: new PublicKey('75psBFvrRBUi2RHcH224a5yJRWuww7M2q9ZqANF1dsoE'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenBMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenAAccount: new PublicKey('6d7z2a4QT5pwUBMJMc49bggrSxGVxJAKNYqBPWicAdig'),
    tokenBAccount: new PublicKey('3aD526q4dVH1PErXhkDbevFXpo3kuuayGTYiB31V6pzo'),
    treasuryTokenBAccount: new PublicKey('FWS9LkjqsqVA73SFkV84inBAoydsCT7NbwHycTsvYTrL'),
  },
  '7zfrijkEDyboqhaNjHHKKNYWdvUbGN5MZoaAwHr5ftGr': {
    // ETH -> USDC @ hourly
    pubkey: new PublicKey('7zfrijkEDyboqhaNjHHKKNYWdvUbGN5MZoaAwHr5ftGr'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenBMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenAAccount: new PublicKey('5BwfPTc3V1ssSNpRmyXaHEqezDvZD5vr9kfgmDntSvJ1'),
    tokenBAccount: new PublicKey('EdEc7RAuokDoGKuhvtrdgt7utavX5bxtQgReQLdHFBiR'),
    treasuryTokenBAccount: new PublicKey('FWS9LkjqsqVA73SFkV84inBAoydsCT7NbwHycTsvYTrL'),
  },
  '721estefQNqH5bms4UfAxiFmhTjYgYzjzxnFMY9Hemo2': {
    // USDC -> SOL @ hourly
    pubkey: new PublicKey('721estefQNqH5bms4UfAxiFmhTjYgYzjzxnFMY9Hemo2'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenBMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenAAccount: new PublicKey('866sZfeQ4Q873reKQpKDCbUoVKESJxAucfkpx2AHLJPo'),
    tokenBAccount: new PublicKey('8wsjea4n7K84nZWtYVQJ4faoFwcgaFd1QZPUa8xnT5Lh'),
    treasuryTokenBAccount: new PublicKey('Be1YMi3ppsLW2DJmzSfRUxgXtCjrcd2XWpHzG6N8YKBm'),
  },
  '45ArcWaPYPMQQHcmS4hi1XA8rho8HDKUVyXKjj8p31M1': {
    // ETH -> SOL @ hourly
    pubkey: new PublicKey('45ArcWaPYPMQQHcmS4hi1XA8rho8HDKUVyXKjj8p31M1'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenBMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenAAccount: new PublicKey('BVVNRvPrUtqiiAdruNcjYWXnjSXVyj78C616xcECD8fF'),
    tokenBAccount: new PublicKey('8B5bgs3X1krNqda41x7cVVcV5RRcLeuiVY5NcVv3SvMu'),
    treasuryTokenBAccount: new PublicKey('Be1YMi3ppsLW2DJmzSfRUxgXtCjrcd2XWpHzG6N8YKBm'),
  },
  '6wpuVx1ts4SDXowh9wAbviFgxkvMA2EAQvf4sfrqWYXs': {
    // USDC -> ETH @ hourly
    pubkey: new PublicKey('6wpuVx1ts4SDXowh9wAbviFgxkvMA2EAQvf4sfrqWYXs'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('5r23oKMycxnnjAJ4cEEkh1bbCowcZwzL6HYmhLqRazQa'),
    tokenBMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenAAccount: new PublicKey('Ci3gpf7UnMZh2xhF9sVQHKHhocuges4XE8paAgKXXzMz'),
    tokenBAccount: new PublicKey('6gnCscGoAMvdL3J5hcd9g3fvoyetEFpMBa3416G4AnqB'),
    treasuryTokenBAccount: new PublicKey('EYmNy9cy7inPapYWPkeYZfnEHecfaoYRXvgJ5p1nsBjY'),
  },
  '5RDpfsEtZT12vx2m2ZuiFL2EGbbdXLHTdSTzYyxk6PQL': {
    // SOL -> ETH @ hourly
    pubkey: new PublicKey('5RDpfsEtZT12vx2m2ZuiFL2EGbbdXLHTdSTzYyxk6PQL'),
    protoConfig: new PublicKey('6AHPfnGXi7GVcDimuMV3CpwhbKAV3y4kJM9UNRHXxdD'),
    tokenAMint: new PublicKey('BTZN3hrJ2S8s4A5iAEfUEEeaRnMUX8EsuG1nvTah2hmX'),
    tokenBMint: new PublicKey('DweqWEsB5UviF93NnvWDP4H2NabMUzST2WP3CB7FfpXZ'),
    tokenAAccount: new PublicKey('7ibGyzbSTzFprxijqMu7gKXzhxUsBWUE1jiQFteVmTbZ'),
    tokenBAccount: new PublicKey('A5UWaEmrYjG8QLREykUwbRwTJkVRD5YvhVfnusTjpTZW'),
    treasuryTokenBAccount: new PublicKey('EYmNy9cy7inPapYWPkeYZfnEHecfaoYRXvgJ5p1nsBjY'),
  },
};
