---
title: "getRegions()"
source: https://www.remotion.dev/docs/cloudrun/getregions
---

# getRegions()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Gets an array of all supported GCP regions of this release of Remotion Cloud Run.

## Example[​](#example "Direct link to Example")

```tsx
const regions = getRegions();
// ["asia-east1", "us-east1"]Copy
```

note

Import from [`@remotion/cloudrun/client`](/docs/cloudrun/light-client) to not import the whole renderer, which cannot be bundled.

## Return value[​](#return-value "Direct link to Return value")

An array of supported regions by this release of Remotion Cloud Run.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/get-regions.ts)
- [Region selection](/docs/cloudrun/region-selection)
