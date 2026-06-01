import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  type PreviewCompositionMeta,
  type PreviewServerStatus,
  PREVIEW_ZOOM_DEFAULT,
  PREVIEW_ZOOM_MAX,
  PREVIEW_ZOOM_MIN,
  PREVIEW_ZOOM_STEP,
} from '@easymotion/shared';

interface PreviewState {
  previewUrl: string | null;
  devServerPort: number | null;
  serverStatus: PreviewServerStatus;
  isReady: boolean;
  isPlaying: boolean;
  currentFrame: number;
  durationInFrames: number;
  fps: number;
  compositionWidth: number;
  compositionHeight: number;
  zoom: number;
  error: string | null;
  isFullscreen: boolean;
}

interface PreviewActions {
  startServer(subprojectId: string, projectPath: string): Promise<void>;
  stopServer(): Promise<void>;
  setServerStatus(status: PreviewServerStatus): void;
  setReady(url: string, port: number): void;
  setError(error: string): void;
  clearError(): void;
  setPlaying(isPlaying: boolean): void;
  setCurrentFrame(frame: number): void;
  setCompositionMeta(meta: PreviewCompositionMeta): void;
  setZoom(zoom: number): void;
  zoomIn(): void;
  zoomOut(): void;
  resetZoom(): void;
  setFullscreen(isFullscreen: boolean): void;
  reset(): void;
}

const initialState: PreviewState = {
  previewUrl: null,
  devServerPort: null,
  serverStatus: 'stopped',
  isReady: false,
  isPlaying: false,
  currentFrame: 0,
  durationInFrames: 300,
  fps: 30,
  compositionWidth: 1920,
  compositionHeight: 1080,
  zoom: PREVIEW_ZOOM_DEFAULT,
  error: null,
  isFullscreen: false,
};

type PreviewStore = PreviewState & PreviewActions;

export const usePreviewStore = create<PreviewStore>()(
  devtools(
    immer((set) => ({
      ...initialState,

      startServer: async (subprojectId, projectPath) => {
        set((state) => {
          state.serverStatus = 'starting';
          state.error = null;
        });
        try {
          const response = await window.electronAPI.preview.startServer(subprojectId, projectPath);
          if (response.success && response.data) {
            set((state) => {
              state.previewUrl = response.data!.url;
              state.devServerPort = response.data!.port;
              state.serverStatus = 'running';
              state.isReady = true;
            });
          } else {
            set((state) => {
              state.serverStatus = 'error';
              state.error = response.error?.message || 'Failed to start preview server';
            });
          }
        } catch (err) {
          set((state) => {
            state.serverStatus = 'error';
            state.error = err instanceof Error ? err.message : 'Unknown error starting preview server';
          });
        }
      },

      stopServer: async () => {
        try {
          await window.electronAPI.preview.stopServer();
          set((state) => {
            state.previewUrl = null;
            state.devServerPort = null;
            state.serverStatus = 'stopped';
            state.isReady = false;
          });
        } catch (err) {
          set((state) => {
            state.error = err instanceof Error ? err.message : 'Unknown error stopping preview server';
          });
        }
      },

      setServerStatus: (status) => {
        set((state) => {
          state.serverStatus = status;
        });
      },

      setReady: (url, port) => {
        set((state) => {
          state.previewUrl = url;
          state.devServerPort = port;
          state.isReady = true;
        });
      },

      setError: (error) => {
        set((state) => {
          state.error = error;
        });
      },

      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      setPlaying: (isPlaying) => {
        set((state) => {
          state.isPlaying = isPlaying;
        });
      },

      setCurrentFrame: (frame) => {
        set((state) => {
          state.currentFrame = frame;
        });
      },

      setCompositionMeta: (meta) => {
        set((state) => {
          state.durationInFrames = meta.durationInFrames;
          state.fps = meta.fps;
          state.compositionWidth = meta.width;
          state.compositionHeight = meta.height;
        });
      },

      setZoom: (zoom) => {
        set((state) => {
          state.zoom = Math.max(PREVIEW_ZOOM_MIN, Math.min(PREVIEW_ZOOM_MAX, zoom));
        });
      },

      zoomIn: () => {
        set((state) => {
          state.zoom = Math.min(PREVIEW_ZOOM_MAX, state.zoom + PREVIEW_ZOOM_STEP);
        });
      },

      zoomOut: () => {
        set((state) => {
          state.zoom = Math.max(PREVIEW_ZOOM_MIN, state.zoom - PREVIEW_ZOOM_STEP);
        });
      },

      resetZoom: () => {
        set((state) => {
          state.zoom = PREVIEW_ZOOM_DEFAULT;
        });
      },

      setFullscreen: (isFullscreen) => {
        set((state) => {
          state.isFullscreen = isFullscreen;
        });
      },

      reset: () => {
        set((state) => {
          Object.assign(state, initialState);
        });
      },
    })),
    { name: 'PreviewStore' }
  )
);
