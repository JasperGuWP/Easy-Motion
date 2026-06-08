import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useTimelineShortcuts } from "@/hooks/useTimelineShortcuts";
import { useAssetStore } from "@/stores/assetStore";
import { useChatStore } from "@/stores/chatStore";
import { useProjectStore } from "@/stores/projectStore";
import { useTimelineStore } from "@/stores/timelineStore";

export default function App() {
  useTimelineShortcuts();

  useEffect(() => {
    void (async () => {
      await useProjectStore.getState().refreshCurrent();
      if (useProjectStore.getState().current) {
        await Promise.all([
          useTimelineStore.getState().loadTimeline(),
          useAssetStore.getState().loadAssets(),
          useChatStore.getState().loadHistory(),
        ]);
      } else {
        useAssetStore.getState().clear();
        useChatStore.getState().clear();
      }
    })();
  }, []);

  return <AppLayout />;
}
