---
title: "addBundleToSandbox()v4.0.426"
source: https://www.remotion.dev/docs/vercel/add-bundle-to-sandbox
---

# addBundleToSandbox()[v4.0.426](https://github.com/remotion-dev/remotion/releases/v4.0.426)

warning

Experimental package: We reserve the right to make breaking changes in order to correct bad design decisions until this notice is gone.

Copies your Remotion bundle into a sandbox. Call this after [`createSandbox()`](/docs/vercel/create-sandbox) to add your bundle files.

## Example[​](#example "Direct link to Example")

```tsx
create-snapshot.ts

const sandbox = await createSandbox();

await addBundleToSandbox({
  sandbox,
  bundleDir: '/path/to/bundle',
});

// ... use the sandbox

await sandbox.stop();Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `sandbox`[​](#sandbox "Direct link to sandbox")

A [`Sandbox`](https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class) instance, typically obtained from [`createSandbox()`](/docs/vercel/create-sandbox).

### `bundleDir`[​](#bundledir "Direct link to bundledir")

The path to your Remotion bundle directory, relative to the current working directory.  
A bundle can be created using the [`npx remotion bundle`](/docs/cli/bundle) command, or using the [`bundle()`](/docs/bundle) API.

## Return value[​](#return-value "Direct link to Return value")

`Promise<void>` — resolves when the bundle has been copied into the sandbox.

## See also[​](#see-also "Direct link to See also")

- [`createSandbox()`](/docs/vercel/create-sandbox)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/vercel/src/add-bundle-to-sandbox.ts)
