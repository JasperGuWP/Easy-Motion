---
title: "bundle()"
source: https://www.remotion.dev/docs/bundle
---

# bundle()

*Part of the `@remotion/bundler` package.*

Bundles a Remotion project using Webpack and prepares it for rendering using [`renderMedia()`](/docs/renderer/render-media). [See a full server-side rendering example.](/docs/ssr-node)

You only need to call this function when the source code changes. You can render multiple videos from the same bundle and parametrize them using [input props](/docs/passing-props).

Calling `bundle()` for every video that you render is an anti-pattern.  
`bundle()` cannot be called in a serverless function, see: [Calling bundle() in bundled code](/docs/troubleshooting/bundling-bundle).

## Example[​](#example "Direct link to Example")

```tsx
render.mjs

import path from 'path';
import {bundle} from '@remotion/bundler';

const serveUrl = await bundle({
  entryPoint: path.join(process.cwd(), './src/index.ts'),
  // If you have a webpack override in remotion.config.ts, pass it here as well.
  webpackOverride: (config) => config,
});Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

### `entryPoint`[​](#entrypoint "Direct link to entrypoint")

A `string` containing an absolute path of the entry point of a Remotion project. [In most Remotion project created with the template, the entry point is located at `src/index.ts`](/docs/terminology/entry-point).

### `onProgress?`[​](#onprogress "Direct link to onprogress")

A callback function that notifies about the progress of the Webpack bundling. Passes a number between `0` and `100`. Example function:

```tsx
const onProgress = (progress: number) => {
  console.log(`Webpack bundling progress: ${progress}%`);
};Copy
```

### `webpackOverride?`[​](#webpackoverride "Direct link to webpackoverride")

A function to override the webpack config reducer-style. Takes a function which gives you the current webpack config which you can transform and return a modified version of it. For example:

```tsx
const webpackOverride: WebpackOverrideFn = (webpackConfig) => {
  return {
    ...webpackConfig,
    // Override properties
  };
};Copy
```

### `outDir?`[​](#outdir "Direct link to outdir")

Specify a desired output directory. If no passed, the webpack bundle will be created in a temp dir.

### `askAIEnabled?`[​](#askaienabled "Direct link to askaienabled")

If the Cmd + I shortcut of the Ask AI modal conflicts with your Studio, you can disable it using this.

### `rspack?`[​](#rspack "Direct link to rspack")

Whether to use [Rspack](https://rspack.dev) instead of Webpack as the bundler. Default `false`.

### `keyboardShortcutsEnabled?`[​](#keyboardshortcutsenabled "Direct link to keyboardshortcutsenabled")

Enable or disable keyboard shortcuts in the Remotion Studio.

### `enableCaching?`[​](#enablecaching "Direct link to enablecaching")

Enable or disable Webpack caching. This flag is enabled by default, use `--bundle-cache=false` to disable caching.

### `publicPath?`[​](#publicpath "Direct link to publicpath")

The path of the URL where the bundle is going to be hosted. By default it is `/`, meaning that the bundle is going to be hosted at the root of the domain (e.g. `https://localhost:3000/`). If you are deploying to a subdirectory (e.g. `/sites/my-site/`), you should set this to the subdirectory.

### `rootDir?`[v3.1.6](https://github.com/remotion-dev/remotion/releases/v3.1.6)[​](#rootdir "Direct link to rootdir")

The directory in which the Remotion project is rooted in. This should be set to the directory that contains the `package.json` which installs Remotion. By default, it is the current working directory.

note

The current working directory is the directory from which your program gets executed from. It is not the same as the file where bundle() gets called.

### `publicDir?`[v3.2.13](https://github.com/remotion-dev/remotion/releases/v3.2.13)[​](#publicdir "Direct link to publicdir")

Define the location of the [`public/ directory`](/docs/terminology/public-dir). If not defined, Remotion will assume the location is the `public` folder in your Remotion root.

### `onPublicDirCopyProgress?`[v3.3.3](https://github.com/remotion-dev/remotion/releases/v3.3.3)[​](#onpublicdircopyprogress "Direct link to onpublicdircopyprogress")

Reports progress of how many bytes have been written while copying the `public/` directoy. Useful to warn the user if the directory is large that this operation is slow.

### `onSymlinkDetected?`[v3.3.3](https://github.com/remotion-dev/remotion/releases/v3.3.3)[​](#onsymlinkdetected "Direct link to onsymlinkdetected")

Gets called when a symbolic link is detected in the `public/` directory. Since Remotion will forward the symbolic link, it might be useful to display a hint to the user that if the original symbolic link gets deleted, the bundle will also break.

### `ignoreRegisterRootWarning?`[v3.3.46](https://github.com/remotion-dev/remotion/releases/v3.3.46)[​](#ignoreregisterrootwarning "Direct link to ignoreregisterrootwarning")

Ignore an error that gets thrown if you pass an entry point file which does not contain `registerRoot`.

## Legacy function signature[​](#legacy-function-signature "Direct link to Legacy function signature")

Remotion versions earlier than v3.2.17 had the following function signature instead:

```tsx
const bundle: (
  entryPoint: string,
  onProgress?: (progress: number) => void,
  options?: {
    webpackOverride?: WebpackOverrideFn;
    outDir?: string;
    enableCaching?: boolean;
    publicPath?: string;
    rootDir?: string;
    publicDir?: string | null;
  },
) => Promise<string>;Copy
```

Example:

```tsx
await bundle('src/index.ts', () => console.log(progress * 100 + '% done'), {
  webpackOverride,
});Copy
```

It is still supported in Remotion v3, but we encourage to migrate to the new function signature.

## Return value[​](#return-value "Direct link to Return value")

A promise which will resolve into a `string` specifying the output directory.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/bundler/src/bundle.ts)
- [Server-Side rendering](/docs/ssr)
- [getCompositions()](/docs/renderer/get-compositions)
- [renderMedia()](/docs/renderer/render-media)
- [stitchFramesToVideo()](/docs/renderer/stitch-frames-to-video)
- [Calling bundle() in bundled code](/docs/troubleshooting/bundling-bundle)
