---
title: "registerUsageEvent()"
source: https://www.remotion.dev/docs/licensing/register-usage-event
---

# registerUsageEvent()

Registers a usage point for your Remotion license.  
Allows for accurate and up to date reporting and to track your usage on the Remotion dashboard.

```tsx
Register a usage point

import {registerUsageEvent} from '@remotion/licensing';

await registerUsageEvent({
  licenseKey: 'rm_pub_xxxxx',
  event: 'cloud-render',
  host: 'https://myapp.com',
  succeeded: true,
});Copy
```

## API[​](#api "Direct link to API")

An object with the following properties:

### `licenseKey`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#licensekey "Direct link to licensekey")

Type: `string`

Your Remotion public API key. You can get it from your Remotion.pro dashboard.

### `event`[​](#event "Direct link to event")

Type: `string`

The event you want to register. This can be one of the following:

- `web-render`
- `cloud-render`
- `webcodec-conversion` *(deprecated, use `web-render` instead)*

### `host`[​](#host "Direct link to host")

The domain at here you host your app.  
This should be the value of what `window.location.origin` evaluates to on your frontend.  
If the host is `localhost` or similar, it will be registered as non-billable.

### `succeeded`[​](#succeeded "Direct link to succeeded")

Whether the event was successful or not.  
If the event was not successful, it will be registered as a non-billable event.

## Return value[​](#return-value "Direct link to Return value")

A promise that resolves when the event was successfully registered.

The resolved object contains two properties:

### `billable`[​](#billable "Direct link to billable")

Whether this was an event that should be billed.

### `classification`[​](#classification "Direct link to classification")

Either, `"billable"`, `"development"` or `"failed"`.  
You do not have to pay for failed renders or renders doing development.

## See also[​](#see-also "Direct link to See also")

- [`@remotion/licensing`](/docs/licensing)
- [`getUsage()`](/docs/licensing/get-usage)
