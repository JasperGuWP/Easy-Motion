---
title: "getUserPolicy()"
source: https://www.remotion.dev/docs/lambda/getuserpolicy
---

# getUserPolicy()

Returns an inline JSON policy to be assigned to the AWS user whose credentials are being used for excuting CLI commands or calling Node.JS functions.

See [Setup tutorial](/docs/lambda/setup) for setting up Lambda from scratch or [User permissions](/docs/lambda/permissions#user-permissions) to see a copy of the current policy file with explanations.

## Example[​](#example "Direct link to Example")

```tsx
import {getUserPolicy} from '@remotion/lambda';

console.log(getUserPolicy()); /* `
{
  "Version": "2012-10-17",
  "Statements": [
    // ...
  ]
}
` */Copy
```

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/iam-validation/suggested-policy.ts)
- [getRolePolicy()](/docs/lambda/getrolepolicy)
- [Permissions](/docs/lambda/permissions)
