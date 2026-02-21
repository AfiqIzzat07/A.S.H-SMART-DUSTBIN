// netlify/functions/notify-full.js
const fetch = require("node-fetch");

exports.handler = async () => {
  const FIREBASE_URL = "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app/dustbin/fullness.json";
  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const TELEGRAM_CHAT_ID  = process.env.CHAT_ID;

  // Get current fullness from Firebase
  const res = await fetch(FIREBASE_URL);
  const fullness = await res.json();

  if(fullness >= 80){
    // send telegram
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=🚨 Block A Dustbin is FULL! Check dashboard: https://YOUR_NETLIFY_SITE.netlify.app/`;
    const send = await fetch(url);
    const data = await send.json();
    console.log("Telegram result:", data);
    return { statusCode: 200, body: JSON.stringify(data) };
  }

  return { statusCode: 200, body: "Not full" };
};
