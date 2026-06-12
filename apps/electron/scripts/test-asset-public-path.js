const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const {
  importAssetFiles,
  syncAllAssetsToRemotionPublic,
  resolvePublicMirrorPath,
} = require("../src/main/services/asset-service");
const { removeDirRecursive } = require("../src/main/services/file-service");

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-asset-${Date.now()}`);
  const projectRoot = path.join(tmpRoot, "project");
  const sampleMp4 = path.join(tmpRoot, "sample.mp4");

  fs.mkdirSync(projectRoot, { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "subprojects", "default", "remotion", "public"), {
    recursive: true,
  });
  require("./test-fixtures/media-bytes").writeMinimalMp4(sampleMp4);

  const { imported } = await importAssetFiles(projectRoot, [sampleMp4], { fps: 30 });

  if (imported.length !== 1) {
    throw new Error("import failed");
  }

  const asset = imported[0];
  const publicRoot = path.join(
    projectRoot,
    "subprojects",
    "default",
    "remotion",
    "public",
  );
  const expected = resolvePublicMirrorPath(publicRoot, asset.publicPath);

  if (!fs.existsSync(expected)) {
    throw new Error(`public mirror missing: ${expected}`);
  }
  if (!asset.publicPath.startsWith("/assets/video/")) {
    throw new Error(`publicPath mismatch: ${asset.publicPath}`);
  }

  fs.unlinkSync(expected);
  syncAllAssetsToRemotionPublic(projectRoot);
  if (!fs.existsSync(expected)) {
    throw new Error("syncAllAssetsToRemotionPublic did not restore mirror file");
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-public-path");
}

run().catch((err) => {
  console.error("[FAIL] asset-public-path", err);
  process.exit(1);
});
