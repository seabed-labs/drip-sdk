import cron from 'node-cron';
import { notifyDiscord } from './discord';
import {
  LAMPORTS_PER_SOL
} from '@solana/web3.js';


import { getBalanceHandler } from './getBalance';

export const EVERY_30_SECONDS = '*/30 * * * * *';
export const EVERY_MINUTE = '* * * * * ';
export const EVERY_30_MINUTES = '*/30 * * * *';
export const EVERY_HOUR = '0 0 * * * *';

const WALLET_ADDRESS = "BJmuWLetrZRm2ADpDVxArg6CovgUwxgYESV5GHVDwnHi";

export default () => {
  cron.schedule(EVERY_30_SECONDS, async () => {
    
    // Random test wallet
    const balanceLamports = await getBalanceHandler(WALLET_ADDRESS);
    const balanceSOL = (balanceLamports / LAMPORTS_PER_SOL).toFixed(2);

    const msg = {
      "Keeper Bot System Account": WALLET_ADDRESS,
      "SOL Balance": balanceSOL,
    }
    console.log(msg);

    await notifyDiscord(JSON.stringify(msg));
  });

  cron.schedule(EVERY_HOUR, async () => {
    // Schedule more if we want..
  });
}