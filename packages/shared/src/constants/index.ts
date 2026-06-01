import type { ProjectSettings } from '../types/project';

export const DEFAULT_FPS = 30 as const;
export const DEFAULT_WIDTH = 1920 as const;
export const DEFAULT_HEIGHT = 1080 as const;
export const DEFAULT_DURATION_IN_SECONDS = 10 as const;

export const DEFAULT_PROJECT_SETTINGS: ProjectSettings = {
  autoSave: true,
  autoSaveIntervalSeconds: 30,
  defaultOutputFormat: 'mp4',
  defaultOutputQuality: 'high',
};

export const MAX_TRACKS = 20 as const;
export const MAX_UNDO_STEPS = 50 as const;

export const PYTHON_DEFAULT_PORT = 8000;
export const PYTHON_HOST = '127.0.0.1';
export const PYTHON_STARTUP_TIMEOUT_MS = 30000;
export const PYTHON_HEALTH_CHECK_INTERVAL_MS = 5000;

export const IPC_CHANNELS = {
  PROJECT: {
    CREATE: 'main:project:create',
    OPEN: 'main:project:open',
    SAVE: 'main:project:save',
    CLOSE: 'main:project:close',
    LIST_RECENT: 'main:project:listRecent',
    DELETE: 'main:project:delete',
    RENAME: 'main:project:rename',
  },
  SUBPROJECT: {
    CREATE: 'main:subproject:create',
    DELETE: 'main:subproject:delete',
    RENAME: 'main:subproject:rename',
    DUPLICATE: 'main:subproject:duplicate',
    SWITCH: 'main:subproject:switch',
  },
  TIMELINE: {
    UPDATE: 'main:timeline:update',
    GENERATE: 'main:timeline:generate',
  },
  PREVIEW: {
    PLAY: 'main:preview:play',
    PAUSE: 'main:preview:pause',
    SEEK: 'main:preview:seek',
    START_SERVER: 'main:preview:startServer',
    STOP_SERVER: 'main:preview:stopServer',
    GET_STATUS: 'main:preview:getStatus',
    GENERATE_AND_UPDATE: 'main:preview:generateAndUpdate',
  },
} as const;

export const RENDERER_CHANNELS = {
  PREVIEW_STATUS_CHANGED: 'renderer:preview:statusChanged',
  PREVIEW_ERROR: 'renderer:preview:error',
} as const;

export const PREVIEW_ZOOM_MIN = 0.5;
export const PREVIEW_ZOOM_MAX = 2.0;
export const PREVIEW_ZOOM_STEP = 0.1;
export const PREVIEW_ZOOM_DEFAULT = 1.0;
export const TIMELINE_DEBOUNCE_MS = 500;

export const APP_CONFIG_DIR = '.easymotion';
export const DEFAULT_PROJECT_DIR = 'EasyMotion';
export const PROJECT_FILE_NAME = 'project.json';
export const SUBPROJECT_FILE_NAME = 'subproject.json';
export const RECENT_PROJECTS_FILE = 'recent-projects.json';
export const SETTINGS_FILE = 'settings.json';
export const LOGS_DIR = 'logs';
