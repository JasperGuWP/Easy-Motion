import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: path.join(__dirname, "src/renderer"),
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/renderer/src"),
    },
  },
  server: {
    // 固定 IPv4，避免 Windows 上 localhost→::1 导致 127.0.0.1 无法连接（F5 / wait-on / Electron）
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: path.join(__dirname, "dist/renderer"),
    emptyOutDir: true,
  },
});
