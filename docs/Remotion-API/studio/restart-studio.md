---
title: "restartStudio()v4.0.162"
source: https://www.remotion.dev/docs/studio/restart-studio
---

# restartStudio()[v4.0.162](https://github.com/remotion-dev/remotion/releases/v4.0.162)

```tsx
MyComp.tsx

import { restartStudio } from "@remotion/studio";
import { useCallback } from "react";

const MyComp: React.FC = () => {
  const onClick = useCallback(async () => {
    try {
      await restartStudio();
      console.log("Studio will restart now");
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <button type="button" onClick={onClick}>
      Hello World
    </button>
  );
};Copy
```

## Requirements[​](#requirements "Direct link to Requirements")

In order to use this function:

[1](#1)

 You need to be inside the Remotion Studio.  

[2](#2)

 The Studio must be running (no static deployment)  
  

Otherwise, the function will throw.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/restart-studio.ts)
