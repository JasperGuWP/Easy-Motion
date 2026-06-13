import { Bot, Loader2, Settings, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { LLMSettingsDialog } from "@/components/ai/LLMSettingsDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  getActiveConversationStreamRequestId,
  useConversationStore,
} from "@/stores/conversationStore";
import { getEasyMotion } from "@/types/easyMotion";

export function AIAssistantPanel() {
  const messages = useConversationStore((state) => state.messages);
  const inputText = useConversationStore((state) => state.inputText);
  const isStreaming = useConversationStore((state) => state.isStreaming);
  const loadError = useConversationStore((state) => state.loadError);
  const setInputText = useConversationStore((state) => state.setInputText);
  const sendMessage = useConversationStore((state) => state.sendMessage);
  const appendStreamingChunk = useConversationStore(
    (state) => state.appendStreamingChunk
  );
  const handleStreamDone = useConversationStore((state) => state.handleStreamDone);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [llmConfigured, setLlmConfigured] = useState<boolean | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const promptedForKeyRef = useRef(false);

  const refreshLlmStatus = useCallback(async () => {
    const api = getEasyMotion()?.settings;
    if (!api) {
      setLlmConfigured(false);
      return;
    }

    const result = await api.get({ keys: ["llm"] });
    if (!result.success || !result.data?.llm) {
      setLlmConfigured(false);
      return;
    }

    const configured = Boolean(result.data.llm.apiKeyConfigured);
    setLlmConfigured(configured);

    if (!configured && !promptedForKeyRef.current) {
      promptedForKeyRef.current = true;
      toast.info("尚未配置 LLM API Key", {
        description: "点击右上角齿轮打开设置",
        action: {
          label: "去设置",
          onClick: () => setSettingsOpen(true),
        },
      });
    }
  }, []);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    void refreshLlmStatus();
  }, [refreshLlmStatus]);

  useEffect(() => {
    const api = getEasyMotion()?.llm;
    if (!api) return;

    const unsubscribe = api.onChunk(({ requestId, chunk, isDone }) => {
      if (requestId !== getActiveConversationStreamRequestId()) return;

      if (chunk) {
        appendStreamingChunk(chunk);
      }

      if (isDone) {
        handleStreamDone();
      }
    });

    return unsubscribe;
  }, [appendStreamingChunk, handleStreamDone]);

  const onSend = async () => {
    if (llmConfigured === false) {
      toast.error("请先配置 LLM API Key", {
        action: {
          label: "打开设置",
          onClick: () => setSettingsOpen(true),
        },
      });
      return;
    }
    await sendMessage();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void onSend();
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col text-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <span className="text-xs font-medium text-muted-foreground">AI 助手</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="LLM 设置"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-3 p-3">
          {loadError && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {loadError}
            </div>
          )}
          {llmConfigured === false && (
            <div className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              尚未配置 API Key。点击右上角齿轮，或继续使用开发环境 `.env` 后备。
            </div>
          )}
          {messages.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
              <Bot className="h-8 w-8 text-muted-foreground/70" aria-hidden />
              <p>向 AI 描述你的动画…</p>
              <p className="text-xs text-muted-foreground/80">
                例如：创建一个标题写着 Hello
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[92%] rounded-lg px-3 py-2 text-sm leading-relaxed",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : message.role === "system"
                      ? "mx-auto bg-muted/60 text-center text-xs text-muted-foreground"
                      : "mr-auto bg-muted text-foreground"
                )}
              >
                {message.content ||
                  (message.role === "assistant" && isStreaming ? (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      思考中…
                    </span>
                  ) : null)}
              </div>
            ))
          )}
          <div ref={scrollAnchorRef} />
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t border-border p-3">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="描述你的动画..."
            className="flex-1"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
          />
          <Button
            type="button"
            size="icon"
            className="shrink-0"
            aria-label="发送"
            disabled={isStreaming || !inputText.trim()}
            onClick={() => void onSend()}
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <LLMSettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSaved={() => void refreshLlmStatus()}
      />
    </div>
  );
}
