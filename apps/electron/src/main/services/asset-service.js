const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { copyFile, ensureDir, readJsonFile, atomicWriteJson } = require("./file-service");
const { getRemotionDir } = require("./remotion-project");

const {
  EXTENSION_MAP,
  detectAssetTypeFromPath,
  validateAssetFile,
  planImportBatches,
} = require("./asset-validation");
const {
  findAssetByOriginalName,
  nextRenamedOriginalName,
  detectImportConflicts,
} = require("./asset-duplicates");
const { hashFileSync } = require("./asset-hash");
const assetDb = require("./asset-db-service");

const ASSET_TYPES = ["image", "video", "audio"];

function getManifestPath(projectRoot) {
  return path.join(projectRoot, "assets", "manifest.json");
}

function getRemotionPublicDir(projectRoot, subprojectRelativePath = "subprojects/default") {
  return path.join(getRemotionDir(projectRoot, subprojectRelativePath), "public");
}

/** publicPath 如 `/assets/video/uuid.mp4` → remotion/public/assets/video/uuid.mp4 */
function resolvePublicMirrorPath(publicRoot, publicPath) {
  const rel = String(publicPath).replace(/^\/+/, "");
  return path.join(publicRoot, rel);
}

function detectAssetType(filePath) {
  return detectAssetTypeFromPath(filePath);
}

function loadManifest(projectRoot) {
  const manifestPath = getManifestPath(projectRoot);
  if (!fs.existsSync(manifestPath)) {
    return { version: 1, assets: [] };
  }
  try {
    const data = readJsonFile(manifestPath);
    return {
      version: data.version ?? 1,
      assets: Array.isArray(data.assets) ? data.assets : [],
    };
  } catch {
    return { version: 1, assets: [] };
  }
}

async function saveManifest(projectRoot, manifest) {
  const manifestPath = getManifestPath(projectRoot);
  ensureDir(path.dirname(manifestPath));
  await atomicWriteJson(manifestPath, manifest);
}

function tryLoadParseMedia(remotionDir) {
  try {
    const parserRoot = path.join(remotionDir, "node_modules", "@remotion", "media-parser");
    const { parseMedia } = require(parserRoot);
    const { nodeReader } = require(path.join(parserRoot, "node"));
    return { parseMedia, nodeReader };
  } catch {
    return null;
  }
}

async function extractMediaMetadata(absolutePath, assetType, fps, remotionDir) {
  if (assetType === "image") {
    return { durationInFrames: Math.max(1, Math.round(fps * 3)) };
  }

  const parser = tryLoadParseMedia(remotionDir);
  if (!parser) {
    return { durationInFrames: Math.max(1, Math.round(fps * 5)) };
  }

  try {
    const fields = {
      durationInSeconds: true,
      dimensions: assetType === "video",
    };
    const result = await parser.parseMedia({
      src: absolutePath,
      fields,
      reader: parser.nodeReader,
    });

    const durationInFrames = result.durationInSeconds
      ? Math.max(1, Math.round(result.durationInSeconds * fps))
      : Math.max(1, Math.round(fps * 5));

    const meta = { durationInFrames };
    if (result.dimensions) {
      meta.width = result.dimensions.width;
      meta.height = result.dimensions.height;
    }
    return meta;
  } catch {
    return { durationInFrames: Math.max(1, Math.round(fps * 5)) };
  }
}

function stripInternalAssetFields(asset) {
  if (!asset) return asset;
  const { contentHash, sizeBytes, ...rest } = asset;
  return rest;
}

function syncAssetsIndex(projectRoot) {
  const manifest = loadManifest(projectRoot);
  assetDb.syncManifestToDb(projectRoot, manifest.assets);
}

function listAssets(projectRoot) {
  const manifest = loadManifest(projectRoot);
  const active = manifest.assets.filter((a) => !a.isDeleted);
  syncAssetsIndex(projectRoot);
  return active.map(stripInternalAssetFields);
}

function getAssetById(projectRoot, assetId) {
  const manifest = loadManifest(projectRoot);
  return manifest.assets.find((a) => a.id === assetId && !a.isDeleted) ?? null;
}

