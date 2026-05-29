---
title: "delayRender() and continueRender()"
source: https://www.remotion.dev/docs/delay-render
---

# delayRender() and continueRender()

`delayRender()` pauses the render to let an asynchronous task such as data fetching complete.  
It has no effect when you are in a preview environment (e.g. Studio or Player).

This API returns a handle. Once you have fetched data or finished the asynchronous task, you should call `continueRender(handle)` to let Remotion know that the render can continue.

If the asynchronous task fails and you cannot recover, call [`cancelRender()`](/docs/cancel-render) to cancel the render.

`delayRender()` can be imported from the [`remotion`](/docs/remotion) package, but preferrably, you should use the [`useDelayRender()`](/docs/use-delay-render) hook instead, because it future-proofs your code for [browser rendering](/docs/miscellaneous/render-in-browser).

## Example[​](#example "Direct link to Example")

```tsx
import {useCallback, useEffect, useState} from 'react';
import {useDelayRender} from 'remotion';

export const MyVideo = () => {
  const [data, setData] = useState(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://example.com/api');
      const json = await response.json();
      setData(json);

      continueRender(handle);
    } catch (err) {
      cancelRender(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{data ? <div>This video has data from an API! {JSON.stringify(data)}</div> : null}</div>;
};Copy
```

## Timeout[​](#timeout "Direct link to Timeout")

