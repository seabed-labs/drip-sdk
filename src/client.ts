import { Network } from '@dcaf-labs/drip-sdk/dist/models';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Config } from './config';

const cluster = Config.environment === Network.Mainnet ? 'mainnet-beta' : 'devnet';

function wait(ms = 1000) {
  return new Promise((resolve) => {
    console.log(`waiting ${ms} ms...`);
    setTimeout(resolve, ms);
  });
}
const maxRetry = 5;

function createConnection(url = clusterApiUrl(cluster)): Connection {
  return new Connection(url);
}

export function lamportsToSol(val: number): string {
  return (val / LAMPORTS_PER_SOL).toFixed(2);
}

async function getBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  return connection.getBalance(publicKey, 'confirmed');
}

export async function getBalanceHandler(address: string): Promise<number> {
  const publicKey = new PublicKey(address);
  const connection = createConnection();

  // Poll till you get a balance.
  let balance = await getBalance(connection, publicKey);
  let tries = 0;
  while (!balance && tries < maxRetry) {
    await wait();
    balance = await getBalance(connection, publicKey);
    tries++;
  }
  return balance;
}

export function getExplorerURL(address: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}

export function getCluster(): string {
  return cluster;
}
