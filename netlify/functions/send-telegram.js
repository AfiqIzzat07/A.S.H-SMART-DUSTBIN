exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const text =
    body.message +
    "\n\n👉 Open dashboard:\nhttps://YOUR_SITE.netlify.app";

  const token = process.env.BOT_TOKEN;
  const chat = process.env.CHAT_ID;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text })
  });

  return { statusCode: 200, body: "sent" };
};
