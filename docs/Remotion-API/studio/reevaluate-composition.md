---
title: "reevaluateComposition()v4.0.167"
source: https://www.remotion.dev/docs/studio/reevaluate-composition
---

# reevaluateComposition()[v4.0.167](https://github.com/remotion-dev/remotion/releases/v4.0.167)

Re-runs [`calculateMetadata()`](/docs/calculate-metadata) on the currently selected composition.  
This is useful if the function relies on:

- The `public/` folder
- Randomness
- Changing network resources
- Time

## Example[​](#example "Direct link to Example")

```tsx
Re-run calculateMetadata() on the currently selected composition

import React, { useCallback } from "react";
import { reevaluateComposition } from "@remotion/studio";

export const ReevaluateCompositionComp: React.FC = () => {
  const reevaluate = useCallback(async () => {
    reevaluateComposition();

    console.log("Re-evaluated!");
  }, []);

  return <button onClick={reevaluate}>Re-evaluate</button>;
};Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/reevaluate-composition.ts)
- [`calculateMetadata()`](/docs/calculate-metadata)
