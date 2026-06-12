/**
 * 为 Electron 重新编译 better-sqlite3（系统 Node 与 Electron ABI 不同）。
 * 失败时不阻断 pnpm install，运行时会降级为仅 manifest。
 */
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const electronPkg = require("electron/package.json");
const electronVersion = electronPkg.version;

const result = spawnSync(
  "electron-rebuild",
  ["-f", "-w", "better-sqlite3", "-v", electronVersion],
  {
    cwd: path.join(__dirname, ".."),
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

if (result.status !== 0) {
  console.warn(
    "[rebuild-native] better-sqlite3 rebuild failed; asset DB will use manifest-only fallback.",
  );
  process.exit(0);
}
