import cron from 'node-cron';
import { notifyDiscord } from './discord';
import { getBalanceHandler, getCluster, getExplorerURL, lamportsToSol } from './client';

export const EVERY_30_SECONDS = '*/30 * * * * *';
export const EVERY_MINUTE = '* * * * * ';
export const EVERY_30_MINUTES = '*/30 * * * *';
export const EVERY_HOUR = '0 0 * * * *';

const WALLET_ADDRESS = process.env.WALLET_ADDRESS ?? 'BJmuWLetrZRm2ADpDVxArg6CovgUwxgYESV5GHVDwnHi';

export const sendBalanceUpdate = async () => {
  const balanceLamports = await getBalanceHandler(WALLET_ADDRESS);
  const balanceSOL = lamportsToSol(balanceLamports);
  await notifyDiscord('Keeper Bot Balance Update', [
    {
      description: `[${WALLET_ADDRESS}](${getExplorerURL(WALLET_ADDRESS)})`,
      color:
        balanceLamports > 5000000000 ? 3066993 : balanceLamports > 1000000000 ? 15258703 : 15158332,
      fields: [
        {
          name: 'Lamports',
          value: `${balanceLamports.toString()}`,
          inline: true
        },
        {
          name: 'Sol',
          value: `${balanceSOL}`,
          inline: true
        },
        {
          name: 'Cluster',
          value: `${getCluster()}`,
          inline: true
        }
      ]
    }
  ]);
};

export default () => {
  cron.schedule(EVERY_HOUR, async () => {
    await sendBalanceUpdate();
  });
};
