import { Network } from '../models';

export function makeSolscanUrl(txHash: string, network: Network): string {
  switch (network) {
    case Network.Mainnet:
      return `https://solscan.io/tx/${txHash}`;
    case Network.Devnet:
      return `https://solscan.io/tx/${txHash}?cluster=devnet`;
  }
}
