---
title: "useVideoTexture()"
source: https://www.remotion.dev/docs/use-video-texture
---

# ~~useVideoTexture()~~

warning

Deprecated - we recommend using [`@remotion/media`](/docs/videos/as-threejs-texture) instead.

Allows you to use a video in React Three Fiber that is synchronized with Remotion's `useCurrentFrame()`.

To use a video in a Three.JS context, you first have to render it and assign it a ref. If you only want to use it in a React Three Fiber Scene, you can make it invisible by adding a `{position: "absolute", opacity: 0}` style.

```tsx
import {useRef} from 'react';
import {Html5Video} from 'remotion';
import src from './vid.mp4';

const MyVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return <Html5Video ref={videoRef} src={src} style={{position: 'absolute', opacity: 0}} />;
};Copy
```

To convert the video to a video texture, place the `useVideoTexture()` hook in the same component.

```tsx
import {useVideoTexture} from '@remotion/three';

// ...

const texture = useVideoTexture(videoRef);Copy
```

The return type of it is a `THREE.VideoTexture | null` which you can assign as a `map` to for example `meshBasicMaterial`. We recommend to only render the material when the texture is not `null` to prevent bugs.

```tsx
{
  videoTexture ? <meshBasicMaterial map={videoTexture} /> : null;
}Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/three/src/use-video-texture.ts)
- [Example usage: React Three Fiber template](/templates/three)
- [`<ThreeCanvas />`](/docs/three-canvas)
