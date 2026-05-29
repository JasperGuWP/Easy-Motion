---
title: "<IFrame>"
source: https://www.remotion.dev/docs/iframe
---

# <IFrame>

The `<IFrame />` can be used like the regular `<iframe>` HTML tag.

Remotion automatically wraps the `<iframe>` in a [`delayRender()`](/docs/delay-render) call
and ensures that the iframe is loaded before rendering the frame.

Ideally, the website should not have any animations, since only animations using [`useCurrentFrame()`](/docs/use-current-frame) are supported by Remotion. See [Flickering](/docs/flickering) for an explanation.

## Example[​](#example "Direct link to Example")

```tsx
import {IFrame} from 'remotion';

export const MyComp: React.FC = () => {
  return <IFrame src="https://remotion.dev" />;
};Copy
```

## Props[​](#props "Direct link to Props")

### `src`[​](#src "Direct link to src")

The URL to load.

### `delayRenderTimeoutInMilliseconds`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrendertimeoutinmilliseconds "Direct link to delayrendertimeoutinmilliseconds")

Customize the [timeout](/docs/delay-render#modifying-the-timeout) of the [`delayRender()`](/docs/delay-render) call that this component makes.

### `delayRenderRetries`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#delayrenderretries "Direct link to delayrenderretries")

Customize the [number of retries](/docs/delay-render#retrying) of the [`delayRender()`](/docs/delay-render) call that this component makes.  
Prefer the [`maxRetries`](/docs/img#maxretries) prop over this.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this component](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/IFrame.tsx)
- [Use `<Img>` and `<IFrame>` tags](/docs/use-img-and-iframe)
