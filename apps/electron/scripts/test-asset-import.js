const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const assetService = require("../src/main/services/asset-service");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "em-asset-import-"));
  const remotionDir = path.join(
    projectRoot,
    "subprojects",
    "default",
    "remotion"
  );
  fs.mkdirSync(path.join(remotionDir, "public"), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, "assets", "image"), { recursive: true });

  const sourceFile = path.join(os.tmpdir(), `em-test-${Date.now()}.png`);
  fs.writeFileSync(sourceFile, Buffer.from([0x89, 0x50, 0x4e, 0x47]));

  const asset = await assetService.importAssetSource(
    projectRoot,
    {
      source: sourceFile,
      type: "image",
      name: "测试图",
    },
    { subprojectPath: "subprojects/default", fps: 30 }
  );

  assert(asset.id, "asset should have id");
  assert(asset.type === "image", "asset type image");
  assert(asset.name === "测试图", "asset name updated");
  assert(fs.existsSync(path.join(projectRoot, asset.path)), "asset file copied");

  console.log("asset import tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
