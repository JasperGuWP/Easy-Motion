const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { importAssetFiles } = require("../src/main/services/asset-service");
const { writeMinimalPng } = require("./test-fixtures/media-bytes");
const { removeDirRecursive } = require("../src/main/services/file-service");

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-batch-${Date.now()}`);
  const projectRoot = path.join(tmpRoot, "project");
  fs.mkdirSync(path.join(projectRoot, "subprojects", "default", "remotion", "public"), {
    recursive: true,
  });

  const paths = [];
  for (let i = 0; i < 12; i += 1) {
    const p = path.join(tmpRoot, `img-${i}.png`);
    writeMinimalPng(p);
    paths.push(p);
  }

  const progress = [];
  const { imported, errors } = await importAssetFiles(projectRoot, paths, {
    fps: 30,
    onProgress: (p) => progress.push({ ...p }),
  });

  if (imported.length !== 12) {
    throw new Error(`expected 12 imported, got ${imported.length}`);
  }
  if (errors.length > 0) {
    throw new Error(`unexpected errors: ${errors[0].message}`);
  }
  if (!progress.some((p) => p.phase === "done")) {
    throw new Error("missing done progress");
  }
  if (progress[progress.length - 1].done !== 12) {
    throw new Error("final progress count mismatch");
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-import-batch");
}

run().catch((err) => {
  console.error("[FAIL] asset-import-batch", err);
  process.exit(1);
});
