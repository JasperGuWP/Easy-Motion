import { Code2, Magnet, Repeat, RefreshCw, Wand2 } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { useTimelineStore } from "@/stores/timelineStore";
import { formatFrameRange } from "@/lib/timecode";
import { TimelineTrackList } from "@/components/timeline/TimelineTrackList";
import { cn } from "@/lib/utils";

export function TimelinePanel() {
  const collapsed = useUiStore((s) => s.timelineCollapsed);
  const timeline = useTimelineStore((s) => s.timeline);
  const isLoading = useTimelineStore((s) => s.isLoading);
  const isGenerating = useTimelineStore((s) => s.isGenerating);
  const isSaving = useTimelineStore((s) => s.isSaving);
  const error = useTimelineStore((s) => s.error);
  const currentFrame = useTimelineStore((s) => s.currentFrame);
  const selectedClipId = useTimelineStore((s) => s.selectedClipId);
  const loadTimeline = useTimelineStore((s) => s.loadTimeline);
  const applySampleTimeline = useTimelineStore((s) => s.applySampleTimeline);
  const runGenerate = useTimelineStore((s) => s.runGenerate);
  const selectClip = useTimelineStore((s) => s.selectClip);
  const clearError = useTimelineStore((s) => s.clearError);
  const busy = isLoading || isGenerating || isSaving;

  if (collapsed) {
    return (
      <footer className="z-10 flex h-10 shrink-0 items-center border-t border-em-border bg-em-bg px-3 text-xs text-em-muted">
        时间线（已收起）
      </footer>
    );
  }

  const fps = timeline?.fps ?? 30;
  const duration = timeline?.durationInFrames ?? 0;

  return (
    <footer className="z-10 flex min-h-0 shrink-0 flex-col border-t border-em-border bg-em-bg">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-em-border px-2 py-1">
        <button
          type="button"
          title="吸附（开启）"
          className="cursor-pointer rounded-sm p-1.5 text-em-teal transition-colors duration-150 ease-out hover:bg-em-elevated"
        >
          <Magnet className="h-4 w-4" />
        </button>
        <button
          type="button"
          title="循环"
          className="cursor-pointer rounded-sm p-1.5 text-em-muted transition-colors duration-150 ease-out hover:bg-em-elevated hover:text-em-text"
        >
          <Repeat className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-em-border" />
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            clearError();
            void loadTimeline();
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 text-xs text-em-text transition-colors duration-150 ease-out hover:bg-em-elevated disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", busy && "animate-spin")} />
          加载时间线
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => {
            clearError();
            void applySampleTimeline();
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded-sm bg-em-accent px-2 py-1 text-xs text-white transition-colors duration-150 ease-out hover:bg-em-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Wand2 className="h-3.5 w-3.5" />
          写入示例
        </button>
        <button
          type="button"
          disabled={busy || !timeline}
          onClick={() => {
            clearError();
            void runGenerate();
          }}
          className="inline-flex cursor-pointer items-center gap-1 rounded-sm border border-em-border bg-em-elevated px-2 py-1 text-xs text-em-text transition-colors duration-150 ease-out hover:bg-em-surface disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Code2 className="h-3.5 w-3.5" />
          {isGenerating ? "生成中…" : "生成预览"}
        </button>
        <span className="ml-auto font-mono text-xs text-em-muted">
          {timeline ? formatFrameRange(currentFrame, duration, fps) : "未加载时间线"}
        </span>
      </div>

      {error && (
        <p className="shrink-0 px-3 py-1.5 text-xs text-em-error" role="alert">
          {error}
        </p>
      )}

      {timeline && timeline.tracks.length > 0 ? (
        <TimelineTrackList
          tracks={timeline.tracks}
          durationInFrames={duration}
          currentFrame={currentFrame}
          selectedClipId={selectedClipId}
          onSelectClip={selectClip}
        />
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-sm text-em-muted">
          <p className="text-em-text">开始你的动画创作</p>
          <p className="text-xs">
            先打开或创建项目，再点击「加载时间线」或「写入示例」
          </p>
        </div>
      )}
    </footer>
  );
}
