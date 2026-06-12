import { useEffect } from "react";
import { AssetDuplicateDialog } from "@/components/assets/AssetDuplicateDialog";
import { AssetDurationDialog } from "@/components/assets/AssetDurationDialog";
import { AppLayout } from "@/components/layout/AppLayout";
import { useTimelineShortcuts } from "@/hooks/useTimelineShortcuts";
import { subscribeAssetImportProgress, useAssetStore } from "@/stores/assetStore";
import { useChatStore } from "@/stores/chatStore";
import { usePresetStore } from "@/stores/presetStore";
import { useProjectStore } from "@/stores/projectStore";
import { useTimelineStore } from "@/stores/timelineStore";

export default function App() {
  useTimelineShortcuts();

  useEffect(() => {
    subscribeAssetImportProgress();
  }, []);

  useEffect(() => {
    void (async () => {
      await useProjectStore.getState().refreshCurrent();
      if (useProjectStore.getState().current) {
        await Promise.all([
          useTimelineStore.getState().loadTimeline(),
          useAssetStore.getState().loadAssets(),
          useChatStore.getState().loadHistory(),
          usePresetStore.getState().loadPresets(),
        ]);
      } else {
        useAssetStore.getState().clear();
        useChatStore.getState().clear();
      }
    })();
  }, []);

  return (
    <>
      <AppLayout />
      <AssetDurationDialog />
      <AssetDuplicateDialog />
    </>
  );
}
