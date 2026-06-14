import React from "react";

type ShapeLayerProps = {
  clipId: string;
  source: {
    kind: "inline";
    shape: "rect" | "circle";
    width?: number;
    height?: number;
    radius?: number;
  };
  transform: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    opacity: number;
  };
  style?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    background?: string;
    backgroundImage?: string;
  };
};

export const ShapeLayer: React.FC<ShapeLayerProps> = ({ source, transform, style }) => {
  const width = source.width ?? 200;
  const height = source.height ?? 200;

  const fillPaint: React.CSSProperties = style?.background
    ? { background: style.background }
    : style?.backgroundImage
      ? { backgroundImage: style.backgroundImage }
      : { backgroundColor: style?.fillColor ?? "#e11d48" };

  const shapeStyle: React.CSSProperties =
    source.shape === "circle"
      ? {
          width: (source.radius ?? 100) * 2,
          height: (source.radius ?? 100) * 2,
          borderRadius: "50%",
          ...fillPaint,
        }
      : {
          width,
          height,
          border: style?.strokeColor
            ? `${style.strokeWidth ?? 1}px solid ${style.strokeColor}`
            : undefined,
          ...fillPaint,
        };

  return (
    <div
      style={{
        position: "absolute",
        left: transform.position.x,
        top: transform.position.y,
        transform: `translate(-50%, -50%) scale(${transform.scale}) rotate(${transform.rotation}deg)`,
        opacity: transform.opacity,
        ...shapeStyle
      }}
    />
  );
};
