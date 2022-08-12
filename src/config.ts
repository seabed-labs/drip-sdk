import { Network } from '@dcaf-labs/drip-sdk/dist/models/network';
import { networkInterfaces } from 'os';

export const Config: {
  port: number;
  environment: Network;
} = {
  port: parseInt(process.env.PORT || '8080', 10),
  environment: process.env.ENVIRONMENT === 'mainnetbeta' ? Network.Mainnet : Network.Devnet
};
