exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const message = body.message || "🚨 A dustbin is FULL!";

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}\n\n👉 Check dashboard: https://smartdustbin-ash.netlify.app/`;

    const res = await fetch(url);
    const data = await res.json();
    console.log("Telegram response:", data);

    return { statusCode: 200, body: JSON.stringify({ success: true, telegram: data }) };
  } catch (err) {
    console.error("Error sending Telegram:", err);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
};
