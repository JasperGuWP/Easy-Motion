import { useCallback, useEffect, useRef } from "react";
import { FileUp, Film, Image, Loader2, Music } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatAssetMeta } from "@/lib/asset/formatAssetMeta";
import { setAssetDragData } from "@/lib/timeline/assetDrag";
import { AssetHoverPreview } from "@/components/assets/AssetHoverPreview";
import { useAssetStore } from "@/stores/assetStore";
import { useTimelineStore } from "@/stores/timelineStore";
import { getEasyMotion } from "@/types/easyMotion";
import type { AssetMediaType, ProjectAsset } from "@/types/asset";

const TYPE_ICONS: Record<AssetMediaType, React.ReactNode> = {
  image: <Image className="h-4 w-4" />,
  video: <Film className="h-4 w-4" />,
  audio: <Music className="h-4 w-4" />,
};

const GROUP_ORDER: AssetMediaType[] = ["video", "image", "audio"];
const GROUP_LABELS: Record<AssetMediaType, string> = {
  video: "视频",
  image: "图片",
  audio: "音频",
};

export function AssetsPanel() {
  const assets = useAssetStore((s) => s.assets);
  const isLoading = useAssetStore((s) => s.isLoading);
  const isImporting = useAssetStore((s) => s.isImporting);
  const importProgress = useAssetStore((s) => s.importProgress);
  const error = useAssetStore((s) => s.error);
  const pickAndImport = useAssetStore((s) => s.pickAndImport);
  const importFilePaths = useAssetStore((s) => s.importFilePaths);
  const deleteAsset = useAssetStore((s) => s.deleteAsset);
  const clearError = useAssetStore((s) => s.clearError);
  const fps = useTimelineStore((s) => s.timeline?.fps ?? 30);
  const [query, setQuery] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      toast.error("素材导入失败", { description: error });
    }
  }, [error]);

  const importFromFileList = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      const paths: string[] = [];
      let totalBytes = 0;
      for (const file of list) {
        const withPath = file as File & { path?: string };
        if (withPath.path) paths.push(withPath.path);
        totalBytes += file.size ?? 0;
      }
      if (paths.length === 0) return;

      if (totalBytes > 1024 * 1024 * 1024) {
        const ok = window.confirm(
          `即将导入约 ${(totalBytes / (1024 * 1024 * 1024)).toFixed(1)} GB 素材，可能需要较长时间。继续？`,
        );
        if (!ok) return;
      }

      clearError();
      await importFilePaths(paths);
    },
    [clearError, importFilePaths],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files?.length) {
        void importFromFileList(e.dataTransfer.files);
      }
    },
    [importFromFileList],
  );

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? assets.filter((a) => a.name.toLowerCase().includes(q))
      : assets;

    return GROUP_ORDER.map((type) => ({
      type,
      label: GROUP_LABELS[type],
      items: filtered.filter((a) => a.type === type),
    })).filter((g) => g.items.length > 0);
  }, [assets, query]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div
        ref={dropRef}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={onDrop}
        className="rounded-md border border-dashed border-border bg-card/50 p-4 text-center"
      >
        <p className="text-xs text-muted-foreground">拖拽文件到此处导入</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isImporting}
          className="mt-2 gap-1.5 text-xs"
          onClick={() => {
            clearError();
            void pickAndImport();
          }}
        >
          {isImporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileUp className="h-3.5 w-3.5" />
          )}
          选择文件…
        </Button>
      </div>

      {assets.length > 0 && (
        <label className="relative block">
          <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-em-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索素材…"
            className="w-full rounded-sm border border-em-border bg-em-surface py-1.5 pl-7 pr-2 text-xs text-em-text outline-none transition-colors duration-150 focus:border-em-teal/50"
          />
        </label>
      )}

      {isImporting && importProgress && importProgress.total > 0 && (
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-em-surface">
            <div
              className="h-full bg-em-teal transition-all duration-150"
              style={{
                width: `${Math.min(100, (importProgress.done / importProgress.total) * 100)}%`,
              }}
            />
          </div>
          <p className="text-[10px] text-em-muted">
            导入中 {importProgress.done}/{importProgress.total}
            {importProgress.current ? ` · ${importProgress.current}` : ""}
          </p>
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-xs text-muted-foreground">加载素材…</p>
      ) : assets.length === 0 ? (
        <p className="text-xs text-muted-foreground">暂无素材。导入后可拖到时间线。</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </ul>
      )}
    </div>
  );
}

function AssetRow({
  asset,
  fps,
  onDelete,
}: {
  asset: ProjectAsset;
  fps: number;
  onDelete: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const meta = formatAssetMeta(asset, fps);

  const loadPreview = useCallback(async () => {
    const api = getEasyMotion();
    if (!api?.asset?.resolveFileUrl) return;
    const res = await api.asset.resolveFileUrl({ assetId: asset.id });
    if (res.success && res.data?.url) {
      setPreviewUrl(res.data.url);
      setShowPreview(true);
    }
  }, [asset.id]);

  const onMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      void loadPreview();
    }, 280);
  };

  const onMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setShowPreview(false);
  };

  return (
    <li
      draggable
      onDragStart={(e) => {
        setAssetDragData(e.dataTransfer, asset);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "flex cursor-grab items-center gap-2 rounded-md border border-border bg-card px-2 py-2 text-xs text-foreground",
        "transition-colors duration-150 ease-out hover:border-em-teal/40 hover:bg-accent active:cursor-grabbing",
      )}
      title="拖到时间线创建片段"
    >
      <span className="text-em-teal">{TYPE_ICONS[asset.type]}</span>
      <span className="min-w-0 flex-1 truncate">{asset.name}</span>
      <span className="shrink-0 font-mono text-[10px] uppercase text-muted-foreground">
        {asset.type}
      </span>
    </li>
  );
}
