import { Network } from '../models';

export function makeExplorerUrl(txHash: string, network: Network): string {
  switch (network) {
    case Network.Mainnet:
      return `https://explorer.solana.com/tx/${txHash}`;
    case Network.Devnet:
      return `https://explorer.solana.com/tx/${txHash}?cluster=devnet`;
    case Network.Localnet:
      return `https://explorer.solana.com/tx/${txHash}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`;
  }
}
