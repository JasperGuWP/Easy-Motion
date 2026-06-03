const path = require("node:path");
const os = require("node:os");

function getConfigDir() {
  const home = os.homedir();
  if (process.platform === "win32") {
    return path.join(home, ".easymotion");
  }
  return path.join(home, ".easymotion");
}

function getDefaultProjectsParentDir() {
  return path.join(os.homedir(), "Documents", "EasyMotion");
}

function getTemplatesDir() {
  return path.join(__dirname, "../../../resources/templates");
}

module.exports = {
  getConfigDir,
  getDefaultProjectsParentDir,
  getTemplatesDir
};
