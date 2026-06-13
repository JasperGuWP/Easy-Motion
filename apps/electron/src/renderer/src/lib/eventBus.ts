import mitt from "mitt";

export type EventBusEvents = {
  "conversation.diffReady": {
    subprojectPath: string;
    diff: unknown;
  };
  "project.subprojectChanged": {
    subprojectPath: string;
    subprojectId?: string;
  };
};

export const eventBus = mitt<EventBusEvents>();
