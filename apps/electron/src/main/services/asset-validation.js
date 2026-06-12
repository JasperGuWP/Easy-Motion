const fs = require("node:fs");
const path = require("node:path");

const MAX_BYTES = {
  image: 50 * 1024 * 1024,
  video: 2 * 1024 * 1024 * 1024,
  audio: 500 * 1024 * 1024,
};

const EXTENSION_MAP = {
  png: "image",
  jpg: "image",
  jpeg: "image",
  webp: "image",
  gif: "image",
  svg: "image",
  mp4: "video",
  mov: "video",
  webm: "video",
  mp3: "audio",
  wav: "audio",
  aac: "audio",
  m4a: "audio",
};

const LARGE_IMPORT_TOTAL_BYTES = 1024 * 1024 * 1024;
const LARGE_IMPORT_FILE_COUNT = 50;
const IMPORT_BATCH_SIZE = 10;

function readHead(filePath, length = 16) {
  const fd = fs.openSync(filePath, "r");
  try {
    const buf = Buffer.alloc(length);
    const read = fs.readSync(fd, buf, 0, length, 0);
    return buf.subarray(0, read);
  } finally {
    fs.closeSync(fd);
  }
}

function startsWith(buf, bytes) {
  if (buf.length < bytes.length) return false;
  for (let i = 0; i < bytes.length; i += 1) {
    if (buf[i] !== bytes[i]) return false;
  }
  return true;
}

function asciiAt(buf, offset, text) {
  if (buf.length < offset + text.length) return false;
  return buf.toString("ascii", offset, offset + text.length) === text;
}

function validateMagic(filePath, assetType, ext) {
  const head = readHead(filePath, 32);

  if (ext === "svg") {
    const text = readHead(filePath, 512).toString("utf8").trimStart();
    if (text.startsWith("<?xml") || text.startsWith("<svg") || text.includes("<svg")) {
      return true;
    }
    return false;
  }

  if (assetType === "image") {
    if (ext === "png" && startsWith(head, [0x89, 0x50, 0x4e, 0x47])) return true;
    if ((ext === "jpg" || ext === "jpeg") && startsWith(head, [0xff, 0xd8, 0xff])) {
      return true;
    }
    if (ext === "gif" && startsWith(head, [0x47, 0x49, 0x46, 0x38])) return true;
    if (ext === "webp" && asciiAt(head, 0, "RIFF") && asciiAt(head, 8, "WEBP")) {
      return true;
    }
    return false;
  }

  if (assetType === "video") {
    if (ext === "webm" && startsWith(head, [0x1a, 0x45, 0xdf, 0xa3])) return true;
    if ((ext === "mp4" || ext === "mov") && asciiAt(head, 4, "ftyp")) return true;
    return false;
  }

  if (assetType === "audio") {
    if (ext === "wav" && asciiAt(head, 0, "RIFF") && asciiAt(head, 8, "WAVE")) {
      return true;
    }
    if (ext === "mp3" && (asciiAt(head, 0, "ID3") || (head[0] === 0xff && (head[1] & 0xe0) === 0xe0))) {
      return true;
    }
    if (ext === "m4a" && asciiAt(head, 4, "ftyp")) return true;
    if (ext === "aac" && head[0] === 0xff && (head[1] === 0xf1 || head[1] === 0xf9)) {
      return true;
    }
    return false;
  }

  return false;
}

function detectAssetTypeFromPath(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return EXTENSION_MAP[ext] ?? null;
}

function validateAssetFile(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return { ok: false, code: "E2030", message: "文件不存在" };
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const assetType = EXTENSION_MAP[ext];
  if (!assetType) {
    return {
      ok: false,
      code: "E2031",
      message: `不支持的文件格式：${path.extname(filePath)}`,
    };
  }

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return { ok: false, code: "E2030", message: "无法读取文件" };
  }

  if (!stat.isFile()) {
    return { ok: false, code: "E2030", message: "不是有效文件" };
  }

  const maxBytes = MAX_BYTES[assetType];
  if (stat.size > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return {
      ok: false,
      code: "E2032",
      message: `文件过大（${assetType} 上限约 ${mb}MB）`,
      assetType,
    };
  }

  if (stat.size === 0) {
    return { ok: false, code: "E2031", message: "文件为空" };
  }

  try {
    if (!validateMagic(filePath, assetType, ext)) {
      return {
        ok: false,
        code: "E2031",
        message: "文件头校验失败，可能不是有效的媒体文件",
        assetType,
      };
    }
  } catch {
    return { ok: false, code: "E2031", message: "无法校验文件内容" };
  }

  return { ok: true, assetType, size: stat.size };
}

function sumFileSizes(filePaths) {
  let total = 0;
  for (const p of filePaths) {
    try {
      if (fs.existsSync(p)) total += fs.statSync(p).size;
    } catch {
      // ignore
    }
  }
  return total;
}

function chunkPaths(filePaths, batchSize = IMPORT_BATCH_SIZE) {
  const chunks = [];
  for (let i = 0; i < filePaths.length; i += batchSize) {
    chunks.push(filePaths.slice(i, i + batchSize));
  }
  return chunks;
}

function planImportBatches(filePaths) {
  const useBatching = filePaths.length > LARGE_IMPORT_FILE_COUNT;
  const batches = useBatching
    ? chunkPaths(filePaths, IMPORT_BATCH_SIZE)
    : [filePaths];
  return { batches, useBatching, batchSize: useBatching ? IMPORT_BATCH_SIZE : filePaths.length };
}

module.exports = {
  EXTENSION_MAP,
  MAX_BYTES,
  LARGE_IMPORT_TOTAL_BYTES,
  LARGE_IMPORT_FILE_COUNT,
  IMPORT_BATCH_SIZE,
  detectAssetTypeFromPath,
  validateAssetFile,
  sumFileSizes,
  planImportBatches,
  chunkPaths,
};
