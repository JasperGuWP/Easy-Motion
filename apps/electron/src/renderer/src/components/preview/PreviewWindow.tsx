import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  parsePreviewMessage,
  postPreview,
  PREVIEW_CHANNEL,
} from "@/lib/preview-messages";
import { formatTimecode } from "@/lib/timecode";
import { useTimelineStore } from "@/stores/timelineStore";
import { getEasyMotion } from "@/types/easyMotion";

function ControlButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="cursor-pointer rounded-sm p-1.5 text-em-text transition-colors duration-150 ease-out hover:bg-em-elevated"
    >
      {children}
    </button>
  );
}

export function PreviewWindow() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const timeline = useTimelineStore((s) => s.timeline);
  const currentFrame = useTimelineStore((s) => s.currentFrame);
  const setCurrentFrame = useTimelineStore((s) => s.setCurrentFrame);
  const previewReloadNonce = useTimelineStore((s) => s.previewReloadNonce);
  const isGenerating = useTimelineStore((s) => s.isGenerating);

  const fps = timeline?.fps ?? 30;
  const totalFrames = timeline?.durationInFrames ?? 90;
  const maxFrame = Math.max(0, totalFrames - 1);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const msg = parsePreviewMessage(event.data);
      if (!msg) return;
      if (msg.type === "FRAME_CHANGE") {
        setCurrentFrame(msg.frame);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [setCurrentFrame]);

  useEffect(() => {
    if (previewReloadNonce === 0) return;

    void (async () => {
      const api = getEasyMotion();
      if (!api?.preview.getState) return;
      const state = await api.preview.getState();
      if (state.success && state.data?.status === "running" && state.data.url) {
        const base = state.data.url.split("?")[0];
        setPreviewUrl(`${base}?t=${Date.now()}`);
      }
    })();
  }, [previewReloadNonce]);

  const postToPreview = useCallback(
    (type: "PLAY" | "PAUSE" | "SEEK", frame?: number) => {
      const win = iframeRef.current?.contentWindow;
      if (type === "PLAY") {
        postPreview(win, { channel: PREVIEW_CHANNEL, type: "PLAY" });
      } else if (type === "PAUSE") {
        postPreview(win, { channel: PREVIEW_CHANNEL, type: "PAUSE" });
      } else if (type === "SEEK" && frame !== undefined) {
        postPreview(win, { channel: PREVIEW_CHANNEL, type: "SEEK", frame });
      }
    },
    []
  );

  const seek = useCallback(
    (frame: number) => {
      const clamped = Math.min(maxFrame, Math.max(0, frame));
      setCurrentFrame(clamped);
      postToPreview("SEEK", clamped);
    },
    [maxFrame, postToPreview, setCurrentFrame]
  );

  const startPreview = useCallback(async () => {
    const api = getEasyMotion();
    if (!api?.preview.start) {
      setStatus("预览 API 不可用（请在 Electron 中运行）");
      return;
    }
    setStatus("正在启动预览…");
    const res = await api.preview.start({});
    if (!res.success) {
      setStatus(res.error?.message ?? "启动失败");
      return;
    }
    if (res.data?.url) {
      setPreviewUrl(res.data.url);
    }
    setStatus(null);
  }, []);

  return (
    <section className="flex min-h-0 flex-1 flex-col bg-em-bg">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-em-border px-2 py-1">
        <div className="flex items-center gap-0.5">
          <ControlButton label="跳到开头" onClick={() => seek(0)}>
            <ChevronFirst className="h-4 w-4" />
          </ControlButton>
          <ControlButton label="上一帧" onClick={() => seek(currentFrame - 1)}>
            <SkipBack className="h-4 w-4" />
          </ControlButton>
          <ControlButton
            label={playing ? "暂停" : "播放"}
            onClick={() => {
              const next = !playing;
              setPlaying(next);
              postToPreview(next ? "PLAY" : "PAUSE");
            }}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </ControlButton>
          <ControlButton label="下一帧" onClick={() => seek(currentFrame + 1)}>
            <SkipForward className="h-4 w-4" />
          </ControlButton>
          <ControlButton label="跳到结尾" onClick={() => seek(maxFrame)}>
            <ChevronLast className="h-4 w-4" />
          </ControlButton>
        </div>
        <div className="font-mono text-xs text-em-muted">
          <span className="text-em-text">
            {currentFrame}/{totalFrames} 帧
          </span>
          <span className="mx-2">·</span>
          <span>{formatTimecode(currentFrame, fps)}</span>
        </div>
        <select
          className="cursor-pointer rounded-sm border border-em-border bg-em-surface px-2 py-1 text-xs text-em-text"
          defaultValue="fit"
          aria-label="预览缩放"
        >
          <option value="fit">fit</option>
          <option value="0.25">25%</option>
          <option value="0.5">50%</option>
          <option value="1">100%</option>
          <option value="2">200%</option>
        </select>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black p-2">
        {!previewUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-sm text-em-muted">
            <p>预览区域（最大化占比）</p>
            <button
              type="button"
              onClick={startPreview}
              className="cursor-pointer rounded-sm bg-em-accent px-4 py-2 text-white transition-colors duration-150 ease-out hover:bg-em-accent-hover"
            >
              启动 Remotion 预览
            </button>
            {status && <p className="text-xs text-em-teal">{status}</p>}
            {isGenerating && (
              <p className="text-xs text-em-muted">正在生成 Remotion 代码…</p>
            )}
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={previewUrl ?? undefined}
          title="Remotion Preview"
          className={cn(
            "max-h-full max-w-full rounded-lg border border-em-border aspect-video w-full",
            !previewUrl && "hidden"
          )}
        />
      </div>
    </section>
  );
}
