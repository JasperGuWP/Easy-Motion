---
title: "deleteService()"
source: https://www.remotion.dev/docs/cloudrun/deleteservice
---

# deleteService()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Deletes a deployed Cloud Run service based on its name.

To retrieve a list of services, call [`getServices()`](/docs/cloudrun/getservices) first.

## Example[​](#example "Direct link to Example")

```tsx
import {deleteService, getServices} from '@remotion/cloudrun';

const services = await getServices({
  region: 'us-east1',
  compatibleOnly: false,
});
for (const service of services) {
  await deleteService({
    region: 'us-east1',
    serviceName: service.serviceName,
  });
}Copy
```

## Arguments[​](#arguments "Direct link to Arguments")

An object with the following properties:

### `region`[​](#region "Direct link to region")

The [GCP region](/docs/cloudrun/region-selection) to which the service was deployed to.

### `serviceName`[​](#servicename "Direct link to servicename")

The name of the service to be deleted.

## Return value[​](#return-value "Direct link to Return value")

Nothing. If the deletion failed, the service rejects with an error.

## See also[​](#see-also "Direct link to See also")

- [Source code for this service](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/delete-service.ts)
- [deployService()](/docs/cloudrun/deployservice)
- [getServices()](/docs/cloudrun/getservices)
