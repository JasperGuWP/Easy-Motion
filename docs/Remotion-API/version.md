---
title: "VERSION"
source: https://www.remotion.dev/docs/version
---

# VERSION

You may import this constant to get the current version of Remotion.

Only the version of the [`remotion`](/docs/remotion) package will be reported.  
A [version conflict](/docs/cli/versions) with other Remotion packages cannot be ruled out.

```tsx
Importing VERSION from remotion

import { VERSION } from "remotion";

console.log(VERSION); // "4.0.57";Copy
```

You can also import it from `remotion/version` to avoid importing Remotion and its dependencies (i.e, `react` and `react-dom`):

```tsx
Importing VERSION from remotion/version

import { VERSION } from "remotion/version";

console.log(VERSION); // "4.0.57";Copy
```

## Compatibility[​](#compatibility "Direct link to Compatibility")

|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Browsers Servers Environments|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | Chrome  Firefox  Safari  Node.js  Bun  Serverless Functions  [Client-side rendering](/docs/client-side-rendering)  [Server-side rendering](/docs/ssr)  [Player](/docs/player)  [Studio](/docs/studio) |  |  |  |  |  |  |  |  |  |  | | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |

## See also[​](#see-also "Direct link to See also")

- [Source code for this constant](https://github.com/remotion-dev/remotion/blob/main/packages/core/src/version.ts)
