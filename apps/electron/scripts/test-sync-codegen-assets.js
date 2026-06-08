const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { generateRemotionCode } = require("../src/main/generator");
const { readJsonFile } = require("../src/main/services/file-service");

const tmpRoot = path.join(os.tmpdir(), `easymotion-sync-${Date.now()}`);
const remotionSrcDir = path.join(tmpRoot, "remotion", "src");

function run() {
  const timeline = readJsonFile(
    path.join(__dirname, "../../../packages/shared/fixtures/sample-timeline.json"),
  );

  timeline.tracks.push({
    id: "track-video-1",
    type: "video",
    name: "视频轨",
    order: 50,
    visible: true,
    locked: false,
    clips: [
      {
        id: "clip-video-1",
        type: "video",
        name: "demo.mp4",
        startInFrames: 0,
        durationInFrames: 30,
        lastModifiedBy: "user",
        source: {
          kind: "asset",
          assetId: "asset-1",
          publicPath: "/assets/video/demo.mp4",
          path: "demo.mp4",
        },
        transform: {
          position: { x: 960, y: 540 },
          scale: 1,
          rotation: 0,
          opacity: 1,
        },
        keyframes: [],
      },
    ],
  });

  fs.mkdirSync(path.join(remotionSrcDir, "components"), { recursive: true });

  const result = generateRemotionCode({ remotionSrcDir, timeline });
  const videoLayerPath = path.join(
    remotionSrcDir,
    "components",
    "layers",
    "VideoLayer.tsx",
  );
  const mainCode = fs.readFileSync(
    path.join(remotionSrcDir, "components", "MainSequence.tsx"),
    "utf8",
  );

  if (!fs.existsSync(videoLayerPath)) {
    throw new Error("VideoLayer.tsx was not copied from template");
  }
  if (!mainCode.includes("VideoLayer")) {
    throw new Error("MainSequence missing VideoLayer import");
  }
  if (!result.files.includes(videoLayerPath)) {
    throw new Error("generator files list missing VideoLayer path");
  }

  fs.rmSync(tmpRoot, { recursive: true, force: true });
  console.log("[PASS] sync-codegen-assets");
}

try {
  run();
} catch (err) {
  console.error("[FAIL] sync-codegen-assets", err);
  process.exit(1);
}
