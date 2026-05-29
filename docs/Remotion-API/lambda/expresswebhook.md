---
title: "expressWebhook()"
source: https://www.remotion.dev/docs/lambda/expresswebhook
---

# expressWebhook()

Simplifies the process of setting up a [Lambda Webhook](/docs/lambda/webhooks) in your Express.js server. See [`pagesRouterWebhook()`](/docs/lambda/pagesrouterwebhook) and [`appRouterWebhook()`](/docs/lambda/approuterwebhook) for doing the same with Next.js apps.

## API[​](#api "Direct link to API")

The function accepts an object with six key-value pairs:

### `secret`[​](#secret "Direct link to secret")

Your webhook secret, must be a `string`

### `testing`[​](#testing "Direct link to testing")

Whether or not to allow requests intending to test the endpoint, useful while using Webhook endpoint tester on [Webhooks Page](/docs/lambda/webhooks). Should be a `boolean`.

### `extraHeaders`[​](#extraheaders "Direct link to extraheaders")

Add your own custom headers to the outgoing response. Provide key-value pairs where both the key and value are strings.

### `onSuccess()`[​](#onsuccess "Direct link to onsuccess")

A function that is called with a [`WebhookSuccessPayload`](/docs/lambda/webhooks#response) object as an argument when the incoming request indicates a successful event.

### `onError()`[​](#onerror "Direct link to onerror")

A function that is called with a [`WebhookErrorPayload`](/docs/lambda/webhooks#response) object as an argument when the incoming request indicates an error.

### `onTimeout()`[​](#ontimeout "Direct link to ontimeout")

A function that is called with a [`WebhookTimeoutPayload`](/docs/lambda/webhooks#response) object as an argument when the incoming request indicates a timeout.

## Example[​](#example "Direct link to Example")

Setting up a webhook endpoint in an Express.js server.

```tsx
server.js

import {expressWebhook} from '@remotion/lambda/client';

const handler = expressWebhook({
  secret: 'mysecret',
  testing: true,
  extraHeaders: {
    region: "south-asia"
  },
  onSuccess: () => console.log('Rendering Completed Successfully'),
  onError: () => console.log('Something went wrong while rendering'),
  onTimeout: () => console.log('Timeout occured while rendering'),
})

router.post("/webhook", jsonParser, handler);

router.options("/webhook", jsonParser, handler);Copy
```

See [Webhooks](/docs/lambda/webhooks) for a detailed example.

## See also[​](#see-also "Direct link to See also")

- [Webhooks](/docs/lambda/webhooks)
- [Source code for this function](https://github.com/remotion-dev/remotion/blob/main/packages/lambda/src/api/express-webhook.ts)
