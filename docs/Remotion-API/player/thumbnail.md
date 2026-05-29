---
title: "<Thumbnail>"
source: https://www.remotion.dev/docs/player/thumbnail
---

# <Thumbnail>

[v3.2.41](https://github.com/remotion-dev/remotion/releases/v3.2.41)

A component which can be rendered in a regular React App (for example: for example: [Next.JS](https://nextjs.org), [Vite.js](https://vitejs.dev), [Create React App](https://create-react-app.dev/)) to display a single frame of a video.

```tsx
MyApp.tsx

import {Thumbnail} from '@remotion/player';
import {MyVideo} from './remotion/MyVideo';

export const App: React.FC = () => {
  return (
    <Thumbnail
      component={MyVideo}
      compositionWidth={600}
      compositionHeight={600}
      frameToDisplay={30}
      durationInFrames={120}
      fps={30}
      inputProps={{
        title: 'Foo',
      }}
    />
  );
};Copy
```

## API[​](#api "Direct link to API")

### `component` or `lazyComponent`[​](#component-or-lazycomponent "Direct link to component-or-lazycomponent")

Pass a React component in directly **or** pass a function that returns a dynamic import. Passing neither or both of the props is an error.

If you use `lazyComponent`, wrap it in a `useCallback()` to avoid constant rendering. [See here for an example.](/docs/player/examples#loading-a-component-lazily)

note

Thumbnail does not use [`<Composition>`](/docs/composition)'s. Pass your component directly and do not wrap it in a `<Composition>` component.

### `frameToDisplay`[​](#frametodisplay "Direct link to frametodisplay")

Index of the frame rendered by the composition in the Thumbnail.

### `compositionWidth`[​](#compositionwidth "Direct link to compositionwidth")

The width you would like the video to have when rendered as an MP4. Use `style={{width: <width>}}` to define a width to be assumed in the browser.

note

**Example**:
If you want to render a Full HD video, set `compositionWidth` to `1920` and `compositionHeight` to `1080`. By default, the thumbnail will also assume these dimensions.
To make it smaller, pass a `style` prop to give the Thumbnail a different width: `{"style={{width: 400}}"}`. See [Player Scaling](/docs/player/scaling) to learn more.

### `compositionHeight`[​](#compositionheight "Direct link to compositionheight")

The height of the canvas in pixels.
The height you would like the video to have when rendered as an MP4. Use `style={{height: <height>}}` to define a height to be assumed in the browser.

### `durationInFrames`[​](#durationinframes "Direct link to durationinframes")

The duration of the video in frames. Must be an integer and greater than 0.

note

This prop is required for the Thumbnail component because your component may render differently based on what `useVideoConfig()` returns.

### `fps`[​](#fps "Direct link to fps")

The frame rate of the video. Must be a number.

note

This prop is required for the Thumbnail component because your component may render differently based on what `useVideoConfig()` returns.

### `errorFallback?`[​](#errorfallback "Direct link to errorfallback")

A callback for rendering a custom error message. See [Handling errors](#handling-errors) section for an example.

### `renderLoading?`[​](#renderloading "Direct link to renderloading")

A callback function that allows you to return a custom UI that gets displayed while the thumbnail is loading.

The first parameter of the callback function contains the `height` and `width` of the thumbnail as it gets rendered.

```tsx
const MyApp: React.FC = () => {
  // `RenderLoading` type can be imported from "@remotion/player"
  const renderLoading: RenderLoading = useCallback(({height, width}) => {
    return (
      <AbsoluteFill style={{backgroundColor: 'gray'}}>
        Loading thumbnail ({height}x{width})
      </AbsoluteFill>
    );
  }, []);

  return <Thumbnail fps={30} component={Component} durationInFrames={100} compositionWidth={1080} compositionHeight={1080} frameToDisplay={30} renderLoading={renderLoading} />;
};Copy
```

info

A thumbnail needs to be loaded if it contains elements that use React Suspense, or if the `lazyComponent` prop is being used.

### `inputProps?`[​](#inputprops "Direct link to inputprops")

Pass props to the component that you have specified using the `component` prop. The Typescript definition takes the shape of the props that you have given to your `component`. Default `undefined`.

### `style?`[​](#style "Direct link to style")

A regular `style` prop for a HTMLDivElement. You can pass a different height and width if you would like different dimensions for the thumbnail than the original composition dimensions.

### `className?`[v3.1.3](https://github.com/remotion-dev/remotion/releases/v3.1.3)[​](#classname "Direct link to classname")

A HTML class name to be applied to the container.

### `overflowVisible`[v4.0.173](https://github.com/remotion-dev/remotion/releases/v4.0.173)[​](#overflowvisible "Direct link to overflowvisible")

Makes the Player render things outside of the canvas. Useful if you have interactive elements in the video such as draggable elements.

### `logLevel?`[v4.0.250](https://github.com/remotion-dev/remotion/releases/v4.0.250)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `noSuspense`[v4.0.271](https://github.com/remotion-dev/remotion/releases/v4.0.271)[​](#nosuspense "Direct link to nosuspense")

Disables React Suspense, which is [useful for writing tests](/docs/player/thumbnail).

## ThumbnailRef[​](#thumbnailref "Direct link to ThumbnailRef")

You may attach a ref to the thumbnail and get some layout info.

```tsx
import {Thumbnail, ThumbnailRef} from '@remotion/player';
import {useEffect, useRef} from 'react';
import {MyComposition} from './MyComposition';

const MyComp: React.FC = () => {
  const thumbnailRef = useRef<ThumbnailRef>(null);

  useEffect(() => {
    if (thumbnailRef.current) {
      console.log(thumbnailRef.current.getScale());
    }
  }, []);

  return (
    <Thumbnail
      ref={thumbnailRef}
      durationInFrames={30}
      compositionWidth={1080}
      compositionHeight={1080}
      fps={30}
      frameToDisplay={30}
      component={MyComposition}
      // Many other optional props are available.
    />
  );
};Copy
```

The following methods are available on the thumbnail ref:

### `getContainerNode()`[​](#getcontainernode "Direct link to getcontainernode")

Gets the container `HTMLDivElement` of the thumbnail. Useful if you'd like to manually attach listeners to the thumbnail element.

```tsx
const thumbnailRef = useRef<ThumbnailRef>(null);

useEffect(() => {
  if (!thumbnailRef.current) {
    return;
  }
  const container = thumbnailRef.current.getContainerNode();
  if (!container) {
    return;
  }

  const onClick = () => {
    console.log('thumbnail got clicked');
  };

  container.addEventListener('click', onClick);
  return () => {
    container.removeEventListener('click', onClick);
  };
}, []);Copy
```

### `getScale()`[​](#getscale "Direct link to getscale")

Returns a number which says how much the content is scaled down compared to the natural composition size. For example, if the composition is `1920x1080`, but the thumbnail is 960px in width, this method would return `0.5`.

### `addEventListener()`[​](#addeventlistener "Direct link to addeventlistener")

Start listening to an event. See the [Events](#events) section to see the function signature and the available events.

### `removeEventListener()`[​](#removeeventlistener "Direct link to removeeventlistener")

Stop listening to an event. See the [Events](#events) section to see the function signature and the available events.

## Events[​](#events "Direct link to Events")

Using a [thumbnail ref](#thumbnailref), you can bind event listeners to get notified of certain events of the thumbnail.

```tsx
const thumbnailRef = useRef<ThumbnailRef>(null);

useEffect(() => {
  if (!thumbnailRef.current) {
    return;
  }

  thumbnailRef.current.addEventListener('error', (e) => {
    console.log('error', e.detail.error);
  });
}, []);Copy
```

### `error`[​](#error "Direct link to error")

Fires when an error or uncaught exception has happened in the thumbnail.

You may get the error by reading the `e.detail.error` value:

```tsx
ref.current?.addEventListener('error', (e) => {
  console.log('error ', e.detail.error); // error [Error: undefined is not a function]
});Copy
```

### `waiting`[v4.0.125](https://github.com/remotion-dev/remotion/releases/v4.0.125)[​](#waiting "Direct link to waiting")

Fires when the Player has entered into the [native buffering state](/docs/player/buffer-state).

Read here [how to best implement state management](/docs/player/buffer-state#possible-states).

### `resume`[v4.0.125](https://github.com/remotion-dev/remotion/releases/v4.0.125)[​](#resume "Direct link to resume")

Fires when the Player has exited the [native buffering state](/docs/player/buffer-state).

Read here [how to best implement state management](/docs/player/buffer-state#possible-states).

## Handling errors[​](#handling-errors "Direct link to Handling errors")

See: [`<Player>` -> Handling errors](/docs/player/player#handling-errors)

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/player/src/Thumbnail.tsx)
- [`<Composition>`](/docs/composition)
- [`<Player>`](/docs/player)

CONTRIBUTORS

[**Slashgear**

Implementation](https://github.com/Slashgear)
