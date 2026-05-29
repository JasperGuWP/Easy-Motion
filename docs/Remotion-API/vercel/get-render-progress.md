---
title: "getRenderProgress()v4.0.469"
source: https://www.remotion.dev/docs/vercel/get-render-progress
---

# getRenderProgress()[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Polls the progress of a detached [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel) call.

Use this API when your Vercel function should start a render and return before the video has finished rendering.

## Example[​](#example "Direct link to Example")

```tsx
app/api/render/progress/route.ts

import {getRenderProgress} from '@remotion/vercel';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const sandboxId = url.searchParams.get('sandboxId');
  const cmdId = url.searchParams.get('cmdId');

  if (!sandboxId || !cmdId) {
    return Response.json({error: 'Missing params'}, {status: 400});
  }

  const progress = await getRenderProgress({sandboxId, cmdId});
  return Response.json(progress);
}Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `sandboxId`[​](#sandboxid "Direct link to sandboxid")

The ID returned from [`renderMediaOnVercel({detached: true})`](/docs/vercel/render-media-on-vercel#detached).

### `cmdId`[​](#cmdid "Direct link to cmdid")

The command ID returned from [`renderMediaOnVercel({detached: true})`](/docs/vercel/render-media-on-vercel#detached).

## Return value[​](#return-value "Direct link to Return value")

A [`RenderProgress`](/docs/vercel/types#renderprogress "You can import the TypeScript type `RenderProgress` from @remotion/vercel") object.

Terminal stages are:

- `done`: The render was uploaded to Vercel Blob.
- `error`: The render failed.
- `expired`: The sandbox no longer exists.

When `done` or `error` is returned, remove the stored render handle in your app.
The sandbox is left alive until its configured timeout so a refreshed page can still read the terminal progress.

## See also[​](#see-also "Direct link to See also")

- [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel)
- [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/get-render-progress.ts)
