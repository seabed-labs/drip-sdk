import fetch from "node-fetch";

const DISCORD_WEBHOOK_ALERTS_CHANNEL = 'https://discord.com/api/webhooks/979236930388627496/dDcCroI7KiHEWVUnx0_svKBLfOlQ7pvRTH1jlFb9X11UB4g3NerOFOFBD-khu9C0CpE-';

export async function notifyDiscord(msg: string) {

    const body = {
        name: 'Keeper Bot Balance Status',
        content: msg,
    }

    const response = await fetch(DISCORD_WEBHOOK_ALERTS_CHANNEL, {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
 });

    const data = await response.json();
    console.log(data);
}