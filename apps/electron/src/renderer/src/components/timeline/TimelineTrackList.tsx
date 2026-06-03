import type { Clip, Track } from "@/types/timeline";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

/** 只读展示：固定 4px/帧，后续 M4 Phase 1 再抽成可缩放标尺 */
const PX_PER_FRAME = 4;

interface TimelineTrackListProps {
  tracks: Track[];
  durationInFrames: number;
  currentFrame: number;
  selectedClipId: string | null;
  onSelectClip: (clipId: string) => void;
}

export function TimelineTrackList({
  tracks,
  durationInFrames,
  currentFrame,
  selectedClipId,
  onSelectClip,
}: TimelineTrackListProps) {
  const contentWidth = durationInFrames * PX_PER_FRAME;
  const playheadLeft = currentFrame * PX_PER_FRAME;

  const sorted = [...tracks].sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-0 flex-1 overflow-auto">
      <div className="relative" style={{ width: contentWidth, minWidth: "100%" }}>
        <div
          className="pointer-events-none absolute bottom-0 top-0 z-30 w-0.5 bg-em-accent"
          style={{ left: playheadLeft }}
          aria-hidden
        />
        {sorted.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            selectedClipId={selectedClipId}
            onSelectClip={onSelectClip}
          />
        ))}
      </div>
    </div>
  );
}

function TrackRow({
  track,
  selectedClipId,
  onSelectClip,
}: {
  track: Track;
  selectedClipId: string | null;
  onSelectClip: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex h-9 border-b border-em-border",
        !track.visible && "opacity-40",
        track.locked && "bg-em-surface/30"
      )}
    >
      <div className="flex w-[140px] shrink-0 items-center gap-2 border-r border-em-border px-2 text-xs">
        <span className="truncate text-em-text" title={track.name}>
          {track.name}
        </span>
        {track.locked && (
          <Lock className="h-3 w-3 shrink-0 text-em-muted" aria-label="已锁定" />
        )}
      </div>
      <div className="relative min-w-0 flex-1">
        {track.clips.map((clip) => (
          <ClipBlock
            key={clip.id}
            clip={clip}
            selected={clip.id === selectedClipId}
            onSelect={() => onSelectClip(clip.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ClipBlock({
  clip,
  selected,
  onSelect,
}: {
  clip: Clip;
  selected: boolean;
  onSelect: () => void;
}) {
  const left = clip.startInFrames * PX_PER_FRAME;
  const width = Math.max(clip.durationInFrames * PX_PER_FRAME, 8);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "absolute top-1 h-7 cursor-pointer truncate rounded-sm border px-1.5 text-left text-[11px] transition-colors duration-100 ease-out",
        selected
          ? "border-em-accent bg-em-accent/25 text-em-text shadow-sm shadow-black/20"
          : "border-em-border bg-em-elevated text-em-muted hover:border-em-teal/50 hover:text-em-text"
      )}
      style={{ left, width }}
      title={`${clip.name} (${clip.startInFrames}–${clip.startInFrames + clip.durationInFrames})`}
    >
      {clip.name}
    </button>
  );
}
