import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useProjectStore } from "@/stores/projectStore";
import { useTimelineStore } from "@/stores/timelineStore";

export default function App() {
  useEffect(() => {
    void (async () => {
      await useProjectStore.getState().refreshCurrent();
      if (useProjectStore.getState().current) {
        await useTimelineStore.getState().loadTimeline();
      }
    })();
  }, []);

  return <AppLayout />;
}
