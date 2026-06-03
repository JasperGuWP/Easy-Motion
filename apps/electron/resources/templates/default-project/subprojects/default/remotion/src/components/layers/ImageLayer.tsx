import React from "react";
import { Img } from "remotion";

type ImageLayerProps = {
  clipId: string;
  src: string;
  transform: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    opacity: number;
  };
  style?: {
    objectFit?: "cover" | "contain" | "fill";
  };
};

export const ImageLayer: React.FC<ImageLayerProps> = ({ src, transform, style }) => {
  if (!src) return null;

  return (
    <Img
      src={src}
      style={{
        position: "absolute",
        left: transform.position.x,
        top: transform.position.y,
        transform: `translate(-50%, -50%) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
        opacity: transform.opacity,
        objectFit: style?.objectFit ?? "cover"
      }}
    />
  );
};
