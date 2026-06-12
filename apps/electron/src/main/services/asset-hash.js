const crypto = require("node:crypto");
const fs = require("node:fs");

/** 流式计算文件 SHA-256 */
function hashFileSync(filePath) {
  const hash = crypto.createHash("sha256");
  const fd = fs.openSync(filePath, "r");
  const buffer = Buffer.alloc(1024 * 1024);
  try {
    let read = 0;
    while ((read = fs.readSync(fd, buffer, 0, buffer.length)) > 0) {
      hash.update(buffer.subarray(0, read));
    }
  } finally {
    fs.closeSync(fd);
  }
  return hash.digest("hex");
}

module.exports = { hashFileSync };
