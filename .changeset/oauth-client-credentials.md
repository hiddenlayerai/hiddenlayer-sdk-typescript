---
"@hiddenlayerai/hiddenlayer-sdk": minor
---

`HiddenLayerClient` fetches and refreshes its own access token from a client ID and secret, and `HiddenLayer` now uses it

- added: `HiddenLayerClient` takes `clientId` and `clientSecret`, or reads `HIDDENLAYER_CLIENT_ID` and `HIDDENLAYER_CLIENT_SECRET`, and fetches and refreshes its own access token. A `HiddenLayerClient` with neither credentials nor a token now throws when it's constructed; pass `auth: false` for one that sends no `Authorization` header.
- added: client.oauth2.token body field client_id
- added: client.oauth2.token body field client_secret
- changed: `HiddenLayer` now sends the client ID and secret to `/oauth2/token` as form fields rather than Basic auth, and fetches a new access token two minutes before the current one expires rather than 30 seconds. A token that lives two minutes or less is fetched again for every request.
- changed: `HiddenLayer` reads credentials passed in an `auth` object too, after the top-level options, and trims the client ID and secret it's given.
- removed: the `OauthScope` type, an enum of permission names that no method took or returned
