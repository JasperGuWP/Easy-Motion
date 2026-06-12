import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { interpolateKeyframesAtFrame, type KeyframeLike } from "../../lib/keyframe";

type Transform = {
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  opacity: number;
};

type TextLayerProps = {
  clipId: string;
  source: { kind: "inline"; content: string };
  transform: Transform;
  style: {
    fontFamily: string;
    fontSize: number;
    color: string;
    textAlign?: "left" | "center" | "right";
  };
  keyframes?: KeyframeLike[];
  inAnimation?: { type: string; durationInFrames: number };
};

export const TextLayer: React.FC<TextLayerProps> = ({
  source,
  transform,
  style,
  keyframes = [],
  inAnimation,
}) => {
  const frame = useCurrentFrame();
  const fadeIn =
    inAnimation?.type === "fade"
      ? interpolate(frame, [0, inAnimation.durationInFrames], [0, 1], {
          extrapolateRight: "clamp",
        })
      : 1;

  const baseOpacity = transform.opacity ?? 1;
  const animatedOpacity = interpolateKeyframesAtFrame(
    keyframes,
    "transform.opacity",
    frame,
    baseOpacity,
  );
  const opacity = animatedOpacity * fadeIn;

  return (
    <div
      style={{
        position: "absolute",
        left: transform.position.x,
        top: transform.position.y,
        transform: `translate(-50%, -50%) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
        opacity,
        color: style.color,
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        textAlign: style.textAlign ?? "center",
        whiteSpace: "pre-wrap",
      }}
    >
      {source.content}
    </div>
  );
};
