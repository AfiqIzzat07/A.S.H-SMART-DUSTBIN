exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const text =
      body.message +
      "\n\n👉 Open dashboard:\nhttps://smartdustbin-ash.netlify.app/"; // <-- replace with your Netlify site

    const token = process.env.BOT_TOKEN; // set in Netlify Env Variables
    const chat = process.env.CHAT_ID;     // set in Netlify Env Variables

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text })
    });

    return { statusCode: 200, body: "sent" };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "error sending telegram" };
  }
};
