import { Network } from '../models';

export function makeExplorerUrl(txHash: string, network: Network): string {
  switch (network) {
    case Network.MainnetProd:
      return `https://explorer.solana.com/tx/${txHash}`;
    case Network.DevnetProd:
    case Network.DevnetStaging:
      return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
  }
}
