---
title: "TypeScript Types Reference"
source: https://www.remotion.dev/docs/vercel/types
---

# TypeScript Types Reference

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

The following types are part of the API of `@remotion/vercel`:

## `VercelSandbox`[​](#vercelsandbox "Direct link to vercelsandbox")

```tsx
import type {VercelSandbox} from '@remotion/vercel';

(alias) type VercelSandbox = Sandbox & AsyncDisposable
import VercelSandbox
```

A [`Sandbox`](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class) with `AsyncDisposable` support. Returned by [`createSandbox()`](/docs/vercel/create-sandbox).

## `CreateSandboxOnProgress`[​](#createsandboxonprogress "Direct link to createsandboxonprogress")

```tsx
import type {CreateSandboxOnProgress} from '@remotion/vercel';

(alias) type CreateSandboxOnProgress = (update: {
    progress: number;
    message: string;
}) => Promise<void> | void
import CreateSandboxOnProgress
```

- `progress`: A number from `0` to `1` indicating overall progress
- `message`: A human-readable description of the current phase

## `RenderMediaOnVercelProgress`[​](#rendermediaonvercelprogress "Direct link to rendermediaonvercelprogress")

```tsx
import type {RenderMediaOnVercelProgress} from '@remotion/vercel';

(alias) type RenderMediaOnVercelProgress = {
    stage: "opening-browser";
    overallProgress: number;
} | {
    stage: "selecting-composition";
    overallProgress: number;
} | {
    stage: "render-progress";
    progress: RenderMediaProgress;
    overallProgress: number;
}
import RenderMediaOnVercelProgress
```

A discriminated union (on `stage`) with the following members:

- `{stage: 'opening-browser', overallProgress: number}` - The browser is being opened.
- `{stage: 'selecting-composition', overallProgress: number}` - The composition is being selected.
- `{stage: 'render-progress', progress: RenderMediaProgress, overallProgress: number}` - The render is in progress. The `progress` field contains the same fields as [`RenderMediaProgress`](#rendermediaprogress).

Every variant includes `overallProgress` — a number from `0` to `1` representing the weighted overall progress.

Used as the `onProgress` callback type for [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel).

## `RenderMediaProgress`[​](#rendermediaprogress "Direct link to rendermediaprogress")

See [`RenderMediaOnProgress`](/docs/renderer/types#rendermediaonprogress) in `@remotion/renderer`.

## `RenderProgress`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#renderprogress "Direct link to renderprogress")

```tsx
import type {RenderProgress} from '@remotion/vercel';

(alias) type RenderProgress = {
    stage: "starting";
    overallProgress: number;
} | RenderMediaOnVercelProgress | {
    stage: "uploading";
    overallProgress: number;
} | {
    stage: "done";
    url: string;
    size: number;
    contentType: string;
    overallProgress: number;
} | {
    stage: "error";
    message: string;
    overallProgress: number;
} | {
    stage: "expired";
}
import RenderProgress
```

A discriminated union (on `stage`) returned by [`getRenderProgress()`](/docs/vercel/get-render-progress).

- `{stage: 'starting', overallProgress: number}` - The sandbox command started, but no progress file exists yet.
- `{stage: 'opening-browser', overallProgress: number}` - The browser is being opened.
- `{stage: 'selecting-composition', overallProgress: number}` - The composition is being selected.
- `{stage: 'render-progress', progress: RenderMediaProgress, overallProgress: number}` - The render is in progress.
- `{stage: 'uploading', overallProgress: number}` - The rendered video is being uploaded to Vercel Blob.
- `{stage: 'done', url: string, size: number, contentType: string, overallProgress: number}` - The render finished and was uploaded.
- `{stage: 'error', message: string, overallProgress: number}` - The render failed.
- `{stage: 'expired'}` - The sandbox no longer exists.

## `RenderStillOnVercelProgress`[​](#renderstillonvercelprogress "Direct link to renderstillonvercelprogress")

```tsx
import type {RenderStillOnVercelProgress} from '@remotion/vercel';

(alias) type RenderStillOnVercelProgress = {
    stage: "opening-browser";
    overallProgress: number;
} | {
    stage: "selecting-composition";
    overallProgress: number;
}
import RenderStillOnVercelProgress
```

A discriminated union (on `stage`) with the following members:

- `{stage: 'opening-browser', overallProgress: number}` - The browser is being opened.
- `{stage: 'selecting-composition', overallProgress: number}` - The composition is being selected.

Every variant includes `overallProgress` — a number from `0` to `1` representing the weighted overall progress.

Used as the `onProgress` callback type for [`renderStillOnVercel()`](/docs/vercel/render-still-on-vercel).

## `VercelBlobAccess`[​](#vercelblobaccess "Direct link to vercelblobaccess")

```tsx
import type {VercelBlobAccess} from '@remotion/vercel';

(alias) type VercelBlobAccess = "public" | "private"
import VercelBlobAccess
```

Either `"public"` or `"private"`. Used as the `access` parameter for [`uploadToVercelBlob()`](/docs/vercel/upload-to-vercel-blob).

## `VercelBlobUploadOptions`[v4.0.469](https://github.com/remotion-dev/remotion/releases/v4.0.469)[​](#vercelblobuploadoptions "Direct link to vercelblobuploadoptions")

```tsx
import type {VercelBlobUploadOptions} from '@remotion/vercel';

(alias) type VercelBlobUploadOptions = {
    blobToken: string;
    access: VercelBlobAccess;
    blobPath?: string;
}
import VercelBlobUploadOptions
```

Used by [`renderMediaOnVercel({detached: true})`](/docs/vercel/render-media-on-vercel#detached) to upload the render from inside the sandbox.

### `blobToken`[​](#blobtoken "Direct link to blobtoken")

A Vercel Blob read-write token.

### `access`[​](#access "Direct link to access")

Either `"public"` or `"private"`.

### `blobPath?`[​](#blobpath "Direct link to blobpath")

The path where the file should be stored in Vercel Blob. Default: A random path under `renders/`.
