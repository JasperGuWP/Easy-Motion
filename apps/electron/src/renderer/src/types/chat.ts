export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatSettings {
  version: number;
  llm: {
    provider: string;
    model: string;
    baseUrl?: string;
    apiKeyConfigured: boolean;
    apiKeyHint?: string | null;
  };
}

export type ChatChunk =
  | { type: "start"; userMessageId: string }
  | { type: "delta"; text: string }
  | { type: "done"; message: ChatMessage };
