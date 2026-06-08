const {
  buildChatMessages,
  resolveChatCompletionsUrl,
  streamChatCompletion,
} = require("../src/main/services/llm-service");

function createMockSSE(chunks) {
  const encoder = new TextEncoder();
  const parts = chunks.map(
    (c) => `data: ${JSON.stringify({ choices: [{ delta: { content: c } }] })}\n\n`,
  );
  parts.push("data: [DONE]\n\n");

  let index = 0;
  return {
    getReader() {
      return {
        async read() {
          if (index >= parts.length) return { done: true, value: undefined };
          const value = encoder.encode(parts[index]);
          index += 1;
          return { done: false, value };
        },
      };
    },
  };
}

async function run() {
  const deepseek = resolveChatCompletionsUrl("https://api.deepseek.com");
  if (deepseek !== "https://api.deepseek.com/v1/chat/completions") {
    throw new Error(`deepseek url resolve failed: ${deepseek}`);
  }

  const built = buildChatMessages([
    { id: "1", role: "user", content: "你好", createdAt: 1 },
    { id: "2", role: "assistant", content: "你好！", createdAt: 2 },
  ]);

  if (built[0].role !== "system") {
    throw new Error("system prompt missing");
  }
  if (built.length !== 3 || built[2].content !== "你好！") {
    throw new Error("buildChatMessages order mismatch");
  }

  const deltas = [];
  const full = await streamChatCompletion({
    apiKey: "sk-test",
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "test" }],
    fetchImpl: async () => ({
      ok: true,
      body: createMockSSE(["Hello", " world"]),
    }),
    onDelta: (text) => deltas.push(text),
  });

  if (full !== "Hello world" || deltas.join("") !== "Hello world") {
    throw new Error("SSE stream parse failed");
  }

  let threw = false;
  try {
    await streamChatCompletion({
      apiKey: "",
      messages: [],
      onDelta: () => {},
      fetchImpl: async () => ({ ok: true, body: createMockSSE([]) }),
    });
  } catch (error) {
    threw = true;
    if (!error.message.includes("E4010")) throw error;
  }
  if (!threw) throw new Error("expected E4010 for missing api key");

  let httpError = false;
  try {
    await streamChatCompletion({
      apiKey: "sk-bad",
      messages: [{ role: "user", content: "x" }],
      onDelta: () => {},
      fetchImpl: async () => ({
        ok: false,
        status: 401,
        text: async () => JSON.stringify({ error: { message: "invalid key" } }),
      }),
    });
  } catch (error) {
    httpError = true;
    if (!error.message.includes("E4011")) throw error;
  }
  if (!httpError) throw new Error("expected E4011 for http error");

  console.log("[PASS] llm-service");
}

run().catch((err) => {
  console.error("[FAIL] llm-service", err);
  process.exit(1);
});
