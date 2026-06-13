export type MessageRole = "user" | "assistant" | "system";

export type AgentStatus =
  | "idle"
  | "parsing"
  | "generating"
  | "reviewing"
  | "error";

export interface ActionButton {
  id: string;
  label: string;
  action: string;
}

export interface CodeDiff {
  summary?: string;
  operations?: unknown[];
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  attachedImages?: string[];
  codeDiff?: CodeDiff;
  actionButtons?: ActionButton[];
}

export interface Conversation {
  version: string;
  messages: Message[];
  lastAgentTaskId?: string;
}

export interface AttachedImage {
  id: string;
  path: string;
  name?: string;
}

export interface AgentTask {
  id: string;
  type: "generate" | "modify" | "explain" | "crawl";
  status: "pending" | "running" | "completed" | "failed";
  startedAt: number;
  completedAt?: number;
  params: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: string;
}

export const DEFAULT_SUBPROJECT_PATH = "subprojects/default";

export function createMessage(
  role: MessageRole,
  content: string,
  partial?: Partial<Message>
): Message {
  return {
    id: partial?.id ?? `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: partial?.timestamp ?? Date.now(),
    ...partial,
  };
}
