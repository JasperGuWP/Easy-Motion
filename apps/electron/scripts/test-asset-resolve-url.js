const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  importAssetFiles,
  resolveAssetFileUrl,
} = require("../src/main/services/asset-service");
const { removeDirRecursive } = require("../src/main/services/file-service");

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-url-${Date.now()}`);
  const projectRoot = path.join(tmpRoot, "project");
  const samplePng = path.join(tmpRoot, "thumb.png");

  fs.mkdirSync(projectRoot, { recursive: true });
  require("./test-fixtures/media-bytes").writeMinimalPng(samplePng);

  const { imported } = await importAssetFiles(projectRoot, [samplePng], { fps: 30 });
  if (imported.length !== 1) throw new Error("import failed");

  const url = resolveAssetFileUrl(projectRoot, imported[0].id);
  if (!url || !url.startsWith("file:")) {
    throw new Error(`expected file URL, got ${url}`);
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-resolve-url");
}

run().catch((err) => {
  console.error("[FAIL] asset-resolve-url", err);
  process.exit(1);
});
