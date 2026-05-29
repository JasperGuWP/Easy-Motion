---
title: "uploadToVercelBlob()v4.0.426"
source: https://www.remotion.dev/docs/vercel/upload-to-vercel-blob
---

# uploadToVercelBlob()[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Uploads a file from the sandbox to [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) storage. Typically used after [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel) or [`renderStillOnVercel()`](/docs/vercel/render-still-on-vercel) to make the output publicly accessible.

## Example[​](#example "Direct link to Example")

```tsx
route.ts

const {url, size} = await uploadToVercelBlob({
  sandbox,
  sandboxFilePath: '/tmp/video.mp4',
  contentType: 'video/mp4',
  blobToken: process.env.BLOB_READ_WRITE_TOKEN!,
  access: 'public',
});

console.log(`Uploaded ${size} bytes to ${url}`);Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `sandbox`[​](#sandbox "Direct link to sandbox")

A [`Sandbox`](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class) instance.

### `sandboxFilePath`[​](#sandboxfilepath "Direct link to sandboxfilepath")

The path to the file inside the sandbox to upload, e.g. `"/tmp/video.mp4"`.

### `blobPath?`[​](#blobpath "Direct link to blobpath")

The destination path in Vercel Blob, e.g. `"renders/abc.mp4"`. If omitted, a random path is generated.

### `contentType`[​](#contenttype "Direct link to contenttype")

The MIME type of the file, e.g. `"video/mp4"` or `"image/png"`.

### `blobToken`[​](#blobtoken "Direct link to blobtoken")

Your Vercel Blob read/write token. Typically `process.env.BLOB_READ_WRITE_TOKEN`.

### `access`[​](#access "Direct link to access")

[`VercelBlobAccess`](/docs/vercel/types#vercelblobaccess "You can import the TypeScript type `VercelBlobAccess` from @remotion/vercel")

The access level of the uploaded blob. Either `"public"` or `"private"`. Default: `"private"`.

## Return value[​](#return-value "Direct link to Return value")

An object containing:

### `url`[​](#url "Direct link to url")

The public download URL of the uploaded file.

### `size`[​](#size "Direct link to size")

The size of the uploaded file in bytes.

## See also[​](#see-also "Direct link to See also")

- [`renderMediaOnVercel()`](/docs/vercel/render-media-on-vercel)
- [`renderStillOnVercel()`](/docs/vercel/render-still-on-vercel)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/upload-to-vercel-blob.ts)
