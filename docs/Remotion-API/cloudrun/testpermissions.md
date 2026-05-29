---
title: "testPermissions()"
source: https://www.remotion.dev/docs/cloudrun/testpermissions
---

# testPermissions()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Makes a call to the [Test Iam Permissions](https://cloud.google.com/resource-manager/reference/rest/v3/projects/testIamPermissions) method of the Resource Manager API in GCP, which returns the list of permissions the Service Account has on the GCP Project. This is then validated against the list of permissions required for the version of Remotion.

The CLI equivalent is `npx remotion cloudrun permissions`.

The function does not reject with an error if a permission is missing, rather the missing permission is indicated in the return value.

## Example[​](#example "Direct link to Example")

```tsx
import {testPermissions} from '@remotion/cloudrun';

const {results} = await testPermissions();

for (const result of results) {
  console.log(result.decision); // "allowed"
  console.log(result.permissionName); // "iam.serviceAccounts.actAs"
}Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following property:

### `onTest?`[​](#ontest "Direct link to ontest")

A callback function that gets called every time a new test has been executed. This allows you to react to new test results coming in much faster than waiting for the return value of the function. Example:

```tsx
import {testPermissions} from '@remotion/cloudrun';

const {results} = await testPermissions({
  onTest: (result) => {
    console.log(result.decision); // "allowed"
    console.log(result.permissionName); // "iam.serviceAccounts.actAs"
  },
});Copy
```

## Return value[​](#return-value "Direct link to Return value")

**An array of objects** containing simulation results of each necessary permission. The objects contain the following keys:

### `decision`[​](#decision "Direct link to decision")

Either `true` or `false`.

### `permissionName`[​](#permissionname "Direct link to permissionname")

The identifier of the required permission. See the [Permissions page](/docs/cloudrun/permissions) to see a list of required permissions.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/iam-validation/testPermissions.ts)
- [Permissions](/docs/cloudrun/permissions)
