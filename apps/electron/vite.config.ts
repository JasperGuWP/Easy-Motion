import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const RENDERER_DEV_PORT = 5176;

/** Vite 开发模式依赖 eval / WebSocket HMR，需比生产环境宽松的 CSP */
const DEV_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: em-asset:",
  "media-src 'self' blob: em-asset:",
  `connect-src 'self' ws://127.0.0.1:${RENDERER_DEV_PORT} ws://localhost:${RENDERER_DEV_PORT} http://127.0.0.1:* http://localhost:*`,
  "frame-src http://127.0.0.1:* http://localhost:*",
].join("; ");

function devCspPlugin(): Plugin {
  return {
    name: "easymotion-dev-csp",
    transformIndexHtml(html, ctx) {
      if (!ctx.server) return html;
      // 开发态用响应头注入 CSP；移除 HTML 内更严格的 meta，避免双重策略拦截 Vite
      return html.replace(
        /\s*<meta\s+http-equiv="Content-Security-Policy"[^>]*>\s*/i,
        "",
      );
    },
  };
}

export default defineConfig({
  root: path.join(__dirname, "src/renderer"),
  base: "./",
  plugins: [react(), devCspPlugin()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/renderer/src"),
    },
  },
  optimizeDeps: {
    // workspace CJS 包需预构建，否则 Vite 以 /@fs/ 直读时无法提供命名 ESM 导出
    include: ["@easymotion/shared"],
  },
  server: {
    // 固定 IPv4，避免 Windows 上 localhost→::1 导致 127.0.0.1 无法连接（F5 / wait-on / Electron）
    host: "127.0.0.1",
    port: RENDERER_DEV_PORT,
    strictPort: true,
    headers: {
      "Content-Security-Policy": DEV_CSP,
    },
  },
  build: {
    outDir: path.join(__dirname, "dist/renderer"),
    emptyOutDir: true,
  },
});
