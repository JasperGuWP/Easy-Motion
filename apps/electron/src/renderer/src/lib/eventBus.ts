import mitt from "mitt";
import type { Timeline } from "@/types/timeline";

export type EventBusEvents = {
  "conversation.diffReady": {
    subprojectPath: string;
    diff: unknown;
    timeline?: Timeline | null;
    previewReload?: boolean;
  };
  "project.subprojectChanged": {
    subprojectPath: string;
    subprojectId?: string;
  };
};

export const eventBus = mitt<EventBusEvents>();
