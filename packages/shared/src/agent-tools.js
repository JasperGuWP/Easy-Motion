/** OpenAI / DeepSeek 兼容的 Agent 工具定义（M5） */

const AGENT_TOOL_NAMES = [
  "createTrack",
  "createClip",
  "updateClip",
  "deleteClip",
  "queryElement",
  "importAsset",
];

const AGENT_TOOLS_OPENAI = [
  {
    type: "function",
    function: {
      name: "createTrack",
      description: "在时间线中创建一个新轨道（文字、图片、视频等图层）。",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "轨道名称" },
          type: {
            type: "string",
            enum: [
              "text",
              "image",
              "video",
              "audio",
              "shape",
              "chart",
              "animation",
              "group",
            ],
            description: "轨道类型",
          },
        },
        required: ["name", "type"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "createClip",
      description: "在指定轨道上创建片段。文字片段用 source.kind=inline 与 source.content。",
      parameters: {
        type: "object",
        properties: {
          trackId: { type: "string", description: "目标轨道 ID" },
          name: { type: "string", description: "片段名称" },
          startInFrames: { type: "number", description: "起始帧，默认 0" },
          durationInFrames: { type: "number", description: "持续帧数" },
          source: {
            type: "object",
            properties: {
              kind: { type: "string", enum: ["inline", "asset", "data"] },
              content: { type: "string", description: "内联文字内容" },
            },
          },
          style: {
            type: "object",
            properties: {
              fontSize: { type: "number" },
              color: { type: "string" },
              fontFamily: { type: "string" },
              textAlign: { type: "string" },
            },
          },
        },
        required: ["trackId", "name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "updateClip",
      description: '更新片段属性。updates 的 key 为点分路径，如 "style.fontSize"、"source.content"。',
      parameters: {
        type: "object",
        properties: {
          clipId: { type: "string", description: "片段 ID" },
          updates: {
            type: "object",
            additionalProperties: true,
            description: '例如 {"style.fontSize": 72, "source.content": "Hello"}',
          },
        },
        required: ["clipId", "updates"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "deleteClip",
      description: "删除指定轨道上的片段。",
      parameters: {
        type: "object",
        properties: {
          trackId: { type: "string" },
          clipId: { type: "string" },
        },
        required: ["trackId", "clipId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "importAsset",
      description:
        "从本地绝对路径导入素材（图片/视频/音频）到项目库。返回 assetId 与 publicPath，可配合 createClip(source.kind=asset) 使用。",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string", description: "单个文件的绝对路径" },
          filePaths: {
            type: "array",
            items: { type: "string" },
            description: "批量导入时的路径列表",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "queryElement",
      description: "按名称或文字内容查询时间线上的轨道/片段。",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "搜索关键词" },
          type: { type: "string", enum: ["clip", "track", "any"], description: "限定类型" },
        },
        required: ["query"],
      },
    },
  },
];

module.exports = {
  AGENT_TOOL_NAMES,
  AGENT_TOOLS_OPENAI,
};
