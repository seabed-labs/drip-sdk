import { PublicKey } from '@solana/web3.js';
import { Vault } from '../types';

export const vaults: Record<string, Vault> = {
  '3iz6nZVjiGZtdEffAUDrVh4A5BnwN6ZoHj3nPPZtKJfV': {
    // SOL -> USDC @ minutely
    pubkey: new PublicKey('3iz6nZVjiGZtdEffAUDrVh4A5BnwN6ZoHj3nPPZtKJfV'),
    protoConfig: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    tokenAMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenBMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenAAccount: new PublicKey('6PmcdLzbELLxaPc3Fq6FjiSj7wtjA4MEt1UCZBnHh6tw'),
    tokenBAccount: new PublicKey('5q7HLgfvxmkqAK6QaEFYrNmvKvzQZjWJzjwRu4toi9Sw'),
    treasuryTokenBAccount: new PublicKey('CrVdqMmYCbBs8zG2rmwdWgmsSArKTbMUv3qvTz8J6YWC'),
  },
  '7rERMPGFMFi5k7jsQj3yXbW9uPDQj8FBx6vjwVXpknbh': {
    // USDC -> SOL @ minutely
    pubkey: new PublicKey('7rERMPGFMFi5k7jsQj3yXbW9uPDQj8FBx6vjwVXpknbh'),
    protoConfig: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    tokenAMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenBMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenAAccount: new PublicKey('5y95dsjKJPaf94Kv8K6NbhyDYWswZycfcHNbwXMo6Xdk'),
    tokenBAccount: new PublicKey('9B6zNC4ijKfgGjReicqzv5dEPhJMt2oDH97b4AjUAs9a'),
    treasuryTokenBAccount: new PublicKey('ugY3pNYSKmMo4msf9VRVnf7SxFQXDqhNcjbNMKSW9gL'),
  },
  '9qyL3EJncPi1ggLnZTJRRZ617PaXbSZ8YHYuycvwBFQF': {
    // ETH -> SOL @ minutely
    pubkey: new PublicKey('9qyL3EJncPi1ggLnZTJRRZ617PaXbSZ8YHYuycvwBFQF'),
    protoConfig: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    tokenAMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenBMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenAAccount: new PublicKey('CgsuFMFXuXa5NPufLxz6e2uD5M89ecQB9wvUnVkXqoQ9'),
    tokenBAccount: new PublicKey('8YnN6gNe2FymR751kzd1D31Nd1qvuEt8xBdiombvAG2Z'),
    treasuryTokenBAccount: new PublicKey('ugY3pNYSKmMo4msf9VRVnf7SxFQXDqhNcjbNMKSW9gL'),
  },
  '2gxv7Kcv595VxdJRCMSruvo3z7j5CJhBAnGXiNdGxfLE': {
    // USDC -> ETH @ minutely
    pubkey: new PublicKey('2gxv7Kcv595VxdJRCMSruvo3z7j5CJhBAnGXiNdGxfLE'),
    protoConfig: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    tokenAMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenBMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenAAccount: new PublicKey('2joXoPdckR7yzJpf47KMBPvnUwHzj1VFv5ASWXhTezUz'),
    tokenBAccount: new PublicKey('65uUqvqKzTTv47tCk46bnAVXWTPb72fooVyLXVxZd1uc'),
    treasuryTokenBAccount: new PublicKey('74eawbizDBEKKoY2EWhUFRnz9kH7U6hrjMe3xzYnEM5A'),
  },
  '2ryN4z5rCRexwKQrDtERgVA9b8W9GreYjT9v9q7q7zks': {
    // SOL -> ETH @ minutely
    pubkey: new PublicKey('2ryN4z5rCRexwKQrDtERgVA9b8W9GreYjT9v9q7q7zks'),
    protoConfig: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    tokenAMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenBMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenAAccount: new PublicKey('H4hArSuaAZtPB6UoGYQUp5LV6cLJHSw7a8XbU4Pra2Rm'),
    tokenBAccount: new PublicKey('D7pszKVvqEJ7geNDHMD5vWJtehraCKjwSjzo2gQwwPS5'),
    treasuryTokenBAccount: new PublicKey('74eawbizDBEKKoY2EWhUFRnz9kH7U6hrjMe3xzYnEM5A'),
  },
  '9vLQxJTuycNBctAQvEmXUJpe3MEKgUugHxkiRjNMzczs': {
    // SOL -> USDC @ hourly
    pubkey: new PublicKey('9vLQxJTuycNBctAQvEmXUJpe3MEKgUugHxkiRjNMzczs'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenBMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenAAccount: new PublicKey('GkAsh5LYfYzmat87kh9FKg2ss62vzSoRYJbbDD4DAjKk'),
    tokenBAccount: new PublicKey('6QbfBoAGm2yTkg9WApj4sKexrucWDi1S5T3BS8YHuTuh'),
    treasuryTokenBAccount: new PublicKey('E7oYHeM7v14tv7AjvsxD9tcXQMtLYvZRarTjQ1uqhjSW'),
  },
  '827ynxorqgFQmUAhewqC5eNeu8yfL4mWBF3YhwyBMoFj': {
    // ETH -> USDC @ hourly
    pubkey: new PublicKey('827ynxorqgFQmUAhewqC5eNeu8yfL4mWBF3YhwyBMoFj'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenBMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenAAccount: new PublicKey('vDsAiSkWU7E639ofBadRBezw4TYR6u72R3MbGV8j4jd'),
    tokenBAccount: new PublicKey('29UNqkNsJjc1zgFGr9LYTDE8hSchcUiV7xqj5CPcte74'),
    treasuryTokenBAccount: new PublicKey('E7oYHeM7v14tv7AjvsxD9tcXQMtLYvZRarTjQ1uqhjSW'),
  },
  CwVN7Ckq2GJ1UmyU62ByzwUycfh2uY8AMBehhdZBYvUM: {
    // ETH -> USDC @ hourly
    pubkey: new PublicKey('CwVN7Ckq2GJ1UmyU62ByzwUycfh2uY8AMBehhdZBYvUM'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenBMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenAAccount: new PublicKey('3gCyMbWwagmQXkWD1dM5mwt9dnnqVKdRv6S8TPmTrbmA'),
    tokenBAccount: new PublicKey('hLiAFV11EPsTXx9jfzvDWFyExNvZCYGohiV2HtLU8BA'),
    treasuryTokenBAccount: new PublicKey('F3TS7WPPD5hx66zRM6nbaPrDsJxZUEc529wMpdtrrjum'),
  },
  CrdeFbLveC3hQCtBBVeiSeMhRUQwopBF8i1QVL3wHWUg: {
    // ETH -> SOL @ hourly
    pubkey: new PublicKey('CrdeFbLveC3hQCtBBVeiSeMhRUQwopBF8i1QVL3wHWUg'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenBMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenAAccount: new PublicKey('Exsek3Ezh1pdhNxcYEU1JDEWJFHRVYkeDKATenphbRbA'),
    tokenBAccount: new PublicKey('BoBML8jQDZz4NCo9WGhDn2bN6eFE7j7238xwjQ3Pmzq1'),
    treasuryTokenBAccount: new PublicKey('F3TS7WPPD5hx66zRM6nbaPrDsJxZUEc529wMpdtrrjum'),
  },
  '9ryxSGaF8pgby9bdFsv2mp4r332JxE3YTbg9FnNKJ8yk': {
    // USDC -> ETH @ hourly
    pubkey: new PublicKey('9ryxSGaF8pgby9bdFsv2mp4r332JxE3YTbg9FnNKJ8yk'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('ASuqwxvC4FXxJGT9XqZMXbCKDQBaRTApEhN2oN3VL3A8'),
    tokenBMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenAAccount: new PublicKey('2dqKSRSginr53aQyzbEM7Q75iCQRtXjJrPGqDqd4jiAj'),
    tokenBAccount: new PublicKey('61JxYYReLavQUj2aSQY4iiNTCecwy8rr6azSdiWodcw1'),
    treasuryTokenBAccount: new PublicKey('GNwm4sezRcUPvScZm9cbWFRaiwgY8rbkz22cmKzMFaTg'),
  },
  '4LAbv2D4mT4YrxBnqaUFcth2vgg2bqdG4P2FRcRZ88Mb': {
    // SOL -> ETH @ hourly
    pubkey: new PublicKey('4LAbv2D4mT4YrxBnqaUFcth2vgg2bqdG4P2FRcRZ88Mb'),
    protoConfig: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    tokenAMint: new PublicKey('BfqATYbPZJFdEdYWkEbFRBnhv1LB6wtLn299HjMmE4uq'),
    tokenBMint: new PublicKey('54uPbRrVwYsvZZMmsCXjLCtshgTquBWDZTNTJNbEDZ4H'),
    tokenAAccount: new PublicKey('GBVCpBfXraecAE6W5soMg87SyvwDZJAiCoJk1KjHB9uU'),
    tokenBAccount: new PublicKey('BhZCbNvdGGZWEKZoRCrWHoxr4c2wbugEyfNJUm9vNzzw'),
    treasuryTokenBAccount: new PublicKey('GNwm4sezRcUPvScZm9cbWFRaiwgY8rbkz22cmKzMFaTg'),
  },
};
