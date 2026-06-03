function escapeJsxString(value) {
  return JSON.stringify(value);
}

function renderJsxProps(props) {
  return Object.entries(props)
    .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
    .join("\n          ");
}

const LAYER_COMPONENT_MAP = {
  text: "TextLayer",
  image: "ImageLayer",
  shape: "ShapeLayer",
  video: "VideoLayer",
  audio: "AudioLayer",
  chart: "ChartLayer"
};

function getLayerComponent(trackType) {
  const component = LAYER_COMPONENT_MAP[trackType];
  if (!component) {
    throw new Error(`unsupported track type for generator: ${trackType}`);
  }
  return component;
}

function buildClipProps(track, clip) {
  const base = {
    clipId: clip.id,
    transform: clip.transform,
    keyframes: clip.keyframes ?? [],
    inAnimation: clip.animations?.in,
    outAnimation: clip.animations?.out
  };

  if (track.type === "text") {
    return {
      ...base,
      source: clip.source,
      style: clip.style
    };
  }

  if (track.type === "image" || track.type === "video") {
    const assetPath =
      clip.source?.kind === "asset" ? clip.source.path : clip.source?.path ?? "";
    return {
      ...base,
      src: assetPath,
      style: clip.style ?? {}
    };
  }

  if (track.type === "shape") {
    return {
      ...base,
      source: clip.source,
      style: clip.style ?? {}
    };
  }

  throw new Error(`clip type not supported: ${track.type}`);
}

module.exports = {
  escapeJsxString,
  renderJsxProps,
  getLayerComponent,
  buildClipProps
};
