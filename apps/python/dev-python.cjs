const { spawn } = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");

const root = __dirname;
const pythonCandidates =
  process.platform === "win32"
    ? [
        path.join(root, ".venv", "Scripts", "python.exe"),
        path.join(root, ".venv", "python.exe"),
      ]
    : [path.join(root, ".venv", "bin", "python")];

const python = pythonCandidates.find((candidate) => fs.existsSync(candidate));
if (!python) {
  console.error(
    "Python not found in apps/python/.venv. Run:\n" +
      "  cd apps/python && python -m venv .venv && .venv\\Scripts\\pip install -r requirements.txt"
  );
  process.exit(1);
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "127.0.0.1");
  });
}

async function pickPort() {
  const preferred = Number(process.env.EASY_MOTION_PYTHON_PORT || 8000);
  if (await isPortFree(preferred)) {
    return preferred;
  }

  console.warn(`[python] Port ${preferred} is in use, trying 8001–8019…`);

  for (let port = 8001; port <= 8019; port += 1) {
    if (await isPortFree(port)) {
      return port;
    }
  }

  throw new Error("No free port found between 8001 and 8019");
}

async function main() {
  const port = await pickPort();
  console.log(`[python] Uvicorn http://127.0.0.1:${port}`);

  const child = spawn(
    python,
    [
      "-m",
      "uvicorn",
      "main:app",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
      "--reload",
    ],
    { stdio: "inherit", cwd: root, env: { ...process.env, PORT: String(port) } }
  );

  child.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((err) => {
  console.error("[python]", err.message);
  process.exit(1);
});
