import { create } from "zustand";
import type { ChatMessage, ChatSettings } from "@/types/chat";
import { getEasyMotion } from "@/types/easyMotion";
import { useTimelineStore } from "@/stores/timelineStore";

interface ChatState {
  messages: ChatMessage[];
  settings: ChatSettings | null;
  isLoading: boolean;
  isSending: boolean;
  streamingContent: string;
  error: string | null;
  isSavingSettings: boolean;
  settingsError: string | null;

  clear: () => void;
  clearError: () => void;
  clearSettingsError: () => void;
  loadHistory: () => Promise<void>;
  loadSettings: () => Promise<void>;
  sendMessage: (content: string) => Promise<boolean>;
  saveSettings: (patch: {
    llm?: {
      provider?: string;
      model?: string;
      baseUrl?: string;
      apiKey?: string;
    };
  }) => Promise<boolean>;
}

let chunkListenerReady = false;
let timelineListenerReady = false;

async function refreshTimelineAfterAgent() {
  await useTimelineStore.getState().loadTimeline();
  await useTimelineStore.getState().runGenerate({ manual: false });
}

function ensureTimelineListener() {
  if (timelineListenerReady) return;
  const api = getEasyMotion();
  if (!api?.chat?.onTimelineUpdated) return;
  api.chat.onTimelineUpdated(() => {
    void refreshTimelineAfterAgent();
  });
  timelineListenerReady = true;
}

function ensureChunkListener() {
  if (chunkListenerReady) return;
  const api = getEasyMotion();
  if (!api?.chat?.onChunk) return;
  ensureTimelineListener();

  api.chat.onChunk((chunk) => {
    if (chunk.type === "delta") {
      useChatStore.setState((state) => ({
        streamingContent: state.streamingContent + chunk.text,
      }));
    } else if (chunk.type === "start") {
      useChatStore.setState({ streamingContent: "", isSending: true });
    } else if (chunk.type === "done") {
      useChatStore.setState({ streamingContent: "" });
    }
  });

  chunkListenerReady = true;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  settings: null,
  isLoading: false,
  isSending: false,
  streamingContent: "",
  error: null,
  isSavingSettings: false,
  settingsError: null,

  clear: () =>
    set({
      messages: [],
      settings: null,
      isSending: false,
      streamingContent: "",
      error: null,
      isSavingSettings: false,
      settingsError: null,
    }),

  clearError: () => set({ error: null }),

  clearSettingsError: () => set({ settingsError: null }),

  loadSettings: async () => {
    const api = getEasyMotion();
    if (!api?.chat?.getSettings) {
      set({ settings: null });
      return;
    }

    const res = await api.chat.getSettings();
    if (!res.success) {
      set({ settingsError: res.error?.message ?? "加载设置失败" });
      return;
    }

    set({ settings: res.data ?? null, settingsError: null });
  },

  loadHistory: async () => {
    ensureChunkListener();
    const api = getEasyMotion();
    if (!api?.chat?.loadHistory) {
      set({ messages: [], settings: null });
      return;
    }

    set({ isLoading: true, error: null });
    const res = await api.chat.loadHistory();
    set({ isLoading: false });

    if (!res.success) {
      set({
        error: res.error?.message ?? "加载对话历史失败",
        messages: [],
      });
      await useChatStore.getState().loadSettings();
      return;
    }

    set({
      messages: res.data?.messages ?? [],
      settings: res.data?.settings ?? null,
      error: null,
    });
  },

  sendMessage: async (content) => {
    ensureChunkListener();
    const api = getEasyMotion();
    if (!api?.chat?.send) {
      set({ error: "对话 API 不可用" });
      return false;
    }

    const trimmed = content.trim();
    if (!trimmed) return false;

    set({ isSending: true, error: null, streamingContent: "" });
    const res = await api.chat.send({ content: trimmed });
    set({ isSending: false, streamingContent: "" });

    if (!res.success) {
      set({ error: res.error?.message ?? "发送失败" });
      return false;
    }

    set({
      messages: res.data?.messages ?? [],
      error: null,
    });

    if (res.data?.timelineUpdated) {
      await refreshTimelineAfterAgent();
    }
    return true;
  },

  saveSettings: async (patch) => {
    const api = getEasyMotion();
    if (!api?.chat?.saveSettings) {
      set({ settingsError: "设置 API 不可用" });
      return false;
    }

    set({ isSavingSettings: true, settingsError: null });
    const res = await api.chat.saveSettings(patch);
    set({ isSavingSettings: false });

    if (!res.success) {
      set({ settingsError: res.error?.message ?? "保存设置失败" });
      return false;
    }

    set({ settings: res.data ?? null, settingsError: null });
    return true;
  },
}));
