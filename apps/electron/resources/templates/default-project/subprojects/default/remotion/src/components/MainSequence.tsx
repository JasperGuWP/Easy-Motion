import { AbsoluteFill } from "remotion";

export const MainSequence: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f23",
        color: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: 32
      }}
    >
      请生成时间线代码以预览动画
    </AbsoluteFill>
  );
};