After calling `delayRender()`, you need to call `continueRender()` within 30 seconds or the render will fail with a timeout error. You can [customize the timeout](/docs/timeout#increase-timeout).

If `continueRender()` is not called within the timeout frame, the render will fail with an exception similarly to this:

```tsx
A delayRender() was called but not cleared after 28000ms. See https://remotion.dev/docs/timeout for help. The delayRender was calledCopy
```

See the [Timeout](/docs/timeout) page to troubleshoot timeouts.

## Adding a label[v2.6.13](https://github.com/remotion-dev/remotion/releases/v2.6.13)[​](#adding-a-label "Direct link to adding-a-label")

If you encounter a timeout and don't know where it came from, you can add a label as a parameter:

```tsx
delayRender('Fetching data from API...');Copy
```

If the call times out, the label will be referenced in the error message:

```tsx
Uncaught Error: A delayRender() "Fetching data from API..." was called but not cleared after 28000ms. See https://remotion.dev/docs/timeout for help. The delayRender was calledCopy
```

## Multiple calls[​](#multiple-calls "Direct link to Multiple calls")

You can call `delayRender()` multiple times. The render will be blocked for as long as at least one blocking handle exists that has not been cleared by `continueRender()`.

```tsx
import {useEffect, useState} from 'react';
import {useDelayRender} from 'remotion';

const MyComp: React.FC = () => {
  const {delayRender, continueRender} = useDelayRender();
  const [handle1] = useState(() => delayRender());
  const [handle2] = useState(() => delayRender());

  useEffect(() => {
    // You need to clear all handles before the render continues
    continueRender(handle1);
    continueRender(handle2);
  }, []);

  return null;
};Copy
```

## Encapsulation[​](#encapsulation "Direct link to Encapsulation")

You should put `delayRender()` calls inside your components rather than placing them as a top-level statement, to avoid blocking a render if a different composition is rendered.

```tsx
❌ Bug - Other compositions are blocked

import {useEffect} from 'react';
import {continueRender, delayRender} from 'remotion';

// Don't call a delayRender() call outside a component -
// it will block the render if a different composition is rendered
// as well as block the fetching of the list of compositions.
const handle = delayRender();

const MyComp: React.FC = () => {
  useEffect(() => {
    continueRender(handle);
  }, []);

  return null;
};Copy
```

Also avoid creating a new handle on every [React render](https://react.dev/learn/render-and-commit):

```tsx
❌ Bug - New handle is create on every React re-render

import {useEffect} from 'react';
import {continueRender, delayRender} from 'remotion';

const MyComp: React.FC = () => {
  // New handle is created on every React re-render
  const handle = delayRender();

  useEffect(() => {
    continueRender(handle);
  }, []);

  return null;
};Copy
```

It's best to always use [`useDelayRender()`](/docs/use-delay-render) in the first place since this mistake cannot happen and it enables [browser rendering](/docs/miscellaneous/render-in-browser) in the future.

```tsx
✅ Best practice - useDelayRender() + useState()

import {useEffect, useState} from 'react';
import {useDelayRender} from 'remotion';

const MyComp: React.FC = () => {
  const {delayRender, continueRender} = useDelayRender();
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    continueRender(handle);
  }, []);

  return null;
};Copy
```

## Data fetching[​](#data-fetching "Direct link to Data fetching")

Note that data fetching can also be performed in [`calculateMetadata()`](/docs/composition#calculatemetadata), which has 2 advantages:

- It runs only once, rather than the amount of [concurrency](/docs/terminology/concurrency).
- You don't need to call `continueRender()` or `cancelRender()` manually.

## Failing with an error[v4.0.374](https://github.com/remotion-dev/remotion/releases/v4.0.374)[​](#failing-with-an-error "Direct link to failing-with-an-error")

If your code fails to do an asynchronous operation and you want to cancel the render, you can call [`cancelRender()`](/docs/cancel-render) with an error message. This will automatically cancel all `delayRender()` calls to not further delay the render.

```tsx
MyComposition.tsx

import React, {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';

export const MyComp: React.FC = () => {
  const [handle] = useState(() => delayRender('Fetching data...'));

  useEffect(() => {
    fetch('https://example.com')
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => cancelRender(err));
  }, []);

  return null;
};Copy
```

## Retrying[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#retrying "Direct link to retrying")

If an operation is flaky (for example, if loading an asset from a CDN does sometimes give 5xx errors), you can pass an object with a `retries` value as a second argument.  
If a `delayRender()` call is not cleared within the timeout, the whole browser tab will be closed and the frame will be retried from scratch.

```tsx
Retrying a delayRender()

delayRender('Loading asset...', {
  retries: 1, // default: 0
});Copy
```

The [`<Img>`](/docs/img#delayrenderretries), [`<Video>`](/docs/media/video#delayrenderretries), [`<Audio>`](/docs/media/audio#delayrenderretries), [`<Html5Audio>`](/docs/html5-audio#delayrenderretries), [`<Html5Video>`](/docs/html5-video#delayrenderretries) and [`<IFrame>`](/docs/iframe#delayrenderretries) tags support a `delayRenderRetries` prop to control the value of `retries` for the `delayRender()` call that those components make.

## Modifying the timeout[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#modifying-the-timeout "Direct link to modifying-the-timeout")

In addition to the [global timeout](/docs/timeout#increase-timeout) that can be set, the timeout can be modified on a per-`delayRender()` level.

```tsx
Modifying the timeout of a delayRender()

delayRender('Loading asset...', {
  timeoutInMilliseconds: 7000,
});Copy
```

The [`<Img>`](/docs/img#delayrendertimeoutinmilliseconds), [`<Video>`](/docs/media/video#delayrendertimeoutinmilliseconds), [`<Audio>`](/docs/media/audio#delayrendertimeoutinmilliseconds), [`<Html5Audio>`](/docs/html5-audio#delayrendertimeoutinmilliseconds), [`<Html5Video>`](/docs/html5-video#delayrendertimeoutinmilliseconds) and [`<IFrame>`](/docs/iframe#delayrendertimeoutinmilliseconds) tags support a `delayRenderTimeoutInMilliseconds` prop to control the value of `timeoutInMilliseconds` for the `delayRender()` call that those components make.

## Difference to `useBufferState().delayPlayback()`[​](#difference-to-usebufferstatedelayplayback "Direct link to difference-to-usebufferstatedelayplayback")

[`useBufferState()`](/docs/use-buffer-state) is a different API that allows pausing playback in the [Studio](/docs/terminology/studio) and in the [Player](/docs/terminology/player).  
`delayRender()` only has an effect when a video is being rendered.

If you are loading data, you might want to both delay the screenshotting of your component during rendering and start a buffering state during Preview, in which case you need to use both APIs together.

```tsx
Using delayRender() and delayPlayback() together

import React from 'react';
import {useBufferState, useDelayRender} from 'remotion';

const MyComp: React.FC = () => {
  const buffer = useBufferState();
  const {delayRender, continueRender} = useDelayRender();
  const [handle] = React.useState(() => delayRender());

  React.useEffect(() => {
    const delayHandle = buffer.delayPlayback();

    setTimeout(() => {
      delayHandle.unblock();
      continueRender(handle);
    }, 5000);

    return () => {
      delayHandle.unblock();
    };
  }, []);

  return <></>;
};Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | Use useDelayRender()  No-op  No-op | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/delay-render.ts)
- [`useDelayRender()`](/docs/use-delay-render)
- [`continueRender()`](/docs/continue-render)
- [`cancelRender()`](/docs/cancel-render)
- [Data fetching](/docs/data-fetching)
