import { create } from "zustand";
import { toast } from "sonner";
import { debounce } from "@/lib/debounce";
import { getEasyMotion } from "@/types/easyMotion";
import {
  createMessage,
  DEFAULT_SUBPROJECT_PATH,
  type AgentStatus,
  type AgentTask,
  type AttachedImage,
  type Conversation,
  type Message,
} from "@/types/conversation";

interface ConversationState {
  conversation: Conversation | null;
  messages: Message[];
  subprojectPath: string;
  agentStatus: AgentStatus;
  currentTask: AgentTask | null;
  taskHistory: AgentTask[];
  streamingMessageId: string | null;
  inputText: string;
  attachedImages: AttachedImage[];
  isInputDisabled: boolean;
  isStreaming: boolean;
  isLoading: boolean;
  loadError: string | null;

  loadConversation: (subprojectPath?: string) => Promise<void>;
  saveConversation: () => Promise<boolean>;
  clearConversation: () => Promise<boolean>;
  setInputText: (text: string) => void;
  setInputDisabled: (disabled: boolean) => void;
  attachImage: (image: AttachedImage) => void;
  removeImage: (imageId: string) => void;
  reorderImages: (imageIds: string[]) => void;
  sendMessage: (text?: string) => Promise<void>;
  appendStreamingChunk: (chunk: string) => void;
  finalizeStreamingMessage: () => void;
  handleStreamDone: () => void;
  resetForProjectClose: () => void;
}

const debouncedSave = debounce(() => {
  void useConversationStore.getState().saveConversation();
}, 500);

let activeStreamRequestId: string | null = null;

function toConversationPayload(state: ConversationState): Conversation {
  return {
    version: "1.0",
    messages: state.messages,
    ...(state.conversation?.lastAgentTaskId
      ? { lastAgentTaskId: state.conversation.lastAgentTaskId }
      : {}),
  };
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversation: null,
  messages: [],
  subprojectPath: DEFAULT_SUBPROJECT_PATH,
  agentStatus: "idle",
  currentTask: null,
  taskHistory: [],
  streamingMessageId: null,
  inputText: "",
  attachedImages: [],
  isInputDisabled: false,
  isStreaming: false,
  isLoading: false,
  loadError: null,

  loadConversation: async (subprojectPath = DEFAULT_SUBPROJECT_PATH) => {
    const api = getEasyMotion()?.conversation;
    if (!api) {
      set({ loadError: "对话 API 不可用" });
      return;
    }

    set({ isLoading: true, loadError: null });
    const result = await api.load({ subprojectPath });
    set({ isLoading: false });

    if (!result.success || !result.data?.conversation) {
      const message = result.error?.message ?? "加载对话失败";
      set({ loadError: message, messages: [], conversation: null });
      if (message.includes("E2701")) {
        toast.error("对话历史损坏", { description: message });
      }
      return;
    }

    const { conversation } = result.data;
    set({
      conversation,
      messages: conversation.messages ?? [],
      subprojectPath: result.data.subprojectPath ?? subprojectPath,
      loadError: null,
      streamingMessageId: null,
      isStreaming: false,
      agentStatus: "idle",
      inputText: "",
      attachedImages: [],
    });
  },

  saveConversation: async () => {
    const api = getEasyMotion()?.conversation;
    if (!api) return false;

    const { subprojectPath } = get();
    const result = await api.save({
      subprojectPath,
      conversation: toConversationPayload(get()),
    });

    if (!result.success) {
      toast.error("保存对话失败", {
        description: result.error?.message,
      });
      return false;
    }

    if (result.data?.conversation) {
      set({ conversation: result.data.conversation });
    }
    return true;
  },

  clearConversation: async () => {
    const api = getEasyMotion()?.conversation;
    if (!api) return false;

    const { subprojectPath } = get();
    const result = await api.clear({ subprojectPath });
    if (!result.success) {
      toast.error("清空对话失败", {
        description: result.error?.message,
      });
      return false;
    }

    set({
      conversation: result.data?.conversation ?? { version: "1.0", messages: [] },
      messages: [],
      streamingMessageId: null,
      isStreaming: false,
      agentStatus: "idle",
    });
    return true;
  },

  setInputText: (inputText) => set({ inputText }),
  setInputDisabled: (isInputDisabled) => set({ isInputDisabled }),

  attachImage: (image) =>
    set((state) => ({
      attachedImages: [...state.attachedImages, image],
    })),

  removeImage: (imageId) =>
    set((state) => ({
      attachedImages: state.attachedImages.filter((item) => item.id !== imageId),
    })),

  reorderImages: (imageIds) =>
    set((state) => {
      const map = new Map(state.attachedImages.map((item) => [item.id, item]));
      return {
        attachedImages: imageIds
          .map((id) => map.get(id))
          .filter((item): item is AttachedImage => Boolean(item)),
      };
    }),

  sendMessage: async (text) => {
    const content = (text ?? get().inputText).trim();
    if (!content || get().isStreaming || get().isInputDisabled) return;

    const llm = getEasyMotion()?.llm;
    if (!llm) {
      toast.error("AI 服务不可用");
      return;
    }

    const userMessage = createMessage("user", content);
    const assistantMessage = createMessage("assistant", "");
    const history = [...get().messages, userMessage]
      .filter((message) => message.role === "user" || message.role === "assistant")
      .map(({ role, content: body }) => ({
        role: role as "user" | "assistant",
        content: body,
      }));

    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
      inputText: "",
      isStreaming: true,
      isInputDisabled: true,
      agentStatus: "generating",
      streamingMessageId: assistantMessage.id,
    }));

    const requestId = crypto.randomUUID();
    setActiveConversationStreamRequestId(requestId);

    const result = await llm.stream({ requestId, messages: history });
    if (!result.success) {
      setActiveConversationStreamRequestId(null);
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== assistantMessage.id),
        isStreaming: false,
        isInputDisabled: false,
        agentStatus: "error",
        streamingMessageId: null,
      }));
      toast.error("发送失败", {
        description: result.error?.message ?? "未知错误",
      });
    }
  },

  appendStreamingChunk: (chunk) => {
    const { streamingMessageId } = get();
    if (!streamingMessageId || !chunk) return;

    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === streamingMessageId
          ? { ...message, content: message.content + chunk }
          : message
      ),
    }));
  },

  finalizeStreamingMessage: () => {
    set({
      isStreaming: false,
      isInputDisabled: false,
      agentStatus: "idle",
      streamingMessageId: null,
    });
    debouncedSave();
  },

  handleStreamDone: () => {
    setActiveConversationStreamRequestId(null);
    get().finalizeStreamingMessage();
  },

  resetForProjectClose: () => {
    debouncedSave.cancel();
    setActiveConversationStreamRequestId(null);
    set({
      conversation: null,
      messages: [],
      subprojectPath: DEFAULT_SUBPROJECT_PATH,
      agentStatus: "idle",
      currentTask: null,
      taskHistory: [],
      streamingMessageId: null,
      inputText: "",
      attachedImages: [],
      isInputDisabled: false,
      isStreaming: false,
      isLoading: false,
      loadError: null,
    });
  },
}));

export function getActiveConversationStreamRequestId() {
  return activeStreamRequestId;
}

export function setActiveConversationStreamRequestId(requestId: string | null) {
  activeStreamRequestId = requestId;
}
