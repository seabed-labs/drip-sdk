import fetch from 'node-fetch';

const DISCORD_WEBHOOK_ALERTS_CHANNEL =
  process.env.DISCORD_WEBHOOK_ALERTS_CHANNEL ??
  'https://discord.com/api/webhooks/979236930388627496/dDcCroI7KiHEWVUnx0_svKBLfOlQ7pvRTH1jlFb9X11UB4g3NerOFOFBD-khu9C0CpE-';

// eslint-disable-next-line import/prefer-default-export
export async function notifyDiscord(content: string, embeds?: unknown[]) {
  const body = {
    name: 'Balance Summary',
    avatar_url: 'https://pbs.twimg.com/profile_ixmages/1512938686702403603/DDObiFjj_400x400.jpg',
    content,
    embeds
  };
  await fetch(DISCORD_WEBHOOK_ALERTS_CHANNEL, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
}