/** 供素材库悬停预览：返回 file:// URL */
function resolveAssetFileUrl(projectRoot, assetId) {
  const asset = getAssetById(projectRoot, assetId);
  if (!asset?.path) return null;
  const absolute = path.join(projectRoot, ...asset.path.split("/"));
  if (!fs.existsSync(absolute)) return null;
  return pathToFileURL(absolute).href;
}

function collectAssetReferences(timeline, assetId) {
  const refs = [];

  function walkTracks(tracks) {
    for (const track of tracks ?? []) {
      for (const clip of track.clips ?? []) {
        if (clip.source?.kind === "asset" && clip.source?.assetId === assetId) {
          refs.push({
            trackId: track.id,
            clipId: clip.id,
            clipName: clip.name ?? clip.id,
          });
        }
      }
      if (track.children?.length) {
        walkTracks(track.children);
      }
    }
  }

  walkTracks(timeline?.tracks);
  return refs;
}

async function deleteAsset(projectRoot, assetId, options = {}) {
  const mode = options.mode ?? "soft";
  const manifest = loadManifest(projectRoot);
  const idx = manifest.assets.findIndex((a) => a.id === assetId && !a.isDeleted);
  if (idx < 0) {
    throw new Error("素材不存在");
  }

  const refs = options.timeline
    ? collectAssetReferences(options.timeline, assetId)
    : [];

  if (refs.length > 0 && mode === "soft") {
    return {
      deleted: false,
      blocked: true,
      refs,
      removedClips: 0,
      timelineUpdated: false,
      assets: listAssets(projectRoot),
    };
  }

  let timelineAfter = options.timeline ?? null;
  let removedClips = 0;

  if (refs.length > 0 && mode === "removeClips" && timelineAfter) {
    const { removeClip } = require("../lib/timeline-agent-mutations");
    for (const ref of refs) {
      timelineAfter = removeClip(timelineAfter, ref.trackId, ref.clipId);
      removedClips += 1;
    }
  }

  manifest.assets[idx].isDeleted = true;
  await saveManifest(projectRoot, manifest);
  assetDb.markAssetDeleted(projectRoot, assetId);

  return {
    deleted: true,
    blocked: false,
    refs,
    removedClips,
    timeline: timelineAfter,
    timelineUpdated: removedClips > 0,
    assets: listAssets(projectRoot),
  };
}

/** 将项目 assets/ 下的文件同步到 remotion/public/assets/，供 staticFile 加载 */
function syncAllAssetsToRemotionPublic(
  projectRoot,
  subprojectRelativePath = "subprojects/default",
) {
  const publicRoot = getRemotionPublicDir(projectRoot, subprojectRelativePath);
  const synced = [];

  for (const asset of listAssets(projectRoot)) {
    const src = path.join(projectRoot, asset.path);
    const dest = resolvePublicMirrorPath(publicRoot, asset.publicPath);
    if (!fs.existsSync(src)) continue;
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    synced.push(dest);
  }

  return synced;
}

function emitImportProgress(onProgress, payload) {
  if (typeof onProgress === "function") {
    onProgress(payload);
  }
}

