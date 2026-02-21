const db = "https://smart-dustbin-150307-default-rtdb.asia-southeast1.firebasedatabase.app";

function send(cmd) {
  fetch(`${db}/dustbin/servo.json`, {
    method: "PUT",
    body: JSON.stringify(cmd)
  });
}

setInterval(() => {
  fetch(`${db}/dustbin.json`)
    .then(r => r.json())
    .then(d => {
      document.getElementById("status").innerText = d.status;
      document.getElementById("percent").innerText = d.fullness + "%";

      if (d.notify) {
        fetch("/.netlify/functions/notify-full");
        fetch(`${db}/dustbin/notify.json`, {
          method: "PUT",
          body: "false"
        });
      }
    });
}, 3000);
