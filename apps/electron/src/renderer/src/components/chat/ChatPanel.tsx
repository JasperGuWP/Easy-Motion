import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Sparkles } from "lucide-react";
import { ChatSettingsPanel } from "@/components/chat/ChatSettingsPanel";
import { useChatStore } from "@/stores/chatStore";
import { useProjectStore } from "@/stores/projectStore";

function MessageBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[92%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-em-accent text-white"
            : "border border-em-border bg-em-surface text-em-text"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export function ChatPanel() {
  const { current } = useProjectStore();
  const {
    messages,
    settings,
    isLoading,
    isSending,
    streamingContent,
    error,
    clearError,
    sendMessage,
  } = useChatStore();
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streamingContent, isSending]);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || isSending) return;
    setDraft("");
    await sendMessage(text);
  };

  if (!current) {
    return <p className="text-em-muted">请先打开或创建项目后再使用 AI 助手。</p>;
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-em-muted">
          {settings?.llm.apiKeyConfigured
            ? `模型：${settings.llm.model}`
            : "未配置 API Key，回复为提示信息"}
        </span>
        <ChatSettingsPanel />
      </div>

      {error && (
        <div className="flex items-start justify-between gap-2 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          <span>{error}</span>
          <button
            type="button"
            className="shrink-0 text-red-300 hover:text-red-100"
            onClick={clearError}
          >
            关闭
          </button>
        </div>
      )}

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {isLoading && (
          <div className="flex items-center gap-2 text-em-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>加载对话历史…</span>
          </div>
        )}

        {!isLoading && messages.length === 0 && !isSending && (
          <div className="flex items-center gap-2 text-em-muted">
            <Bot className="h-4 w-4" />
            <span>向 AI 描述你的动画，例如「做一个 5 秒的产品介绍片头」</span>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
        ))}

        {isSending && streamingContent && (
          <MessageBubble role="assistant" content={streamingContent} />
        )}

        {isSending && !streamingContent && (
          <div className="flex items-center gap-2 text-em-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>思考中…</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSend();
            }
          }}
          disabled={isSending}
          placeholder="描述你的动画..."
          className="flex-1 rounded-md border border-em-border bg-em-surface px-3 py-2 text-em-text placeholder:text-em-muted focus:border-em-teal focus:outline-none focus:ring-1 focus:ring-em-teal disabled:opacity-60"
        />
        <button
          type="button"
          disabled={isSending || !draft.trim()}
          onClick={() => void handleSend()}
          className="cursor-pointer rounded-sm bg-em-accent px-3 py-2 text-white transition-colors duration-150 ease-out hover:bg-em-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="发送"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
