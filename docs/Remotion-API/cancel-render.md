---
title: "cancelRender()v3.3.44"
source: https://www.remotion.dev/docs/cancel-render
---

# cancelRender()[v3.3.44](https://github.com/remotion-dev/remotion/releases/v3.3.44)

By invoking this function, Remotion will stop the current render, and not perform any retries.

Pass a `string` or an `Error` (for best stack traces) to `cancelRender()` so you can identify the error when your render failed.  
If a `string` is passed, it will be turned into an `Error` object.

[It `throw`s the error](#cancelrender-throws-an-error), so any code after it will not be executed.  
You might have to catch it to avoid unhandled errors.

`cancelRender()` can be imported from the [`remotion`](/docs/remotion) package, but preferrably, you should use the [`useDelayRender()`](/docs/use-delay-render) (from v3.0.374) hook instead, because it future-proofs your code for [browser rendering](/docs/miscellaneous/render-in-browser).

## Example[​](#example "Direct link to Example")

```tsx
MyComposition.tsx

import React, {useEffect, useState} from 'react';
import {useDelayRender} from 'remotion';

export const MyComp: React.FC = () => {
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender('Fetching data...'));

  useEffect(() => {
    fetch('https://example.com')
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, []);

  return null;
};Copy
```

```tsx
⚠️ Discouraged - global APIs

import {useEffect, useState} from 'react';
import {delayRender, continueRender, cancelRender} from 'remotion';

const MyComp: React.FC = () => {
  const [handle] = useState(() => delayRender('Fetching data...'));

  useEffect(() => {
    fetch('https://example.com')
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, []);

  return <div>My component</div>;
};Copy
```

## `cancelRender()` throws an error[​](#cancelrender-throws-an-error "Direct link to cancelrender-throws-an-error")

`cancelRender()` also throws an error, so any code after it will not be executed.

In [client-side rendering](/docs/miscellaneous/render-in-browser), this is not caught by [`renderMediaOnWeb()`](/docs/web-renderer/render-media-on-web) or [`renderStillOnWeb()`](/docs/web-renderer/render-still-on-web) and is an unhandled error.  
Wrap `cancelRender()` in a `try`/`catch` block to avoid this:

```tsx
✅ Best practice - wrap cancelRender() in a try/catch block

import {useDelayRender} from 'remotion';

const {cancelRender} = useDelayRender();

try {
  cancelRender(new Error('This throws an error'));
} catch {
  // Ignore the resulting error
}Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | Throws error  Throws error | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/cancel-render.ts)
- [delayRender()](/docs/delay-render)
- [continueRender()](/docs/continue-render)
