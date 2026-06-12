/** M6-07：同名素材检测与重命名 */

function namesEqual(a, b) {
  return String(a).toLowerCase() === String(b).toLowerCase();
}

function findAssetByOriginalName(manifest, originalName) {
  return (
    manifest.assets.find(
      (a) => !a.isDeleted && namesEqual(a.originalName, originalName),
    ) ?? null
  );
}

function nextRenamedOriginalName(manifest, originalName) {
  const path = require("node:path");
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  for (let n = 1; n < 1000; n += 1) {
    const candidate = `${base} (${n})${ext}`;
    if (!findAssetByOriginalName(manifest, candidate)) {
      return candidate;
    }
  }
  return `${base} (${Date.now()})${ext}`;
}

function detectImportConflicts(manifest, filePaths) {
  const path = require("node:path");
  const conflicts = [];
  for (const filePath of filePaths) {
    if (!filePath) continue;
    const originalName = path.basename(filePath);
    const existing = findAssetByOriginalName(manifest, originalName);
    if (existing) {
      conflicts.push({
        path: filePath,
        originalName,
        existingAssetId: existing.id,
      });
    }
  }
  return conflicts;
}

module.exports = {
  namesEqual,
  findAssetByOriginalName,
  nextRenamedOriginalName,
  detectImportConflicts,
};
