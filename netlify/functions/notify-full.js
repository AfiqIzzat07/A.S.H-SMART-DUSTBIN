// notify-full.js
export async function handler(event, context) {
  // Only handle POST requests (from Firebase webhook or ESP32)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);

    // Expecting body to contain a message string
    const message =
      body.message ||
      "🚨 Dustbin is FULL!\nCheck dashboard: https://YOUR_SITE.netlify.app";

    const token = process.env.BOT_TOKEN;
    const chat = process.env.CHAT_ID;

    // Use global fetch (Node 18+ on Netlify)
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text: message }),
      }
    );

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, telegramResponse: data }),
    };
  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
}
