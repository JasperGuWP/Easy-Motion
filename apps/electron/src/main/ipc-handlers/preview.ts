/**
 * IPC Preview Handlers
 * Registers all main:preview:* channels
 */

import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '@easymotion/shared';
import { wrapHandler } from './types';
import type { PreviewService } from '../preview-service';
import type { TimelineGenerator } from '../generator';
import type { Timeline } from '@easymotion/shared';

interface PreviewHandlerDeps {
  previewService: PreviewService;
  generator: TimelineGenerator;
}

export function registerPreviewHandlers(deps: PreviewHandlerDeps): void {
  // Start preview server
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.START_SERVER,
    wrapHandler(async (_event, payload: { subprojectId: string; projectPath: string }) => {
      const result = await deps.previewService.startServer(payload.subprojectId, payload.projectPath);
      return result;
    })
  );

  // Stop preview server
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.STOP_SERVER,
    wrapHandler(async () => {
      await deps.previewService.stopServer();
      return { stopped: true };
    })
  );

  // Get preview server status
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.GET_STATUS,
    wrapHandler(async () => {
      return deps.previewService.getStatus();
    })
  );

  // Play (fallback IPC — primary control is via postMessage)
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.PLAY,
    wrapHandler(async () => {
      return { success: true };
    })
  );

  // Pause
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.PAUSE,
    wrapHandler(async () => {
      return { success: true };
    })
  );

  // Seek
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.SEEK,
    wrapHandler(async (_event, payload: { frame: number }) => {
      return { success: true, frame: payload.frame };
    })
  );

  // Generate and update preview files on disk
  ipcMain.handle(
    IPC_CHANNELS.PREVIEW.GENERATE_AND_UPDATE,
    wrapHandler(async (_event, payload: { timeline: Timeline; subprojectId: string; projectPath: string }) => {
      const result = await deps.generator.generateFromTimeline(payload.timeline, payload.subprojectId);

      const status = deps.previewService.getStatus();
      if (status.status === 'running' && status.subprojectId === payload.subprojectId) {
        await deps.previewService.writeGeneratedFiles(result.rootTsx, result.mainSequenceTsx);
      }

      return { success: true, data: result };
    })
  );
}
