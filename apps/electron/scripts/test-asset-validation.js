const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  validateAssetFile,
  planImportBatches,
} = require("../src/main/services/asset-validation");
const { writeMinimalMp4, writeMinimalPng } = require("./test-fixtures/media-bytes");
const { removeDirRecursive } = require("../src/main/services/file-service");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-val-${Date.now()}`);
  fs.mkdirSync(tmpRoot, { recursive: true });

  const goodMp4 = path.join(tmpRoot, "ok.mp4");
  const goodPng = path.join(tmpRoot, "ok.png");
  const badMp4 = path.join(tmpRoot, "bad.mp4");
  const empty = path.join(tmpRoot, "empty.png");

  writeMinimalMp4(goodMp4);
  writeMinimalPng(goodPng);
  fs.writeFileSync(badMp4, "not-a-video");
  fs.writeFileSync(empty, "");

  assert(validateAssetFile(goodMp4).ok, "valid mp4");
  assert(validateAssetFile(goodPng).ok, "valid png");
  assert(!validateAssetFile(badMp4).ok, "invalid mp4 rejected");
  assert(validateAssetFile(badMp4).code === "E2031", "E2031 for bad magic");
  assert(!validateAssetFile(empty).ok, "empty rejected");

  const paths = Array.from({ length: 55 }, (_, i) => `f${i}.mp4`);
  const plan = planImportBatches(paths);
  assert(plan.useBatching, "55 files should batch");
  assert(plan.batches.length === 6, `expected 6 batches, got ${plan.batches.length}`);
  assert(plan.batches[0].length === 10, "batch size 10");

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-validation");
}

run().catch((err) => {
  console.error("[FAIL] asset-validation", err);
  process.exit(1);
});
