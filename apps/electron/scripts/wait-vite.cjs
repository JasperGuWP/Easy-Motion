/**
 * 等待 Vite 开发服务器就绪（供 VS Code preLaunchTask 使用）
 */
const waitOn = require("wait-on");

const opts = {
  timeout: 120000,
  interval: 500,
  validateStatus: (status) => status >= 200 && status < 500,
};

const targets = process.env.VITE_DEV_URL
  ? [process.env.VITE_DEV_URL]
  : ["http-get://127.0.0.1:5173", "http-get://localhost:5173"];

async function waitAny() {
  const attempts = targets.map((resource) =>
    waitOn({ ...opts, resources: [resource] }).then(() => resource),
  );
  return Promise.race(attempts);
}

waitAny()
  .then((ready) => {
    console.log("[wait-vite] ready:", ready);
    process.exit(0);
  })
  .catch((err) => {
    console.error("[wait-vite]", err.message);
    process.exit(1);
  });
