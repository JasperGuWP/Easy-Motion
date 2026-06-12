const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { importAssetFiles, listAssets, isAssetDbEnabled } = require("../src/main/services/asset-service");
const assetDb = require("../src/main/services/asset-db-service");
const { hashFileSync } = require("../src/main/services/asset-hash");
const { writeMinimalPng } = require("./test-fixtures/media-bytes");
const { removeDirRecursive } = require("../src/main/services/file-service");

async function run() {
  if (!isAssetDbEnabled()) {
    console.log("[SKIP] asset-db (better-sqlite3 not installed)");
    return;
  }

  const tmpRoot = path.join(os.tmpdir(), `easymotion-sqldb-${Date.now()}`);
  const projectRoot = path.join(tmpRoot, "project");
  fs.mkdirSync(path.join(projectRoot, "subprojects", "default", "remotion", "public"), {
    recursive: true,
  });

  const logo = path.join(tmpRoot, "logo.png");
  const logoCopy = path.join(tmpRoot, "logo-copy.png");
  writeMinimalPng(logo);
  writeMinimalPng(logoCopy);

  const hash = hashFileSync(logo);
  if (hash.length !== 64) {
    throw new Error("invalid sha256 length");
  }

  const first = await importAssetFiles(projectRoot, [logo], { fps: 30 });
  if (first.imported.length !== 1) {
    throw new Error("first import failed");
  }

  const fromDb = assetDb.findByContentHash(projectRoot, hash);
  if (!fromDb || fromDb.id !== first.imported[0].id) {
    throw new Error("db hash lookup failed after import");
  }

  const second = await importAssetFiles(projectRoot, [logoCopy], { fps: 30 });
  if (second.imported.length !== 1) {
    throw new Error("dedup should return existing asset");
  }
  if (second.imported[0].id !== first.imported[0].id) {
    throw new Error("dedup should reuse same asset id");
  }
  if (!second.skipped?.some((s) => s.reason === "content-duplicate")) {
    throw new Error("expected content-duplicate skip record");
  }

  const listed = listAssets(projectRoot);
  if (listed.length !== 1) {
    throw new Error(`expected 1 asset in list, got ${listed.length}`);
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-db");
}

run().catch((err) => {
  console.error("[FAIL] asset-db", err);
  process.exit(1);
});
