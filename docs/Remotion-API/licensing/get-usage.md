---
title: "getUsage()"
source: https://www.remotion.dev/docs/licensing/get-usage
---

# getUsage()

Allows you to get the current usage of your Remotion license.  
This requires your secret key that you can obtain from the remotion.pro dashboard.

You should only call this API from the backend to avoid exposing your secret key to the client.

```tsx
Get the current usage of your license

import {getUsage} from '@remotion/licensing';

const usage = await getUsage({
  licenseKey: 'rm_sec_xxxxx',
  since: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
});

console.log(usage);
/*
{
  "webRenders": {
    "billable": 10,
    "development": 5,
    "failed": 2
  },
  "cloudRenders": {
    "billable": 10,
    "development": 5,
    "failed": 2
  },
}
*/Copy
```

## API[​](#api "Direct link to API")

An object with the following properties:

### `licenseKey`[v4.0.409](https://github.com/remotion-dev/remotion/releases/v4.0.409)[​](#licensekey "Direct link to licensekey")

Type: `string`

Your Remotion license key. You can get it from your Remotion.pro dashboard.

### `since`[​](#since "Direct link to since")

Type: `number`

The timestamp since when you want to get the usage.  
The default is since the beginning of the current month in UTC.  
The lowest timestamp you can use is 90 days ago (`Date.now() - 90 * 24 * 60 * 60 * 1000`).

### ~~`apiKey`~~[​](#apikey "Direct link to apikey")

*deprecated in v4.0.409*

Type: `string`

Your Remotion secret API key. You can get it from your Remotion.pro dashboard.

## Return value[​](#return-value "Direct link to Return value")

An object with the following properties:

### `webRenders`[v4.0.428](https://github.com/remotion-dev/remotion/releases/v4.0.428)[​](#webrenders "Direct link to webrenders")

An object with the following properties:

- `billable`: The number of billable web renders.
- `development`: The number of development web renders (on `localhost` or other local environments).
- `failed`: The number of failed web renders (you don't need to pay for them).

### ~~`webcodecConversions`~~[​](#webcodecconversions "Direct link to webcodecconversions")

*deprecated - use `webRenders` instead*

Same as `webRenders`.

### `cloudRenders`[​](#cloudrenders "Direct link to cloudrenders")

An object with the following properties:

- `billable`: The number of billable cloud renders.
- `development`: The number of development cloud renders.
- `failed`: The number of failed cloud renders.

## See also[​](#see-also "Direct link to See also")

- [`@remotion/licensing`](/docs/licensing)
- [`registerUsageEvent()`](/docs/licensing/register-usage-event)
