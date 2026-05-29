---
title: "deploySite()"
source: https://www.remotion.dev/docs/cloudrun/deploysite
---

# deploySite()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Takes a Remotion project, bundles it and uploads it to an Cloud Storage bucket. Once uploaded, a Cloud Run service can render any composition in the Remotion project by specifying the URL.

- If you make changes locally, you need to redeploy the site. You can use [`siteName`](#sitename) to overwrite the previous site.
- Note that the Remotion project will be deployed to a subdirectory, not the root of the domain. Therefore you must ensure that if you have specified paths in your Remotion project, they are able to handle this scenario.
- Before calling this function, you should create a bucket, see [`getOrCreateBucket()`](/docs/cloudrun/getorcreatebucket).

## Example[​](#example "Direct link to Example")

```tsx
import {deploySite} from '@remotion/cloudrun';
import path from 'path';

const {serveUrl} = await deploySite({
  entryPoint: path.resolve(process.cwd(), 'src/index.ts'),
  bucketName: 'remotioncloudrun-c7fsl3d',
  options: {
    onBundleProgress: (progress) => {
      // Progress is between 0 and 100
      console.log(`Bundle progress: ${progress}%`);
    },
    onUploadProgress: ({totalFiles, filesUploaded, totalSize, sizeUploaded}) => {
      console.log(`Upload progress: Total files ${totalFiles}, Files uploaded ${filesUploaded}, Total size ${totalSize}, Size uploaded ${sizeUploaded}`);
    },
  },
});
console.log(serveUrl);Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `entryPoint`[​](#entrypoint "Direct link to entrypoint")

An absolute path pointing to the entry point of your Remotion project. [Usually the entry point in your Remotion project is stored at `src/entry.tsx`](/docs/terminology/entry-point).

### `bucketName`[​](#bucketname "Direct link to bucketname")

The bucket to where the website will be deployed. The bucket must have been created by Remotion Cloud Run.

### `siteName?`[​](#sitename "Direct link to sitename")

Specify the subfolder in your Cloud Storage bucket that you want the site to deploy to. If you omit this property, a new subfolder with a random name will be created. If a site already exists with the name you passed, it will be overwritten. Can only contain the following characters: `0-9`, `a-z`, `A-Z`, `-`, `!`, `_`, `.`, `*`, `'`, `(`, `)`

### `logLevel?`[v4.0.140](https://github.com/remotion-dev/remotion/releases/v4.0.140)[​](#loglevel "Direct link to loglevel")

One of `trace`, `verbose`, `info`, `warn`, `error`.  
 Determines how much info is being logged to the console.  
  
 Default `info`.

### `options?`[​](#options "Direct link to options")

An object with the following properties:

#### `onBundleProgress?`[​](#onbundleprogress "Direct link to onbundleprogress")

Callback from Webpack when the bundling has progressed. Passes a number between 0 and 100 to the callback, see example at the top of the page.

#### `onUploadProgress?`[​](#onuploadprogress "Direct link to onuploadprogress")

Callback function that gets called when uploading of the assets has progressed. Passes an object with the following properties to the callback:

- `totalFiles` (*number*): Total number of files in the bundle.
- `filesUploaded` (*number*): Number of files that have been fully uploaded so far.
- `totalSize` (*number*): Total size in bytes of all the files in the bundle.
- `sizeUploaded` (*number*): Amount of bytes uploaded so far.

#### `webpackOverride?`[​](#webpackoverride "Direct link to webpackoverride")

Allows to pass a custom webpack override. See [`bundle()` -> webpackOverride](/docs/bundle#webpackoverride) for more information.

#### `enableCaching?`[​](#enablecaching "Direct link to enablecaching")

Enable or disable Webpack caching. This flag is enabled by default, use `--bundle-cache=false` to disable caching.

#### `publicDir?`[​](#publicdir "Direct link to publicdir")

Define the location of the [`public/ directory`](/docs/terminology/public-dir). If not defined, Remotion will assume the location is the `public` folder in your Remotion root.

#### `rootDir?`[​](#rootdir "Direct link to rootdir")

The directory in which the Remotion project is rooted in. This should be set to the directory that contains the `package.json` which installs Remotion. By default, it is the current working directory.

note

The current working directory is the directory from which your program gets executed from. It is not the same as the file where bundle() gets called.

#### `ignoreRegisterRootWarning?`[​](#ignoreregisterrootwarning "Direct link to ignoreregisterrootwarning")

Ignore an error that gets thrown if you pass an entry point file which does not contain `registerRoot`.

#### `keyboardShortcutsEnabled?`[v4.0.407](https://github.com/remotion-dev/remotion/releases/v4.0.407)[​](#keyboardshortcutsenabled "Direct link to keyboardshortcutsenabled")

Enable or disable keyboard shortcuts in the Remotion Studio.

#### `askAIEnabled?`[v4.0.407](https://github.com/remotion-dev/remotion/releases/v4.0.407)[​](#askaienabled "Direct link to askaienabled")

If the Cmd + I shortcut of the Ask AI modal conflicts with your Studio, you can disable it using this.

#### `experimentalClientSideRenderingEnabled?`[v4.0.407](https://github.com/remotion-dev/remotion/releases/v4.0.407)[​](#experimentalclientsiderenderingenabled "Direct link to experimentalclientsiderenderingenabled")

Enable WIP client-side rendering in the Remotion Studio. See https://www.remotion.dev/docs/client-side-rendering/ for notes.

#### `rspack?`[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)[​](#rspack "Direct link to rspack")

Uses Rspack instead of Webpack as the bundler for the Studio or bundle.

## Return value[​](#return-value "Direct link to Return value")

An object with the following values:

### `serveUrl`[​](#serveurl "Direct link to serveurl")

*string*

An URL such as `https://storage.googleapis.com/remotioncloudrun-123asd321/sites/abcdefgh/index.html`.

You can use this "Serve URL" to render a video on Remotion Cloud Run using:

- The [`npx remotion cloudrun render`](/docs/cloudrun/cli/render) command
- The [`renderMediaOnCloudrun()`](/docs/cloudrun/rendermediaoncloudrun) and [`renderStillOnCloudrun()`](/docs/cloudrun/renderstilloncloudrun) functions.
- Locally using the [`renderMedia()`](/docs/renderer/render-media) and [`renderStill()`](/docs/renderer/render-still) functions.
- Locally using the [`npx remotion render`](/docs/cli) and [`npx remotion still`](/docs/cli) commands

If you are rendering on Cloud Run, you can also pass the site name (in this case `abcdefgh`) as an abbreviation.

### `siteName`[​](#sitename-1 "Direct link to sitename-1")

*string*

The identifier of the site that was given. Is either the site name that you have passed into this function, or a random string that was generated if you didn't pass a site name.

### `stats`[​](#stats "Direct link to stats")

An object with 3 entries:

- `uploadedFiles`
- `deletedFiles`
- `untouchedFiles`

Each one is a `number`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/deploy-site.ts)
- [CLI equivalent: `npx remotion cloudrun sites create`](/docs/cloudrun/cli/sites/create)
- [getSites()](/docs/cloudrun/getsites)
- [deleteSite()](/docs/cloudrun/deletesite)
