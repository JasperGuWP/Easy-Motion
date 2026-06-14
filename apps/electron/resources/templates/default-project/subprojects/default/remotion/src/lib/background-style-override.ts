/** 时间线 clip.style 覆盖组件内置背景（AI / 属性面板修改背景色时使用） */

import type { CSSProperties } from "react";

export type BackgroundStyleLike = {
  background?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  fillColor?: string;
};

export function hasBackgroundStyleOverride(
  style?: BackgroundStyleLike | null,
): boolean {
  if (!style) return false;
  return Boolean(
    style.background ||
      style.backgroundImage ||
      style.backgroundColor ||
      style.fillColor,
  );
}

export function toBackgroundOverrideCss(
  style?: BackgroundStyleLike | null,
): CSSProperties {
  if (!style) return {};
  if (style.background) {
    return { background: style.background };
  }
  if (style.backgroundImage) {
    return { backgroundImage: style.backgroundImage };
  }
  const solid = style.backgroundColor ?? style.fillColor;
  if (solid) {
    return { backgroundColor: solid };
  }
  return {};
}
