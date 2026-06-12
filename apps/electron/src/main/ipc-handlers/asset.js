const { ipcMain, dialog, BrowserWindow } = require("electron");
const projectService = require("../services/project-service");
const assetService = require("../services/asset-service");
const timelineService = require("../services/timeline-service");

function wrap(handler) {
  return async (_event, payload) => {
    try {
      const data = await handler(payload);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error.message || "unknown error",
        },
      };
    }
  };
}

function requireProject() {
  const current = projectService.getCurrentProject();
  if (!current?.path) {
    throw new Error("E2001: no project open");
  }
  return current.path;
}

function createImportProgressSender(event) {
  return (progress) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.webContents.send("renderer:asset:import-progress", progress);
  };
}

function registerAssetHandlers() {
  ipcMain.handle(
    "main:asset:list",
    wrap(() => {
      const projectPath = requireProject();
      return assetService.listAssets(projectPath);
    }),
  );

  ipcMain.handle(
    "main:asset:checkConflicts",
    wrap((payload) => {
      const projectPath = requireProject();
      const filePaths = payload?.filePaths ?? [];
      const conflicts = assetService.detectImportConflicts(projectPath, filePaths);
      return { conflicts };
    }),
  );

  ipcMain.handle("main:asset:import", async (event, payload) => {
    try {
      const projectPath = requireProject();
      const filePaths = payload?.filePaths ?? [];
      if (!Array.isArray(filePaths) || filePaths.length === 0) {
        throw new Error("未选择文件");
      }

      let fps = payload?.fps ?? 30;
      try {
        const timeline = timelineService.loadTimeline(
          projectPath,
          payload?.subprojectPath,
        );
        fps = timeline.fps ?? fps;
      } catch {
        /* use default fps */
      }

      const data = await assetService.importAssetFiles(projectPath, filePaths, {
        subprojectPath: payload?.subprojectPath,
        fps,
        duplicatePolicy: payload?.duplicatePolicy ?? "rename",
        onProgress: createImportProgressSender(event),
      });
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message || "unknown error" },
      };
    }
  });

  ipcMain.handle(
    "main:asset:resolveFileUrl",
    wrap((payload) => {
      const projectPath = requireProject();
      const assetId = payload?.assetId;
      if (!assetId) {
        throw new Error("未指定素材");
      }
      const url = assetService.resolveAssetFileUrl(projectPath, assetId);
      if (!url) {
        throw new Error("素材文件不存在");
      }
      return { url };
    }),
  );

  ipcMain.handle(
    "main:asset:delete",
    wrap(async (payload) => {
      const projectPath = requireProject();
      const assetId = payload?.assetId;
      if (!assetId) {
        throw new Error("未指定素材");
      }

      const subprojectPath = payload?.subprojectPath ?? "subprojects/default";
      const mode = payload?.mode ?? "soft";

      let timeline = null;
      try {
        timeline = timelineService.loadTimeline(projectPath, subprojectPath);
      } catch {
        /* 无时间线时仅软删素材 */
      }

      const result = await assetService.deleteAsset(projectPath, assetId, {
        mode,
        timeline,
        subprojectPath,
      });

      if (result.deleted && result.timeline && result.removedClips > 0) {
        await timelineService.saveTimeline(
          projectPath,
          result.timeline,
          subprojectPath,
        );
        await timelineService.generateForSubproject(projectPath, subprojectPath);
      }

      return result;
    }),
  );

  ipcMain.handle("main:asset:pickAndImport", async (event, payload) => {
    try {
      const projectPath = requireProject();
      const result = await dialog.showOpenDialog({
        title: "导入素材",
        properties: ["openFile", "multiSelections"],
        filters: [
          {
            name: "媒体文件",
            extensions: [
              "png",
              "jpg",
              "jpeg",
              "webp",
              "gif",
              "svg",
              "mp4",
              "mov",
              "webm",
              "mp3",
              "wav",
              "aac",
              "m4a",
            ],
          },
        ],
      });

      if (result.canceled || result.filePaths.length === 0) {
        return { success: true, data: { imported: [], errors: [], assets: [] } };
      }

      let fps = payload?.fps ?? 30;
      try {
        const timeline = timelineService.loadTimeline(
          projectPath,
          payload?.subprojectPath,
        );
        fps = timeline.fps ?? fps;
      } catch {
        /* default */
      }

      const data = await assetService.importAssetFiles(
        projectPath,
        result.filePaths,
        {
          subprojectPath: payload?.subprojectPath,
          fps,
          duplicatePolicy: payload?.duplicatePolicy ?? "rename",
          onProgress: createImportProgressSender(event),
        },
      );
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message || "unknown error" },
      };
    }
  });
}

module.exports = { registerAssetHandlers };
