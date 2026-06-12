const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const {
  importAssetFiles,
  deleteAsset,
  listAssets,
} = require("../src/main/services/asset-service");
const timelineService = require("../src/main/services/timeline-service");
const { addTrack, addClip, newId } = require("../src/main/lib/timeline-agent-mutations");
const { removeDirRecursive } = require("../src/main/services/file-service");

const SUBPROJECT = "subprojects/default";

async function run() {
  const tmpRoot = path.join(os.tmpdir(), `easymotion-del-${Date.now()}`);
  const parentPath = path.join(tmpRoot, "parent");
  const sampleMp4 = path.join(tmpRoot, "clip.mp4");

  fs.mkdirSync(parentPath, { recursive: true });
  require("./test-fixtures/media-bytes").writeMinimalMp4(sampleMp4);

  const created = await createProject({ name: "删除测试", parentPath });
  const projectPath = created.path;

  const { imported } = await importAssetFiles(projectPath, [sampleMp4], { fps: 30 });
  if (imported.length !== 1) {
    throw new Error("import failed");
  }
  const asset = imported[0];

  let timeline = timelineService.loadTimeline(projectPath, SUBPROJECT);
  const withTrack = addTrack(timeline, "video", "视频轨道");
  const clip = {
    id: newId("clip"),
    type: "video",
    name: asset.originalName,
    startInFrames: 0,
    durationInFrames: 30,
    source: {
      kind: "asset",
      assetId: asset.id,
      publicPath: asset.publicPath,
      path: asset.path,
    },
    lastModifiedBy: "user",
  };
  timeline = addClip(withTrack.timeline, withTrack.trackId, clip);
  await timelineService.saveTimeline(projectPath, timeline, SUBPROJECT);

  const blocked = await deleteAsset(projectPath, asset.id, {
    mode: "soft",
    timeline,
  });
  if (!blocked.blocked || blocked.refs.length !== 1) {
    throw new Error("soft delete should block when clip references asset");
  }
  if (listAssets(projectPath).length !== 1) {
    throw new Error("asset should remain when delete blocked");
  }

  const removed = await deleteAsset(projectPath, asset.id, {
    mode: "removeClips",
    timeline,
  });
  if (!removed.deleted || removed.removedClips !== 1) {
    throw new Error("removeClips delete failed");
  }
  if (removed.timeline) {
    await timelineService.saveTimeline(projectPath, removed.timeline, SUBPROJECT);
  }
  if (listAssets(projectPath).length !== 0) {
    throw new Error("asset should be soft-deleted from list");
  }

  const afterTimeline = timelineService.loadTimeline(projectPath, SUBPROJECT);
  const refsLeft = afterTimeline.tracks
    .flatMap((t) => t.clips)
    .filter((c) => c.source?.assetId === asset.id);
  if (refsLeft.length !== 0) {
    throw new Error("clip referencing deleted asset should be removed");
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] asset-delete");
}

run().catch((err) => {
  console.error("[FAIL] asset-delete", err);
  process.exit(1);
});
