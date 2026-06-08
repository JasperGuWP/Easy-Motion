const fs = require("node:fs");
const path = require("node:path");
const { getTemplatesDir } = require("../utils/paths");
const { ensureDir } = require("../services/file-service");
const { flattenTracksForCompile } = require("./flatten-tracks");
const {
  getLayerComponent,
  isComponentAnimationClip,
  resolveComponentModule,
} = require("./utils");

const LAYER_TYPES = new Set(["text", "image", "shape", "video", "audio"]);

function getTemplateRemotionSrcDir() {
  return path.join(
    getTemplatesDir(),
    "default-project",
    "subprojects",
    "default",
    "remotion",
    "src"
  );
}

function collectRequiredLayerNames(tracks) {
  const names = new Set();
  for (const track of flattenTracksForCompile(tracks)) {
    if (LAYER_TYPES.has(track.type)) {
      names.add(getLayerComponent(track.type));
    }
  }
  return names;
}

function collectRequiredComponentDirs(tracks) {
  const dirs = new Set();
  for (const track of flattenTracksForCompile(tracks)) {
    for (const clip of track.clips ?? []) {
      if (!isComponentAnimationClip(track, clip)) continue;
      const { importPath } = resolveComponentModule(clip.source.component);
      const rel = importPath.replace(/^\.\//, "");
      const top = rel.split("/")[0];
      if (top && top !== "layers") {
        dirs.add(top);
      }
    }
  }
  return dirs;
}

function copyFileIfMissing(src, dest) {
  if (!fs.existsSync(src) || fs.existsSync(dest)) return null;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return dest;
}

function copyDirMissingFiles(srcDir, destDir) {
  const copied = [];
  if (!fs.existsSync(srcDir)) return copied;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copied.push(...copyDirMissingFiles(srcPath, destPath));
      continue;
    }
    const result = copyFileIfMissing(srcPath, destPath);
    if (result) copied.push(result);
  }
  return copied;
}

/**
 * 将 Generator 引用到的 layer / 组件模块从模板补全到项目 remotion/src（仅补缺，不覆盖已有文件）。
 */
function ensureCodegenAssets(remotionSrcDir, timeline) {
  const templateSrc = getTemplateRemotionSrcDir();
  const copied = [];

  for (const layerName of collectRequiredLayerNames(timeline.tracks)) {
    const rel = path.join("components", "layers", `${layerName}.tsx`);
    const dest = copyFileIfMissing(
      path.join(templateSrc, rel),
      path.join(remotionSrcDir, rel)
    );
    if (dest) copied.push(dest);
  }

  for (const dirName of collectRequiredComponentDirs(timeline.tracks)) {
    copied.push(
      ...copyDirMissingFiles(
        path.join(templateSrc, "components", dirName),
        path.join(remotionSrcDir, "components", dirName)
      )
    );
  }

  return copied;
}

module.exports = {
  ensureCodegenAssets,
  collectRequiredLayerNames,
};
