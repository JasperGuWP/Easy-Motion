/** 在 Electron 运行时执行脚本（native 模块已按 Electron ABI 编译，系统 Node 无法加载） */
const { spawnSync } = require("node:child_process");
const electronPath = require("electron");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/run-with-electron.cjs <script.js> [...args]");
  process.exit(1);
}

const result = spawnSync(electronPath, args, {
  stdio: "inherit",
  env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" },
});

process.exit(result.status === 0 ? 0 : result.status ?? 1);
