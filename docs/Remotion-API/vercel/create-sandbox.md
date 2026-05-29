---
title: "createSandbox()v4.0.426"
source: https://www.remotion.dev/docs/vercel/create-sandbox
---

# createSandbox()[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Creates a new [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) with all Remotion dependencies installed, including system libraries, the compositor, and a browser.  
After creating the sandbox, call [`addBundleToSandbox()`](/docs/vercel/add-bundle-to-sandbox) to copy your Remotion bundle into it.

## Example[​](#example "Direct link to Example")

```tsx
create-snapshot.ts

const sandbox = await createSandbox({
  onProgress: async ({progress, message}) => {
    console.log(`${message} (${Math.round(progress * 100)}%)`);
  },
});

await addBundleToSandbox({
  sandbox,
  bundleDir: '/path/to/bundle',
});

// ... use the sandbox

await sandbox.stop();Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `onProgress?`[​](#onprogress "Direct link to onprogress")

A callback that receives progress updates during sandbox creation.

```tsx
const onProgress: CreateSandboxOnProgress = async ({progress, message}) => {
  console.log(`${message} (${Math.round(progress * 100)}%)`);
};Copy
```

### `resources?`[​](#resources "Direct link to resources")

The resources to allocate to the sandbox. The type is inherited from the [`@vercel/sandbox`](https://vercel.com/docs/vercel-sandbox) SDK.

Each vCPU gets 2048 MB of memory.

```tsx
custom-resources.ts

const sandbox = await createSandbox({
  resources: {vcpus: 8},
});Copy
```

Default: `{vcpus: 4}`.

### `timeoutInMilliseconds?`[v4.0.452](https://github.com/remotion-dev/remotion/releases/v4.0.452)[​](#timeoutinmilliseconds "Direct link to timeoutinmilliseconds")

The maximum time allowed for the sandbox to be created, in milliseconds. If exceeded, sandbox creation is aborted.

Default: `300000` (5 minutes).

## Return value[​](#return-value "Direct link to Return value")

A [`VercelSandbox`](/docs/vercel/types#vercelsandbox) object (a [`Sandbox`](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class) with `AsyncDisposable` support).

## Stopping the sandbox[​](#stopping-the-sandbox "Direct link to Stopping the sandbox")

When you are done with the sandbox, you need to stop it to free resources. There are two ways to do this:

### Using `sandbox.stop()`[​](#using-sandboxstop "Direct link to using-sandboxstop")

Manually call `sandbox.stop()` when you are done:

```tsx
manual-cleanup.ts

const sandbox = await createSandbox();

// ... use the sandbox

await sandbox.stop();Copy
```

### Using `await using`[​](#using-await-using "Direct link to using-await-using")

Use `await using` to automatically stop the sandbox when it goes out of scope:

```tsx
auto-cleanup.ts

await using sandbox = await createSandbox();

// ... use the sandbox
// sandbox.stop() is called automaticallyCopy
```

## See also[​](#see-also "Direct link to See also")

- [`addBundleToSandbox()`](/docs/vercel/add-bundle-to-sandbox)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/create-sandbox.ts)
