import { create } from "zustand";
import type { ProjectAsset } from "@/types/asset";
import { getEasyMotion } from "@/types/easyMotion";
import { useAssetDuplicateStore } from "@/stores/assetDuplicateStore";

export interface AssetDeleteResult {
  deleted: boolean;
  blocked?: boolean;
  refs?: { trackId: string; clipId: string; clipName: string }[];
  timelineUpdated?: boolean;
}

export interface AssetImportProgress {
  phase: "importing" | "done";
  done: number;
  total: number;
  current?: string;
}

interface AssetState {
  assets: ProjectAsset[];
  isLoading: boolean;
  isImporting: boolean;
  importProgress: AssetImportProgress | null;
  error: string | null;

  clear: () => void;
  clearError: () => void;
  getAssetById: (id: string) => ProjectAsset | undefined;
  loadAssets: () => Promise<void>;
  importFilePaths: (paths: string[], duplicatePolicy?: "overwrite" | "rename" | "skip") => Promise<ProjectAsset[]>;
  pickAndImport: () => Promise<boolean>;
  deleteAsset: (
    assetId: string,
    mode?: "soft" | "removeClips",
  ) => Promise<AssetDeleteResult | null>;
}

let importProgressSubscribed = false;

export function subscribeAssetImportProgress() {
  if (importProgressSubscribed) return;
  const api = getEasyMotion();
  if (!api?.asset?.onImportProgress) return;
  importProgressSubscribed = true;
  api.asset.onImportProgress((progress) => {
    useAssetStore.setState({ importProgress: progress });
  });
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [],
  isLoading: false,
  isImporting: false,
  importProgress: null,
  error: null,

  clear: () => set({ assets: [], error: null }),

  clearError: () => set({ error: null }),

  getAssetById: (id) => get().assets.find((a) => a.id === id),

  loadAssets: async () => {
    const api = getEasyMotion();
    if (!api?.asset?.list) {
      set({ assets: [] });
      return;
    }

    set({ isLoading: true, error: null });
    const res = await api.asset.list();
    set({ isLoading: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "加载素材失败", assets: [] });
      return;
    }

    set({ assets: res.data ?? [], error: null });
  },

  importFilePaths: async (paths, duplicatePolicy) => {
    const api = getEasyMotion();
    if (!api?.asset?.importFiles) {
      set({ error: "素材 API 不可用" });
      return [];
    }

    const filtered = paths.filter(Boolean);
    if (filtered.length === 0) return [];

    let policy = duplicatePolicy ?? "rename";
    if (!duplicatePolicy && api.asset.checkConflicts) {
      const conflictRes = await api.asset.checkConflicts({ filePaths: filtered });
      const conflicts = conflictRes.success ? conflictRes.data?.conflicts ?? [] : [];
      if (conflicts.length > 0) {
        const choice = await useAssetDuplicateStore.getState().requestPolicy({
          count: conflicts.length,
          names: conflicts.map((c) => c.originalName),
        });
        if (choice === "cancel") return [];
        policy = choice;
      }
    }

    set({
      isImporting: true,
      importProgress: { phase: "importing", done: 0, total: filtered.length },
      error: null,
    });
    const res = await api.asset.importFiles({
      filePaths: filtered,
      duplicatePolicy: policy,
    });
    set({ isImporting: false, importProgress: null });

    if (!res.success) {
      set({ error: res.error?.message ?? "导入失败" });
      return [];
    }

    const data = res.data;
    set({ assets: data?.assets ?? get().assets });

    if (data?.errors?.length) {
      const first = data.errors[0];
      set({
        error: data.imported?.length
          ? `部分文件导入失败：${first.message}`
          : first.message,
      });
    }

    return data?.imported ?? [];
  },

  deleteAsset: async (assetId, mode = "soft") => {
    const api = getEasyMotion();
    if (!api?.asset?.delete) {
      set({ error: "素材 API 不可用" });
      return null;
    }

    set({ error: null });
    const res = await api.asset.delete({ assetId, mode });
    if (!res.success) {
      set({ error: res.error?.message ?? "删除失败" });
      return null;
    }

    const data = res.data;
    if (data?.assets) {
      set({ assets: data.assets });
    }

    if (data?.timelineUpdated) {
      await useTimelineStore.getState().loadTimeline();
    }

    return data ?? null;
  },

  pickAndImport: async () => {
    const api = getEasyMotion();
    if (!api?.asset?.pickAndImport) {
      set({ error: "素材 API 不可用" });
      return false;
    }

    set({ isImporting: true, importProgress: null, error: null });
    const res = await api.asset.pickAndImport();
    set({ isImporting: false, importProgress: null });

    if (!res.success) {
      set({ error: res.error?.message ?? "导入失败" });
      return false;
    }

    const data = res.data;
    if (data?.assets) {
      set({ assets: data.assets });
    }

    if (data?.errors?.length && !data?.imported?.length) {
      set({ error: data.errors[0].message });
      return false;
    }

    return Boolean(data?.imported?.length);
  },
}));
