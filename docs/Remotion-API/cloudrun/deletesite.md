---
title: "deleteSite()"
source: https://www.remotion.dev/docs/cloudrun/deletesite
---

# deleteSite()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Removes a Remotion project from your Cloud Storage bucket.

Each project is located in the `sites/` subdirectory of your Cloud Storage bucket. Calling this function is equivalent of deleting all files inside a subfolder of your `sites/` subdirectory.

## Example[​](#example "Direct link to Example")

Gets all sites and deletes them.

```tsx
import {GcpRegion, deleteSite, getSites} from '@remotion/cloudrun';

const region: GcpRegion = 'australia-southeast1';

const {sites} = await getSites(region);

for (const site of sites) {
  await deleteSite({
    bucketName: site.bucketName,
    siteName: site.id,
  });
  console.log(`Site ${site.id} deleted.`);
}Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `bucketName`[​](#bucketname "Direct link to bucketname")

*string*

The name of the Cloud Storage bucket in which your site resides in.

### `siteName`[​](#sitename "Direct link to sitename")

*string*

The unique ID of the project you want to delete.

## Return value[​](#return-value "Direct link to Return value")

A promise resolving nothing.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/delete-site.ts)
- [getSites()](/docs/cloudrun/getsites)
- [deploySite()](/docs/cloudrun/deploysite)
