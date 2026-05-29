---
title: "visualControl()v4.0.292"
source: https://www.remotion.dev/docs/studio/visual-control
---

# visualControl()[v4.0.292](https://github.com/remotion-dev/remotion/releases/v4.0.292)

warning

**Preview feature:** A few issues are known, and filed under this [issue](https://github.com/remotion-dev/remotion/issues/5210).

Creates a control in the right sidebar of the [Remotion Studio](/docs/studio) that allows you to change a value.

Useful for if you have a hardcoded constant that you want to quickly find the optimal value for.

## Example[​](#example "Direct link to Example")

Consider you have a value `rotation` that you want to find the optimal value for:

```tsx
A simple composition

import {useVideoConfig} from 'remotion';

const MyComp: React.FC = () => {
  const rotation = 180;

  return <div style={{rotate: `${rotation}deg`}}>Hello</div>;
};Copy
```

Instead of changing the value of `rotation` in the code, you can create a control in the right sidebar of the [Remotion Studio](/docs/studio) that allows you to change the value:

```tsx
Creating a visual control with the name 'rotation'

import {visualControl} from '@remotion/studio';

const MyComp: React.FC = () => {
  const rotation = visualControl('rotation', 180);

  return <div style={{rotate: `${rotation}deg`}}>Hello</div>;
};Copy
```

Now, in the right sidebar of the [Remotion Studio](/docs/studio), you will see a control with the name `rotation` and a slider to change the value.

Now you can change the value as you please, until you have found the optimal value.

Once you are happy with the value, you can save it back to the code by clicking the save button in the right sidebar.

## Defining a schema[​](#defining-a-schema "Direct link to Defining a schema")

Only primitive values (`string` and `number`) automatically infer the type of the control.

If you want to define a more complex schema, you can do so by passing a Zod schema as the third argument.

```tsx
Editing an object

import {z} from 'zod';

const data = visualControl(
  'my-data',
  {
    rotation: 180,
    text: 'Hello',
  },
  z.object({
    rotation: z.number(),
    text: z.string(),
  }),
);Copy
```

See: [Visual Editing](/docs/visual-editing)

```tsx
Editing a color

import {visualControl} from '@remotion/studio';
import {zColor} from '@remotion/zod-types';

const color = visualControl('my-color', '#fff', zColor());Copy
```

See: [`zColor()`](/docs/zod-types/z-color)

```tsx
Editing a matrix

import {visualControl} from '@remotion/studio';
import {zMatrix} from '@remotion/zod-types';

const matrix = visualControl('my-matrix', [1, 2, 3, 4], zMatrix());Copy
```

See: [`zMatrix()`](/docs/zod-types/z-matrix)

## When to use[​](#when-to-use "Direct link to When to use")

- If you want to create configuration options, use the [Props Editor](/docs/visual-editing).
- If you want to quickly find the optimal value for a hardcoded constant, use `visualControl()`.

## Important to know[​](#important-to-know "Direct link to Important to know")

[1](#1)

 The saving feature works only if the first argument of the `visualControl()` function is static, because static analysis is performed on the source file. The following will not work:

```tsx
❌ This is not possible

// ❌ Not possible to use string interpolation
const name = 'my-data';
const data = visualControl(`rotation-${name}`, 180);

// ❌ Not possible to use a variable
const idOutside = 'rotation-my-data';
const dataOutside = visualControl(idOutside, 180);Copy
```

[2](#2)

 Controls may not be automatically remove themselves when you remove them from your code.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/studio/src/api/visual-control.ts)
