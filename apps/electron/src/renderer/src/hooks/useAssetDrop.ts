import { useCallback } from "react";
import { hasOsFiles } from "@/lib/asset/osFileDrop";
import { TRACK_ROW_HEIGHT } from "@/lib/timeline/constants";
import { frameFromPointer } from "@/lib/timeline/pointerFrame";
import { isAssetDrag, readAssetDragData } from "@/lib/timeline/assetDrag";
import type { Track } from "@/types/timeline";
import { useOsFileAssetDrop } from "@/hooks/useOsFileAssetDrop";
import { useTimelineStore } from "@/stores/timelineStore";

export function useAssetDrop(
  bodyScrollRef: React.RefObject<HTMLElement | null>,
  sortedTracks: Track[],
  pxPerFrame: number,
) {
  const placeAssetAtFrame = useTimelineStore((s) => s.placeAssetAtFrame);
  const clearError = useTimelineStore((s) => s.clearError);

  const trackIdFromPointer = useCallback(
    (clientY: number, container: HTMLElement) => {
      const rect = container.getBoundingClientRect();
      const y = clientY - rect.top + container.scrollTop;
      const row = Math.floor(y / TRACK_ROW_HEIGHT);
      if (row < 0 || row >= sortedTracks.length) return null;
      return sortedTracks[row]?.id ?? null;
    },
    [sortedTracks],
  );

  const osDrop = useOsFileAssetDrop({
    resolveFrame: (e) => {
      const container = bodyScrollRef.current;
      if (!container) return null;
      return frameFromPointer(e.clientX, container, pxPerFrame, 0);
    },
    resolveTrackId: (e) => {
      const container = bodyScrollRef.current;
      if (!container) return null;
      return trackIdFromPointer(e.clientY, container);
    },
  });

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      if (isAssetDrag(e.dataTransfer)) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        return;
      }
      osDrop.onDragOver(e);
    },
    [osDrop],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      if (hasOsFiles(e.dataTransfer)) {
        void osDrop.onDrop(e);
        return;
      }

      const payload = readAssetDragData(e.dataTransfer);
      if (!payload) return;
      e.preventDefault();

      const container = bodyScrollRef.current;
      if (!container) return;

      clearError();
      const frame = frameFromPointer(e.clientX, container, pxPerFrame, 0);
      const trackId = trackIdFromPointer(e.clientY, container);
      void placeAssetAtFrame(payload.assetId, frame, trackId);
    },
    [
      bodyScrollRef,
      clearError,
      osDrop,
      placeAssetAtFrame,
      pxPerFrame,
      trackIdFromPointer,
    ],
  );

  return { onDragOver, onDrop };
}
