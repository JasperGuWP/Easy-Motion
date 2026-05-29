---
title: "getGifDurationInSeconds()"
source: https://www.remotion.dev/docs/gif/get-gif-duration-in-seconds
---

# getGifDurationInSeconds()

*Part of the [`@remotion/gif`](/docs/gif) package*

[v3.2.22](https://github.com/remotion-dev/remotion/releases/v3.2.22)

Gets the duration in seconds of a GIF.

note

Remote GIFs need to support [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).More info

- Remotion's origin is usually `http://localhost:3000`, but it may be different if rendering on Lambda or the port is busy.- You can [disable CORS](/docs/chromium-flags#--disable-web-security) during renders.

## Arguments[​](#arguments "Direct link to Arguments")

### `src`[​](#src "Direct link to src")

A string pointing to a GIF asset

## Return value[​](#return-value "Direct link to Return value")

`Promise<number>` - the duration of the GIF in seconds, not factoring in that whether it is looped.

## Example[​](#example "Direct link to Example")

```tsx
import {getGifDurationInSeconds} from '@remotion/gif';
import gif from './cat.gif';

const MyComp: React.FC = () => {
  const getDuration = useCallback(async () => {
    const imported = await getGifDurationInSeconds(gif); // 127.452
    const publicFile = await getGifDurationInSeconds(staticFile('giphy.gif')); // 2.10
    const remote = await getGifDurationInSeconds('https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif'); // 3.23
  }, []);

  useEffect(() => {
    getDuration();
  }, []);

  return null;
};Copy
```

## See also[​](#see-also "Direct link to See also")

- [`<Gif>`](/docs/gif/gif)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/gif/src/get-gif-duration-in-seconds.ts)
