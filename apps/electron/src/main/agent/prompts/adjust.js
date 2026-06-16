const ADJUST_PROMPT_TEMPLATE = `用户希望对现有动画进行微调。

当前片段：{clipJSON}
用户指令："{userText}"

请输出精确的参数修改（通过 updateClip / setAnimation 工具执行）：
- 修改文字：updates["source.content"]
- 修改样式：updates["style.fontSize"] 等嵌套路径
- 修改背景：updates["style.background"]（渐变）或 updates["style.fillColor"] / updates["style.backgroundColor"]（纯色）；适用于 shape 与 NewsletterBackground 等背景组件片段
- 修改位置：updates["transform.position.x"] / updates["transform.position.y"]
- 修改时长：updates["durationInFrames"]
- 修改动画：setAnimation

调整策略：
- "大一点/小一点"：数值 ±20%（如 fontSize、scale）
- "快一点/慢一点"：durationInFrames 减半或加倍
- "移到左边/右边/上/下"：position 相对偏移 ±100px 或画面宽高的 10%
- "颜色改成 xxx"：映射到十六进制色值
- 若用户已选中片段，优先修改该片段，无需重复 queryElement
- 指令模糊时选择最合理的默认值
- 字号调整必须基于当前片段 style.fontSize 做 ±20%，不要套用默认 72`;

function buildAdjustPromptSection({ clipJson, userText = "" }) {
  const clipJSON =
    typeof clipJson === "string" ? clipJson : JSON.stringify(clipJson, null, 2);
  return ADJUST_PROMPT_TEMPLATE.replace("{clipJSON}", clipJSON).replace(
    "{userText}",
    userText
  );
}

module.exports = { ADJUST_PROMPT_TEMPLATE, buildAdjustPromptSection };
