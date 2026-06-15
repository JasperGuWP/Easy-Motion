import type { ChatMessage, ChatSettings } from "./chat";
import type { Timeline } from "./timeline";

export interface IpcError {
  message?: string;
}

export interface IpcResult<T> {
  success: boolean;
  data?: T;
  error?: IpcError;
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
    prepareCreate: () => Promise<
      IpcResult<{ parentPath: string; suggestedName: string }>
    >;
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
      duplicatePolicy?: "overwrite" | "rename" | "skip";
    }) => Promise<
      IpcResult<{
        imported: import("./asset").ProjectAsset[];
        errors: { path?: string; message: string }[];
        skipped?: { path?: string; originalName?: string; reason?: string }[];
        assets: import("./asset").ProjectAsset[];
      }>
    >;
    checkConflicts: (payload: { filePaths: string[] }) => Promise<
      IpcResult<{
        conflicts: {
          path: string;
          originalName: string;
          existingAssetId: string;
        }[];
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
    delete: (payload: {
      assetId: string;
      mode?: "soft" | "removeClips";
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        deleted: boolean;
        blocked?: boolean;
        refs?: { trackId: string; clipId: string; clipName: string }[];
        removedClips?: number;
        timelineUpdated?: boolean;
        assets: import("./asset").ProjectAsset[];
      }>
    >;
    resolveFileUrl: (payload: {
      assetId: string;
    }) => Promise<IpcResult<{ url: string }>>;
    onImportProgress: (
      callback: (data: {
        phase: "importing" | "done";
        done: number;
        total: number;
        current?: string;
      }) => void,
    ) => void;
  };
  preset: {
    list: () => Promise<
      IpcResult<
        {
          id: string;
          name: string;
          category: string;
          categoryLabel: string;
          description: string;
          source: string;
        }[]
      >
    >;
    apply: (payload: {
      presetId: string;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        timeline: Timeline;
        presetId: string;
        presetName: string;
        generate?: { previewReload?: boolean };
      }>
    >;
    save: (payload: {
      name: string;
      description?: string;
      category?: string;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        id: string;
        name: string;
        category: string;
      }>
    >;
  };
  chat: {
    loadHistory: (payload?: { subprojectPath?: string }) => Promise<
      IpcResult<{ messages: ChatMessage[]; settings: ChatSettings }>
    >;
    saveHistory: (payload: {
      messages: ChatMessage[];
      subprojectPath?: string;
    }) => Promise<IpcResult<{ messages: ChatMessage[] }>>;
    send: (payload: {
      content: string;
      subprojectPath?: string;
    }) => Promise<
      IpcResult<{
        messages: ChatMessage[];
        assistantMessage: ChatMessage;
        timelineUpdated?: boolean;
      }>
    >;
    getSettings: () => Promise<IpcResult<ChatSettings>>;
    saveSettings: (payload: {
      llm?: {
        provider?: string;
        model?: string;
        baseUrl?: string;
        apiKey?: string;
      };
    }) => Promise<IpcResult<ChatSettings>>;
    onChunk: (callback: (chunk: import("./chat").ChatChunk) => void) => void;
    onTimelineUpdated: (callback: (data: { source?: string }) => void) => void;
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
