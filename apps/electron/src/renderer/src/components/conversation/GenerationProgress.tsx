import type { AgentStatus } from "@/types/conversation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: "",
  parsing: "正在理解需求…",
  analyzing: "正在分析参考图…",
  generating: "正在生成动画…",
  reviewing: "正在检查修改…",
  error: "执行出错",
};

interface GenerationProgressProps {
  status: AgentStatus;
  isStreaming: boolean;
  className?: string;
}

export function GenerationProgress({
  status,
  isStreaming,
  className,
}: GenerationProgressProps) {
  if (!isStreaming || status === "idle") return null;

  const label = STATUS_LABEL[status] || "处理中…";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground",
        className
      )}
    >
      <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
      <span>{label}</span>
      <div className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-primary/60" />
      </div>
    </div>
  );
}
