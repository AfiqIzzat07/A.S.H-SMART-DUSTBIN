export async function handler() {
  const BOT = process.env.BOT_TOKEN;
  const CHAT = process.env.CHAT_ID;

  const text =
    "🚨 SMART DUSTBIN ALERT\n\n" +
    "Status: FULL\n" +
    "Please clear the bin.\n\n" +
    "👉 Open dashboard:\nhttps://smartdustbin-ash.netlify.app/";

  await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT, text })
  });

  return { statusCode: 200, body: "sent" };
}
