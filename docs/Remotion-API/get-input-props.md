---
title: "getInputProps()"
source: https://www.remotion.dev/docs/get-input-props
---

# getInputProps()

[v2.0](https://github.com/remotion-dev/remotion/releases/v2.0)

Using this method, you can retrieve inputs that you pass in from the command line using [`--props`](/docs/cli), or the [`inputProps`](/docs/ssr) parameter if you are using the Node.JS APIs ([`renderMedia()`](/docs/renderer/render-media), [`renderMediaOnLambda()`](/docs/lambda/rendermediaonlambda)).

This method is useful if you want to retrieve the input props in the [root component](/docs/terminology/root-file).

This method is not available when inside a [`<Player>`](/docs/player) or [when client-side rendering](/docs/miscellaneous/render-in-browser). Instead, get the props as React props from the component you passed as the `component` prop to the player.

## You might not need this API[​](#you-might-not-need-this-api "Direct link to You might not need this API")

Prefer the following ways of getting your input props:

- A component that was rendered as a [composition](/docs/composition) will retrieve the input props as regular props.
- In the [root component](/docs/terminology/root-file), you can get the input props by using the [`calculateMetadata()`](/docs/calculate-metadata) function.

In both cases, you can type the props, which is better than using this API which returns a non-typesafe object.

## API[​](#api "Direct link to API")

Pass in a [parseable](/docs/cli) JSON representation using the `--props` flag to either `remotion studio` or `remotion render`:

```tsx
npx remotion render --props='{"hello": "world"}'Copy
```

To simulate how it behaves, you can also pass props when using the Remotion Studio:

```tsx
npx remotion studio --props='{"hello": "world"}'Copy
```

You may also specify a file containing JSON and Remotion will parse the file for you:

```tsx
npx remotion render --props=./path/to/props.jsonCopy
```

You can then access the props anywhere in your Remotion project:

```tsx
export const Root: React.FC = () => {
  const {hello} = getInputProps(); // "world"

  return <Composition {...config} />;
};Copy
```

In this example, the props also get passed to the component of the composition with the id `my-composition`.

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | No-op, returns {}  No-op, returns {}  No-op, returns {}  No-op, returns {}  No-op, returns {}   | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/config/input-props.ts)
- [Dynamic duration, FPS & dimensions](/docs/dynamic-metadata)