async function overwriteExistingAsset(
  projectRoot,
  sourcePath,
  existing,
  ctx,
) {
  const { fps, remotionDir, manifest } = ctx;
  const assetType = existing.type;
  const destPath = path.join(projectRoot, existing.path.replace(/\//g, path.sep));
  const publicRoot = ctx.publicRoot;
  const publicDest = resolvePublicMirrorPath(publicRoot, existing.publicPath);

  await copyFile(sourcePath, destPath);
  await copyFile(sourcePath, publicDest);

  const meta = await extractMediaMetadata(destPath, assetType, fps, remotionDir);
  const idx = manifest.assets.findIndex((a) => a.id === existing.id);
  if (idx < 0) {
    throw new Error("素材记录丢失");
  }

  const updated = {
    ...manifest.assets[idx],
    width: meta.width,
    height: meta.height,
    durationInFrames: meta.durationInFrames,
    importedAt: Date.now(),
    isDeleted: false,
  };
  manifest.assets[idx] = updated;
  return { record: updated, overwritten: true };
}

async function importSingleAssetFile(
  projectRoot,
  sourcePath,
  ctx,
) {
  const { fps, remotionDir, publicRoot, manifest, duplicatePolicy = "rename" } =
    ctx;

  const validation = validateAssetFile(sourcePath);
  if (!validation.ok) {
    return {
      error: {
        path: sourcePath,
        code: validation.code,
        message: validation.message,
      },
    };
  }

  let contentHash;
  let sizeBytes;
  try {
    contentHash = hashFileSync(sourcePath);
    sizeBytes = fs.statSync(sourcePath).size;
  } catch {
    return {
      error: { path: sourcePath, message: "无法读取文件内容" },
    };
  }

  const existingByHash = assetDb.findByContentHash(projectRoot, contentHash);
  if (existingByHash) {
    const record = stripInternalAssetFields(existingByHash);
    return { record, deduplicated: true };
  }

  const sourceBaseName = path.basename(sourcePath);
  const existing = findAssetByOriginalName(manifest, sourceBaseName);

  if (existing) {
    if (duplicatePolicy === "skip") {
      return {
        skipped: {
          path: sourcePath,
          originalName: sourceBaseName,
          reason: "duplicate",
        },
      };
    }
    if (duplicatePolicy === "overwrite") {
      try {
        return await overwriteExistingAsset(projectRoot, sourcePath, existing, ctx);
      } catch (err) {
        return {
          error: {
            path: sourcePath,
            message: err.message || "覆盖失败",
          },
        };
      }
    }
  }

  const assetType = validation.assetType;
  const displayName = existing
    ? nextRenamedOriginalName(manifest, sourceBaseName)
    : sourceBaseName;
  const id = crypto.randomUUID();
  const ext = path.extname(displayName);
  const storedName = `${id}${ext}`;
  const relativePath = path.posix.join("assets", assetType, storedName);
  const destPath = path.join(projectRoot, "assets", assetType, storedName);
  const publicPath = `/assets/${assetType}/${storedName}`;
  const publicDest = resolvePublicMirrorPath(publicRoot, publicPath);

  try {
    ensureDir(path.dirname(destPath));
    ensureDir(path.dirname(publicDest));
    await copyFile(sourcePath, destPath);
    await copyFile(sourcePath, publicDest);

    const meta = await extractMediaMetadata(destPath, assetType, fps, remotionDir);

    const record = {
      id,
      name: displayName,
      originalName: displayName,
      type: assetType,
      mimeType: guessMime(ext),
      path: relativePath.replace(/\\/g, "/"),
      publicPath,
      width: meta.width,
      height: meta.height,
      durationInFrames: meta.durationInFrames,
      importedAt: Date.now(),
      isDeleted: false,
    };

    manifest.assets.push(record);
    assetDb.upsertAsset(projectRoot, record, contentHash, sizeBytes);
    return { record };
  } catch (err) {
    return {
      error: {
        path: sourcePath,
        message: err.message || "导入失败",
      },
    };
  }
}

function detectImportConflictsForProject(projectRoot, filePaths) {
  const manifest = loadManifest(projectRoot);
  return detectImportConflicts(manifest, filePaths);
}

async function importAssetFiles(
  projectRoot,
  filePaths,
  options = {},
) {
  const subprojectPath = options.subprojectPath ?? "subprojects/default";
  const fps = options.fps ?? 30;
  const onProgress = options.onProgress;
  const remotionDir = getRemotionDir(projectRoot, subprojectPath);
  const publicRoot = getRemotionPublicDir(projectRoot, subprojectPath);
  const manifest = loadManifest(projectRoot);
  const imported = [];
  const errors = [];
  const skipped = [];

  const paths = (filePaths ?? []).filter(Boolean);
  const total = paths.length;
  const { batches } = planImportBatches(paths);
  const duplicatePolicy = options.duplicatePolicy ?? "rename";

  let done = 0;
  emitImportProgress(onProgress, { phase: "importing", done: 0, total });

  const ctx = {
    subprojectPath,
    fps,
    remotionDir,
    publicRoot,
    manifest,
    duplicatePolicy,
  };

  for (const batch of batches) {
    for (const sourcePath of batch) {
      emitImportProgress(onProgress, {
        phase: "importing",
        done,
        total,
        current: path.basename(sourcePath),
      });

      const result = await importSingleAssetFile(projectRoot, sourcePath, ctx);
      if (result.error) {
        errors.push(result.error);
      } else if (result.skipped) {
        skipped.push(result.skipped);
      } else if (result.record) {
        imported.push(result.record);
        if (result.deduplicated) {
          skipped.push({
            path: sourcePath,
            originalName: path.basename(sourcePath),
            reason: "content-duplicate",
            assetId: result.record.id,
          });
        }
      }

      done += 1;
      emitImportProgress(onProgress, {
        phase: "importing",
        done,
        total,
        current: path.basename(sourcePath),
      });
    }

    if (imported.length > 0) {
      await saveManifest(projectRoot, manifest);
    }
  }

  emitImportProgress(onProgress, { phase: "done", done: total, total });

  return { imported, errors, skipped, assets: listAssets(projectRoot) };
}

function guessExtFromUrl(urlString) {
  try {
    const pathname = new URL(urlString).pathname;
    const ext = path.extname(pathname);
    return ext || null;
  } catch {
    return null;
  }
}

function guessExtFromContentType(contentType) {
  const type = String(contentType ?? "").split(";")[0].trim().toLowerCase();
  const map = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
    "video/webm": ".webm",
    "audio/mpeg": ".mp3",
    "audio/wav": ".wav",
    "audio/aac": ".aac",
    "audio/mp4": ".m4a",
  };
  return map[type] ?? null;
}

async function downloadUrlToTemp(urlString) {
  const response = await fetch(urlString);
  if (!response.ok) {
    throw new Error(`下载素材失败: HTTP ${response.status}`);
  }

  const ext =
    guessExtFromUrl(urlString) ||
    guessExtFromContentType(response.headers.get("content-type")) ||
    ".bin";
  const tempDir = path.join(os.tmpdir(), "easymotion-import");
  ensureDir(tempDir);
  const tempPath = path.join(tempDir, `${crypto.randomUUID()}${ext}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(tempPath, buffer);
  return tempPath;
}

async function resolveImportSourcePath(projectRoot, source) {
  const trimmed = String(source ?? "").trim();
  if (!trimmed) {
    throw new Error("素材来源不能为空");
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return downloadUrlToTemp(trimmed);
  }

  if (fs.existsSync(trimmed)) {
    return trimmed;
  }

  const projectRelative = path.join(projectRoot, trimmed);
  if (fs.existsSync(projectRelative)) {
    return projectRelative;
  }

  throw new Error(`无法解析素材来源: ${trimmed}`);
}

async function importAssetSource(
  projectRoot,
  { source, type, name },
  options = {},
) {
  const filePath = await resolveImportSourcePath(projectRoot, source);
  const detectedType = detectAssetType(filePath);
  const assetType = type ?? detectedType;

  if (!assetType || !ASSET_TYPES.includes(assetType)) {
    throw new Error("不支持的素材类型");
  }
  if (detectedType && type && detectedType !== type) {
    throw new Error(`素材类型不匹配：文件为 ${detectedType}，指定为 ${type}`);
  }

  const { imported, errors } = await importAssetFiles(projectRoot, [filePath], options);
  if (!imported.length) {
    throw new Error(errors[0]?.message ?? "素材导入失败");
  }

  const asset = { ...imported[0] };
  if (name) {
    asset.name = name;
    const manifest = loadManifest(projectRoot);
    const index = manifest.assets.findIndex((item) => item.id === asset.id);
    if (index >= 0) {
      manifest.assets[index].name = name;
      await saveManifest(projectRoot, manifest);
    }
  }

  return asset;
}

function guessMime(ext) {
  const map = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".aac": "audio/aac",
    ".m4a": "audio/mp4",
  };
  return map[ext.toLowerCase()] ?? "application/octet-stream";
}

module.exports = {
  ASSET_TYPES,
  listAssets,
  getAssetById,
  importAssetFiles,
  importAssetSource,
  detectAssetType,
  resolveAssetFileUrl,
  syncAllAssetsToRemotionPublic,
  resolvePublicMirrorPath,
  validateAssetFile,
  detectImportConflicts: detectImportConflictsForProject,
  isAssetDbEnabled: assetDb.isDbEnabled,
};
