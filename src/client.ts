import {
  clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey,
} from '@solana/web3.js';

const cluster = process.env.environment === 'devnet' || process.env.environment === undefined ? 'devnet' : 'mainnet-beta';

function wait(ms = 1000) {
  return new Promise((resolve) => {
    console.log(`waiting ${ms} ms...`);
    setTimeout(resolve, ms);
  });
}

// Create connection
function createConnection(url = clusterApiUrl(cluster)): Connection {
  return new Connection(url);
}

export function lamportsToSol(val: number): string {
  return (val / LAMPORTS_PER_SOL).toFixed(2);
}

// Get balance
async function getBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
  return connection.getBalance(publicKey, 'confirmed');
}

export async function getBalanceHandler(address: string): Promise<number> {
  const publicKey = new PublicKey(address);
  const connection = createConnection();

  let balance = await getBalance(connection, publicKey);
  // Poll till you get a balance.
  while (!balance) {
    // eslint-disable-next-line no-await-in-loop
    await wait();
    // eslint-disable-next-line no-await-in-loop
    balance = await getBalance(connection, publicKey);
  }
  return balance;
}

export function getExplorerURL(address: string): string {
  return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
}

export function getCluster(): string {
  return cluster;
}
