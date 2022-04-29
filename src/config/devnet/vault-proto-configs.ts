import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L: {
    pubkey: new PublicKey('mRcJ27ztTCFntbUvv7V2PSxqL9fJfg1KH4fzZSYVP4L'),
    granularity: 60,
  },
  CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer: {
    pubkey: new PublicKey('CjxcyivgP69qEvXvKFbsYjTxavPWwh5UEWwtzbjodwer'),
    granularity: 3600,
  },
  BWdfuPvDnXzaHSPV5i4zG7mToDrYeywZYxptx79hiwmn: {
    pubkey: new PublicKey('BWdfuPvDnXzaHSPV5i4zG7mToDrYeywZYxptx79hiwmn'),
    granularity: 86400,
  },
};
