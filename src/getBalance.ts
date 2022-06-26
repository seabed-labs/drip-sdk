import {
    clusterApiUrl,
    Connection,
    PublicKey,
  } from '@solana/web3.js';

// Create connection
function createConnection(url = clusterApiUrl('devnet')): Connection {
    return new Connection(url);
}

// Get balance
async function getBalance(connection: Connection, publicKey: PublicKey): Promise<number> {
    return await connection.getBalance(publicKey, "confirmed");
}

export async function getBalanceHandler(address: string): Promise<number> {
    const publicKey = new PublicKey(address);
    const connection = createConnection();

    let balance = await getBalance(connection, publicKey);
    // Poll till you get a balance.
    while (!balance) {
        await wait();
        balance = await getBalance(connection, publicKey);
    }
    return balance;
}

function wait(ms = 1000) {
    return new Promise(resolve => {
      console.log(`waiting ${ms} ms...`);
      setTimeout(resolve, ms);
    });
  }

  