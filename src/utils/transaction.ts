import { Network } from '../models';

export function makeExplorerUrl(txHash: string, network: Network): string {
  switch (network) {
    case Network.Mainnet:
      return `https://explorer.solana.com/tx/${txHash}`;
    case Network.Devnet:
      return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
  }
}
