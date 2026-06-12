import { useMemo } from "react";
import { Diamond, Trash2 } from "lucide-react";
import { getClipPropertyValue } from "@/lib/timeline/clipPropertySchema";
import {
  getClipLocalFrame,
  getKeyframesForProperty,
  resolvePropertyAtClipFrame,
} from "@/lib/timeline/keyframes";
import { cn } from "@/lib/utils";
import { useTimelineStore } from "@/stores/timelineStore";
import type { Clip, Keyframe } from "@/types/timeline";

const KEYFRAME_PROPERTIES = [
  { path: "transform.opacity", label: "透明度" },
] as const;

function formatKeyframeValue(property: string, value: unknown): string {
  if (property === "transform.opacity" && typeof value === "number") {
    return value.toFixed(2);
  }
  return String(value ?? "");
}

export function KeyframeSection({
  clip,
  disabled,
}: {
  clip: Clip;
  disabled?: boolean;
}) {
  const currentFrame = useTimelineStore((s) => s.currentFrame);
  const upsertClipKeyframe = useTimelineStore((s) => s.upsertClipKeyframe);
  const removeClipKeyframe = useTimelineStore((s) => s.removeClipKeyframe);

  const localFrame = getClipLocalFrame(currentFrame, clip.startInFrames);
  const inClip =
    localFrame >= 0 && localFrame < clip.durationInFrames;

  const sections = useMemo(
    () =>
      KEYFRAME_PROPERTIES.map((item) => {
        const keyframes = getKeyframesForProperty(clip.keyframes, item.path);
        const staticValue = getClipPropertyValue(clip, item.path);
        const resolved = resolvePropertyAtClipFrame(clip, item.path, localFrame);
        const atPlayhead = keyframes.find((kf) => kf.frame === localFrame);
        return {
          ...item,
          keyframes,
          staticValue,
          resolved,
          atPlayhead,
        };
      }),
    [clip, localFrame],
  );

  return (
    <div className="space-y-3 border-t border-em-border pt-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-em-text">关键帧</p>
        <span className="text-[11px] text-em-muted">
          {inClip ? `片段内 ${localFrame}f` : "播放头不在片段内"}
        </span>
      </div>

      {sections.map((section) => (
        <div key={section.path} className="space-y-2 rounded-md border border-em-border/70 p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-em-muted">{section.label}</span>
            <span className="font-mono text-[11px] text-em-text">
              {formatKeyframeValue(section.path, section.resolved)}
            </span>
          </div>

          <button
            type="button"
            disabled={disabled || !inClip}
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-em-border px-2 py-1.5 text-xs transition-colors",
              disabled || !inClip
                ? "cursor-not-allowed opacity-50"
                : "hover:border-em-teal hover:text-em-teal",
            )}
            onClick={() => {
              const value =
                section.atPlayhead?.value ??
                section.resolved ??
                section.staticValue ??
                (section.path === "transform.opacity" ? 1 : 0);
              upsertClipKeyframe(clip.id, section.path, localFrame, value);
            }}
          >
            <Diamond className="h-3.5 w-3.5" />
            {section.atPlayhead ? "更新当前帧关键帧" : "在此帧添加关键帧"}
          </button>

          {section.keyframes.length > 0 ? (
            <ul className="space-y-1">
              {section.keyframes.map((kf: Keyframe) => (
                <li
                  key={kf.id}
                  className="flex items-center justify-between gap-2 rounded bg-em-surface/60 px-2 py-1 text-[11px]"
                >
                  <span className="font-mono text-em-muted">
                    f{kf.frame} = {formatKeyframeValue(section.path, kf.value)}
                  </span>
                  <button
                    type="button"
                    disabled={disabled}
                    title="删除关键帧"
                    className="cursor-pointer rounded p-0.5 text-em-muted hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => removeClipKeyframe(clip.id, kf.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] text-em-muted">暂无关键帧</p>
          )}
        </div>
      ))}
    </div>
  );
}
