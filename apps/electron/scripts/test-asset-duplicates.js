const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  nextRenamedOriginalName,
  detectImportConflicts,
} = require("../src/main/services/asset-duplicates");
const { importAssetFiles } = require("../src/main/services/asset-service");
const { writeMinimalPng } = require("./test-fixtures/media-bytes");
const { removeDirRecursive } = require("../src/main/services/file-service");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

/** 与 writeMinimalPng 魔数相同但内容不同，避免 SHA-256 去重 */
function writePngVariant(filePath, tag) {
  writeMinimalPng(filePath);
  fs.appendFileSync(filePath, Buffer.from(tag));
}

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-dup-${Date.now()}`);
  const projectRoot = path.join(tmpRoot, "project");
  fs.mkdirSync(path.join(projectRoot, "subprojects", "default", "remotion", "public"), {
    recursive: true,
  });

  const logoA = path.join(tmpRoot, "a", "logo.png");
  const logoB = path.join(tmpRoot, "b", "logo.png");
  const logoC = path.join(tmpRoot, "c", "logo.png");
  const logoD = path.join(tmpRoot, "d", "logo.png");
  fs.mkdirSync(path.dirname(logoA), { recursive: true });
  fs.mkdirSync(path.dirname(logoB), { recursive: true });
  fs.mkdirSync(path.dirname(logoC), { recursive: true });
  fs.mkdirSync(path.dirname(logoD), { recursive: true });

  writePngVariant(logoA, "a");
  writePngVariant(logoB, "b");
  writePngVariant(logoC, "c");
  writePngVariant(logoD, "d");

  const first = await importAssetFiles(projectRoot, [logoA], { fps: 30 });
  assert(first.imported.length === 1, "first import");

  const manifest = { assets: first.imported };
  const conflicts = detectImportConflicts(manifest, [logoB]);
  assert(conflicts.length === 1, "name conflict detected");

  const renamed = nextRenamedOriginalName(manifest, "logo.png");
  assert(renamed === "logo (1).png", `rename expected logo (1).png got ${renamed}`);

  const skip = await importAssetFiles(projectRoot, [logoB], {
    fps: 30,
    duplicatePolicy: "skip",
  });
  assert(
    skip.skipped.some((s) => s.reason === "duplicate"),
    "skip policy for same name",
  );

  // 相同内容应走 SHA-256 去重（须在覆盖测试之前，避免文件哈希被改写）
  const sameContent = path.join(tmpRoot, "copy", "logo.png");
  fs.mkdirSync(path.dirname(sameContent), { recursive: true });
  fs.copyFileSync(logoA, sameContent);
  const dedup = await importAssetFiles(projectRoot, [sameContent], { fps: 30 });
  assert(dedup.imported.length === 1, "dedup returns existing");
  assert(dedup.imported[0].id === first.imported[0].id, "dedup same id");
  assert(
    dedup.skipped?.some((s) => s.reason === "content-duplicate"),
    "content-duplicate marker",
  );

  const rename = await importAssetFiles(projectRoot, [logoC], {
    fps: 30,
    duplicatePolicy: "rename",
  });
  assert(rename.imported.length === 1, "rename import");
  assert(rename.imported[0].originalName === "logo (1).png", "renamed file");

  const overwrite = await importAssetFiles(projectRoot, [logoD], {
    fps: 30,
    duplicatePolicy: "overwrite",
  });
  assert(overwrite.imported.length === 1, "overwrite import");
  assert(overwrite.imported[0].id === first.imported[0].id, "same asset id");

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-duplicates");
}

run().catch((err) => {
  console.error("[FAIL] asset-duplicates", err);
  process.exit(1);
});
