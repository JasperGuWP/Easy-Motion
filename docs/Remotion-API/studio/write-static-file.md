---
title: "writeStaticFile()v4.0.147"
source: https://www.remotion.dev/docs/studio/write-static-file
---

# writeStaticFile()[v4.0.147](https://github.com/remotion-dev/remotion/releases/v4.0.147)

Saves some content into a file in the [`public` directory](/docs/).  
This API is useful for building interactive experiences in the [Remotion Studio](/docs/terminology/studio).

## Examples[​](#examples "Direct link to Examples")

```tsx
Write 'Hello world' to public/file.txt

import React, { useCallback } from "react";
import { writeStaticFile } from "@remotion/studio";

export const WriteStaticFileComp: React.FC = () => {
  const saveFile = useCallback(async () => {
    await writeStaticFile({
      filePath: "file.txt",
      contents: "Hello world",
    });

    console.log("Saved!");
  }, []);

  return <button onClick={saveFile}>Save</button>;
};Copy
```

```tsx
Allow a file upload

import React, { useCallback } from "react";
import { writeStaticFile } from "@remotion/studio";

export const WriteStaticFileComp: React.FC = () => {
  const saveFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];

      await writeStaticFile({
        filePath: file.name,
        contents: await file.arrayBuffer(),
      });

      console.log("Saved!");
    },
    [],
  );

  return <input type="file" onChange={saveFile} />;
};Copy
```

## Rules[​](#rules "Direct link to Rules")

[1](#1)

 This API can only be used while in the Remotion Studio.  

[2](#2)

 The file path must be relative to the [`public` directory](/docs/terminology/public-dir).  

[3](#3)

 It's not allowed to write outside the [`public` directory](/docs/terminology/public-dir).  
[4](#4) To write into subfolders, use forward slashes `/` even
on Windows.
[5](#5) You can pass a `string` or `ArrayBuffer`.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/write-static-file.ts)
- [`staticFile()`](/docs/staticfile)
- [`getStaticFiles()`](/docs/studio/get-static-files)
- [`watchStaticFile()`](/docs/studio/watch-static-file)
