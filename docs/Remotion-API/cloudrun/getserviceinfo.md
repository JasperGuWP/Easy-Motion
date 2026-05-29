---
title: "getServiceInfo()"
source: https://www.remotion.dev/docs/cloudrun/getserviceinfo
---

# getServiceInfo()

EXPERIMENTAL

Cloud Run is in [Alpha status and not actively being developed.](/docs/cloudrun/status)

Gets information about a service given its name and region.

To get a list of deployed services, use [`getServices()`](/docs/cloudrun/getservices).

To deploy a service, use [`deployService()`](/docs/cloudrun/deployservice).

## Example[​](#example "Direct link to Example")

```tsx
import {getServiceInfo} from '@remotion/cloudrun/client';

const info = await getServiceInfo({
  region: 'us-east1',
  serviceName: 'remotion--3-3-82--mem512mi--cpu1-0--t-500',
});
console.log(info.serviceName); // remotion--3-3-82--mem512mi--cpu1-0--t-500
console.log(info.timeoutInSeconds); // 500
console.log(info.memoryLimit); // "2Gi"
console.log(info.cpuLimit); // "1.0"
console.log(info.remotionVersion); // '4.0.1'
console.log(info.uri); // "https://remotion--3-3-82--mem512mi--cpu1-0--t-500-1a2b3c4d5e-ue.a.run.app"
console.log(info.region); // "us-east1"
console.log(info.consoleUrl); // "https://console.cloud.google.com/run/detail/us-east1/remotion--3-3-82--mem512mi--cpu1-0--t-500/logs"Copy
```

note

Import from [`@remotion/cloudrun/client`](/docs/cloudrun/light-client) to not import the whole renderer, which cannot be bundled.

## Arguments[​](#arguments "Direct link to Arguments")

An object containing the following properties:

### `region`[​](#region "Direct link to region")

The [GCP region](/docs/cloudrun/region-selection) the service resides in.

### `serviceName`[​](#servicename "Direct link to servicename")

The name of the service.

## Return value[​](#return-value "Direct link to Return value")

If the service does not exist, an error is thrown by the GCP SDK.
If the service exists, a promise resolving to an object with the following properties is returned:

### `memoryLimit`[​](#memorylimit "Direct link to memorylimit")

The upper bound on the amount of RAM that the Cloud Run service can consume.

### `cpuLimit`[​](#cpulimit "Direct link to cpulimit")

The maximum number of CPU cores that the Cloud Run service can use to process requests.

### `remotionVersion`[​](#remotionversion "Direct link to remotionversion")

The Remotion version of the service. Remotion is versioning the Cloud Run service and a render can only be triggered from a version of `@remotion/cloudrun` that is matching the one of the service.

### `timeoutInSeconds`[​](#timeoutinseconds "Direct link to timeoutinseconds")

The timeout that has been assigned to the Cloud Run service.

### `uri`[​](#uri "Direct link to uri")

The endpoint of the service.

### `region`[​](#region-1 "Direct link to region-1")

The region of the deployed service.

### `consoleUrl`[​](#consoleurl "Direct link to consoleurl")

A link to the GCP console page for this service. Specifically, a link to logs display.

## See also[​](#see-also "Direct link to See also")

- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/cloudrun/src/api/get-service-info.ts)
- [`getServices()`](/docs/cloudrun/getservices)
- [`deployService()`](/docs/cloudrun/deployservice)
- [`deleteService()`](/docs/cloudrun/deleteservice)
