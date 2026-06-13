const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { removeDirRecursive } = require("../src/main/services/file-service");
const conversationService = require("../src/main/services/conversation-service");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function withTempProject(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "em-conv-"));
  const subDir = path.join(root, "subprojects", "default");
  fs.mkdirSync(subDir, { recursive: true });

  fs.writeFileSync(
    path.join(root, "project.json"),
    JSON.stringify({
      version: "1.0",
      name: "test",
      subprojects: [{ id: "sub-default", path: "subprojects/default" }],
    }),
    "utf8"
  );

  fs.writeFileSync(
    path.join(subDir, "subproject.json"),
    JSON.stringify({ conversation: { messages: [] } }),
    "utf8"
  );

  try {
    await run(root);
  } finally {
    removeDirRecursive(root);
  }
}

async function main() {
  await withTempProject(async (root) => {
    const empty = conversationService.loadConversation(root);
    assert(empty.messages.length === 0, "empty conversation should have no messages");

    const saved = await conversationService.saveConversation(root, {
      version: "1.0",
      messages: [
        {
          id: "m1",
          role: "user",
          content: "hello",
          timestamp: 1,
        },
      ],
    });

    assert(saved.saved === true, "save should return saved=true");
    assert(
      fs.existsSync(path.join(root, "subprojects", "default", "conversation.json")),
      "conversation.json should exist"
    );

    const reloaded = conversationService.loadConversation(root);
    assert(reloaded.messages.length === 1, "reloaded conversation should have one message");
    assert(reloaded.messages[0].content === "hello", "message content should match");
  });

  console.log("conversation-service tests passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
