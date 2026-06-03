/**
 * 等待 Electron remote-debugging-port（供 compound 中 Renderer attach 使用）
 */
const waitOn = require("wait-on");

const port = process.env.ELECTRON_CDP_PORT || "9222";
const target = `tcp:127.0.0.1:${port}`;

waitOn({ resources: [target], timeout: 120000, interval: 300 })
  .then(() => {
    console.log("[wait-cdp] ready:", target);
    process.exit(0);
  })
  .catch((err) => {
    console.error("[wait-cdp]", err.message);
    process.exit(1);
  });
