import { PublicKey } from '@solana/web3.js';
import { VaultProtoConfig } from '../types';

export const vaultProtoConfigs: Record<string, VaultProtoConfig> = {
  Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr: {
    pubkey: new PublicKey('Et3bqQq32LPkrndf8gU9gRqfL4S13ubdUuiqBE1jjrgr'),
    granularity: 60,
  },
  CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid: {
    pubkey: new PublicKey('CWPAEgceXaUKfXkcxZBye1npBn7qFPL2AM5er6Rf4pid'),
    granularity: 3600,
  },
};
