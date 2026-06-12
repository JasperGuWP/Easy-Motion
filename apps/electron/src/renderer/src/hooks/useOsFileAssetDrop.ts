import { useCallback } from "react";
import { hasOsFiles, readOsFilePaths } from "@/lib/asset/osFileDrop";
import { useAssetStore } from "@/stores/assetStore";
import { useTimelineStore } from "@/stores/timelineStore";

export interface OsFileDropHandlers {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

/**
 * 桌面文件拖入 → 导入素材 → 落到时间线当前落点
 */
export function useOsFileAssetDrop(options: {
  resolveFrame: (e: React.DragEvent) => number | null;
  resolveTrackId?: (e: React.DragEvent) => string | null;
}): OsFileDropHandlers {
  const importFilePaths = useAssetStore((s) => s.importFilePaths);
  const placeAssetAtFrame = useTimelineStore((s) => s.placeAssetAtFrame);
  const clearTimelineError = useTimelineStore((s) => s.clearError);
  const clearAssetError = useAssetStore((s) => s.clearError);

  const onDragOver = useCallback((e: React.DragEvent) => {
    if (!hasOsFiles(e.dataTransfer)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onDrop = useCallback(
    async (e: React.DragEvent) => {
      const paths = readOsFilePaths(e.dataTransfer);
      if (paths.length === 0) return;
      e.preventDefault();

      const frame = options.resolveFrame(e);
      if (frame === null) return;

      clearTimelineError();
      clearAssetError();

      const imported = await importFilePaths(paths);
      if (imported.length === 0) return;

      const trackId = options.resolveTrackId?.(e) ?? null;
      let offset = 0;
      for (const asset of imported) {
        await placeAssetAtFrame(asset.id, frame + offset, trackId);
        offset += Math.max(1, asset.durationInFrames ?? 30);
      }
    },
    [
      clearAssetError,
      clearTimelineError,
      importFilePaths,
      options,
      placeAssetAtFrame,
    ],
  );

  return { onDragOver, onDrop };
}
