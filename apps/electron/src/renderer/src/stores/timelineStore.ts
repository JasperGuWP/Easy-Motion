import { create } from "zustand";
import { getEasyMotion } from "@/types/easyMotion";
import type { Timeline } from "@/types/timeline";
import { debounce } from "@/lib/debounce";
import { useUiStore } from "@/stores/uiStore";

interface TimelineState {
  timeline: Timeline | null;
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  error: string | null;
  currentFrame: number;
  selectedClipId: string | null;
  /** 递增后通知预览 iframe 刷新 */
  previewReloadNonce: number;

  loadTimeline: () => Promise<void>;
  applySampleTimeline: () => Promise<void>;
  saveTimeline: () => Promise<boolean>;
  runGenerate: () => Promise<boolean>;
  scheduleGenerate: () => void;
  setCurrentFrame: (frame: number) => void;
  selectClip: (clipId: string | null) => void;
  clearError: () => void;
}

const debouncedGenerate = debounce(() => {
  void useTimelineStore.getState().runGenerate();
}, 500);

export const useTimelineStore = create<TimelineState>((set, get) => ({
  timeline: null,
  isLoading: false,
  isSaving: false,
  isGenerating: false,
  error: null,
  currentFrame: 0,
  selectedClipId: null,
  previewReloadNonce: 0,

  clearError: () => set({ error: null }),

  setCurrentFrame: (frame) => {
    const { timeline } = get();
    const max = Math.max(0, (timeline?.durationInFrames ?? 1) - 1);
    set({ currentFrame: Math.min(max, Math.max(0, frame)) });
  },

  selectClip: (clipId) => {
    set({ selectedClipId: clipId });
    if (clipId) {
      useUiStore.getState().setRightTab("properties");
    }
  },

  saveTimeline: async () => {
    const { timeline } = get();
    const api = getEasyMotion();
    if (!timeline || !api?.timeline.save) {
      set({ error: "没有可保存的时间线或未打开项目" });
      return false;
    }

    set({ isSaving: true, error: null });
    const res = await api.timeline.save({ timeline });
    set({ isSaving: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "保存时间线失败" });
      return false;
    }

    if (res.data) {
      set({ timeline: res.data });
    }
    return true;
  },

  runGenerate: async () => {
    const api = getEasyMotion();
    if (!api?.timeline.generate) {
      set({ error: "生成 API 不可用" });
      return false;
    }

    const saved = await get().saveTimeline();
    if (!saved) return false;

    set({ isGenerating: true, error: null });
    const res = await api.timeline.generate();
    set({ isGenerating: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "生成 Remotion 代码失败" });
      return false;
    }

    if (res.data?.previewReload) {
      set((s) => ({ previewReloadNonce: s.previewReloadNonce + 1 }));
    }

    return true;
  },

  scheduleGenerate: () => {
    debouncedGenerate();
  },

  loadTimeline: async () => {
    const api = getEasyMotion();
    if (!api?.timeline.load) {
      set({ error: "时间线 API 不可用（请在 Electron 中运行）" });
      return;
    }

    set({ isLoading: true, error: null });
    const res = await api.timeline.load();
    set({ isLoading: false });

    if (!res.success || !res.data) {
      set({
        error: res.error?.message ?? "加载时间线失败（请先打开项目）",
      });
      return;
    }

    set({
      timeline: res.data,
      currentFrame: 0,
      selectedClipId: null,
    });
  },

  applySampleTimeline: async () => {
    const api = getEasyMotion();
    if (!api?.timeline.applySample) {
      set({ error: "时间线 API 不可用" });
      return;
    }

    set({ isLoading: true, error: null });
    const res = await api.timeline.applySample();
    set({ isLoading: false });

    if (!res.success || !res.data) {
      set({ error: res.error?.message ?? "写入示例时间线失败" });
      return;
    }

    set({
      timeline: res.data,
      currentFrame: 0,
      selectedClipId: null,
    });

    await get().runGenerate();
  },
}));
