/** 最小合法魔数，供导入测试使用 */

function writeMinimalMp4(filePath) {
  const fs = require("node:fs");
  const buf = Buffer.alloc(32);
  buf.writeUInt32BE(32, 0);
  buf.write("ftyp", 4);
  buf.write("isom", 8);
  fs.writeFileSync(filePath, buf);
}

function writeMinimalPng(filePath) {
  const fs = require("node:fs");
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  fs.writeFileSync(filePath, sig);
}

module.exports = { writeMinimalMp4, writeMinimalPng };
