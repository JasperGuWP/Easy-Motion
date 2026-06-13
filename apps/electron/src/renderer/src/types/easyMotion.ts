import type { Timeline } from "./timeline";
import type { AppSettings, LlmProvider } from "./settings";
import type { Conversation } from "./conversation";

export interface IpcError {
  message?: string;
}

export interface IpcResult<T> {
  success: boolean;
  data?: T;
  error?: IpcError;
}

export interface LlmMessage {
  role: "user" | "assistant";
  content: string;
}

export interface LlmChunkPayload {
  requestId: string;
  chunk: string;
  isDone: boolean;
}

export interface EasyMotionApi {
  version: string;
  project: {
    create: (config: {
      name: string;
      parentPath?: string;
    }) => Promise<IpcResult<{ path: string }>>;
    open: (path: string) => Promise<IpcResult<unknown>>;
    save: () => Promise<IpcResult<unknown>>;
    listRecent: () => Promise<
      IpcResult<{ name: string; path: string; modifiedAt?: number }[]>
    >;
    delete: (path: string, options?: unknown) => Promise<IpcResult<unknown>>;
    getCurrent: () => Promise<
      IpcResult<{ path: string; data: { name: string } } | null>
    >;
    pickParentDirectory: () => Promise<IpcResult<{ path: string }>>;
    pickProjectDirectory: () => Promise<IpcResult<{ path: string }>>;
  };
  timeline: {
    load: (payload?: { subprojectPath?: string }) => Promise<IpcResult<Timeline>>;
    save: (payload: {
      timeline: Timeline;
      subprojectPath?: string;
    }) => Promise<IpcResult<Timeline>>;
    applySample: (payload?: {
      subprojectPath?: string;
    }) => Promise<IpcResult<Timeline>>;
    generate: (payload?: {
      subprojectPath?: string;
    }) => Promise<IpcResult<{ files: string[]; previewReload?: boolean }>>;
    checkRemotionDrift: (payload?: {
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        drifted: boolean;
        suggestSync: boolean;
        tracksEmpty: boolean;
        fingerprint?: string;
        storedFingerprint?: string | null;
        hasCustomRemotionCode?: boolean;
        customRemotionReason?: string | null;
      }>
    >;
    syncPreviewManifest: (payload: {
      timeline: Timeline;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        manifestWritten?: boolean;
        timeline?: Timeline;
        previewReload?: boolean;
        timelinePush?: boolean;
      }>
    >;
    syncFromRemotion: (payload?: {
      subprojectPath?: string;
      preserveTracks?: boolean;
    }) => Promise<
      IpcResult<{
        timeline: Timeline;
        stats: {
          trackCount: number;
          clipCount: number;
          fingerprint: string;
          syncSource: string;
          compositionResolved: boolean;
          compositionError?: string | null;
          manifestUsed?: boolean;
        };
      }>
    >;
  };
  preview: {
    start: (payload?: unknown) => Promise<
      IpcResult<{ url: string; remotionFingerprint?: string | null }>
    >;
    stop: () => Promise<IpcResult<unknown>>;
    getState: () => Promise<IpcResult<{ status: string; url?: string }>>;
    onLog: (callback: (data: { line?: string; phase?: string }) => void) => void;
  };
  asset: {
    list: () => Promise<IpcResult<import("./asset").ProjectAsset[]>>;
    importFiles: (payload: {
      filePaths: string[];
      subprojectPath?: string;
      fps?: number;
    }) => Promise<
      IpcResult<{
        imported: import("./asset").ProjectAsset[];
        errors: { path?: string; message: string }[];
        assets: import("./asset").ProjectAsset[];
      }>
    >;
    pickAndImport: (payload?: {
      subprojectPath?: string;
      fps?: number;
    }) => Promise<
      IpcResult<{
        imported: import("./asset").ProjectAsset[];
        errors: { path?: string; message: string }[];
        assets: import("./asset").ProjectAsset[];
      }>
    >;
  };
  llm: {
    stream: (payload: {
      requestId?: string;
      messages: LlmMessage[];
      provider?: LlmProvider;
      model?: string;
      baseUrl?: string;
      temperature?: number;
      maxTokens?: number;
    }) => Promise<IpcResult<{ requestId: string }>>;
    cancel: (payload: {
      requestId: string;
    }) => Promise<IpcResult<{ cancelled: boolean }>>;
    onChunk: (callback: (data: LlmChunkPayload) => void) => () => void;
  };
  settings: {
    get: (payload?: {
      keys?: string[];
    }) => Promise<IpcResult<AppSettings>>;
    update: (payload: {
      settings: Partial<AppSettings>;
    }) => Promise<IpcResult<{ updated: boolean; settings: AppSettings }>>;
    setLlmApiKey: (payload: {
      provider?: LlmProvider;
      apiKey: string;
    }) => Promise<IpcResult<{ stored: boolean }>>;
    validateLLMKey: (payload?: {
      provider?: LlmProvider;
      baseUrl?: string;
      model?: string;
      apiKey?: string;
    }) => Promise<IpcResult<{ valid: boolean; error?: string }>>;
  };
  conversation: {
    load: (payload?: {
      subprojectId?: string;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        conversation: Conversation;
        subprojectPath?: string;
        subprojectId?: string;
      }>
    >;
    save: (payload: {
      subprojectId?: string;
      subprojectPath?: string;
      conversation: Conversation;
    }) => Promise<
      IpcResult<{ saved: boolean; conversation: Conversation }>
    >;
    clear: (payload?: {
      subprojectId?: string;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{ saved: boolean; conversation: Conversation }>
    >;
  };
}

declare global {
  interface Window {
    easyMotion?: EasyMotionApi;
  }
}

export function getEasyMotion(): EasyMotionApi | undefined {
  return window.easyMotion;
}
