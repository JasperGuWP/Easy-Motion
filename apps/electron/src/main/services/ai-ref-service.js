const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { copyFile, ensureDir } = require("./file-service");

const AI_REFS_DIR = "assets/ai-refs";
const MAX_AI_REFS = 3;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function getAiRefsDir(projectPath) {
  return path.join(projectPath, AI_REFS_DIR);
}

function resolveAiRefPath(projectPath, relativeOrAbsolute) {
  if (!relativeOrAbsolute) {
    throw new Error("E2002: 无效的图片路径");
  }
  if (path.isAbsolute(relativeOrAbsolute)) {
    return relativeOrAbsolute;
  }
  return path.join(projectPath, relativeOrAbsolute);
}

async function importAiRefFiles(projectPath, filePaths) {
  if (!Array.isArray(filePaths) || filePaths.length === 0) {
    throw new Error("E2002: 未选择图片");
  }

  const destDir = getAiRefsDir(projectPath);
  ensureDir(destDir);

  const imported = [];
  for (const src of filePaths.slice(0, MAX_AI_REFS)) {
    const ext = path.extname(src).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(ext)) {
      throw new Error(`E2031: 不支持的图片格式 ${ext || "(无扩展名)"}`);
    }

    const id = `ai-ref-${crypto.randomUUID()}`;
    const storedName = `${id}${ext}`;
    const dest = path.join(destDir, storedName);
    await copyFile(src, dest);

    imported.push({
      id,
      name: path.basename(src),
      path: dest,
      relativePath: path.posix.join(AI_REFS_DIR, storedName),
    });
  }

  return { images: imported, max: MAX_AI_REFS };
}

function readAiRefAsDataUrl(projectPath, relativeOrAbsolute) {
  const absolute = resolveAiRefPath(projectPath, relativeOrAbsolute);
  if (!fs.existsSync(absolute)) {
    throw new Error("E2001: 参考图不存在");
  }

  const ext = path.extname(absolute).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : ext === ".gif"
          ? "image/gif"
          : "image/jpeg";
  const data = fs.readFileSync(absolute);
  return `data:${mime};base64,${data.toString("base64")}`;
}

module.exports = {
  AI_REFS_DIR,
  MAX_AI_REFS,
  importAiRefFiles,
  readAiRefAsDataUrl,
  resolveAiRefPath,
};
