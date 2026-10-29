# HiddenLayer TypeScript API Library

[![NPM version](<https://img.shields.io/npm/v/@hiddenlayerai/hiddenlayer-sdk.svg?label=npm%20(stable)>)](https://npmjs.org/package/@hiddenlayerai/hiddenlayer-sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@hiddenlayerai/hiddenlayer-sdk)

This library provides access to the HiddenLayer REST API from server-side TypeScript or JavaScript. The REST API documentation is on [dev.hiddenlayer.ai](https://dev.hiddenlayer.ai); every method of this library is in [reference.md](reference.md).

Upgrading from 3.x? [docs/BREAKING_CHANGES_v4.0.0.md](docs/BREAKING_CHANGES_v4.0.0.md) lists every change.

## Installation

```sh
npm install @hiddenlayerai/hiddenlayer-sdk
```

## Usage

```ts
import { HiddenLayer } from "@hiddenlayerai/hiddenlayer-sdk";

const client = new HiddenLayer({
    environment: "prod-eu", // defaults to "prod-us"
});

const response = await client.interactions.analyze({
    metadata: { model: "gpt-5", requester_id: "user-1234", provider: "openai" },
});
```

### Credentials

The client authenticates with the first of these it finds, options before the environment:

1. `token` in the options: sent as a bearer token.
2. `clientId` and `clientSecret` in the options: exchanged for an access token, which the client reuses until shortly before it expires.
3. The `HIDDENLAYER_TOKEN` environment variable.
4. The `HIDDENLAYER_CLIENT_ID` and `HIDDENLAYER_CLIENT_SECRET` environment variables.

With none of them, requests fail with a `HiddenLayerError`. For a deployment that takes unauthenticated requests, pass `auth: false`.

### Environments

`environment` takes a region by name, `"prod-us"` or `"prod-eu"`, or a `HiddenLayerEnvironment` value. `baseUrl` overrides it with any URL. With neither option, the client uses `HIDDENLAYER_BASE_URL` if it is set, and `prod-us` otherwise.

## Model scanning

```ts
const report = await client.modelScanner.scanFile({
    modelName: "my-model",
    modelPath: "./models/model.pkl",
});
console.log(report.summary.severity);
```

`client.modelScanner` also has `scanFolder`, `scanS3Model`, `scanAzureBlobModel` and `scanHuggingFaceModel`; `client.communityScanner.communityScan` scans a model the scanner fetches from a remote location. Each waits for the scan to finish unless you pass `waitForResults: false`.

The S3, Azure Blob Storage and Hugging Face scans use `@aws-sdk/client-s3`, `@azure/storage-blob` and `@huggingface/hub`. They are optional peer dependencies, so no package manager installs them with the SDK: install the ones for the scans you run, for example `npm install @aws-sdk/client-s3`. Each is loaded only by the scan that needs it, and a scan whose SDK is missing throws an error naming the package.

## Request and response types

Every request and response type is in the `HiddenLayerApi` namespace:

```ts
import { type HiddenLayerApi } from "@hiddenlayerai/hiddenlayer-sdk";

const request: HiddenLayerApi.InteractionsRequest = {
    metadata: { model: "gpt-5", requester_id: "user-1234", provider: "openai" },
};
const response: HiddenLayerApi.EnrichedResponse = await client.interactions.analyze(request);
```

## Handling errors

A non-success status code throws a `HiddenLayerError`, or the subclass the API declares for that status, such as `HiddenLayerApi.NotFoundError`:

```ts
import { HiddenLayerError } from "@hiddenlayerai/hiddenlayer-sdk";

try {
    await client.sensors.retrieve({ sensor_id: "unknown" });
} catch (err) {
    if (err instanceof HiddenLayerError) {
        console.log(err.statusCode, err.body);
    }
}
```

A request that times out throws `HiddenLayerTimeoutError`.

## Pagination

List methods return a `Page`. `for await` walks every item across pages:

```ts
for await (const sensor of await client.sensors.query({ filter: { active: true } })) {
    console.log(sensor.sensor_id);
}
```

`page.data` holds the current page's items, and `page.hasNextPage()` and `page.getNextPage()` move through pages by hand.

## Retries and timeouts

408, 429 and 5xx responses are retried twice by default, with exponential backoff. Requests time out after 60 seconds. Both can be set for the client or per request:

```ts
const client = new HiddenLayer({ maxRetries: 0, timeoutInSeconds: 20 });

await client.sensors.retrieve({ sensor_id: "..." }, { maxRetries: 5, timeoutInSeconds: 5 });
```

## Raw responses

```ts
const { data, rawResponse } = await client.sensors.retrieve({ sensor_id: "..." }).withRawResponse();
console.log(rawResponse.headers.get("x-request-id"));
```

## Beta APIs

Some HiddenLayer APIs are marked **Beta**: not yet generally available or production ready. They can be used in production at your own risk; see the [Beta API Guidelines](https://dev.hiddenlayer.ai/docs/beta-api-faq).

- HiddenLayer makes no compatibility guarantees for Beta APIs. Breaking changes may occur at any time.
- Changes to Beta APIs don't count towards this package's semantic version.
- The first call to each beta endpoint logs a `console.warn`, once per process.

## Requirements

Node.js 22 or later, and TypeScript 4.9 or later. The package ships CommonJS and ESM builds.

## Versioning and changelog

Releases follow [SemVer](https://semver.org/spec/v2.0.0.html), apart from Beta APIs. [CHANGELOG.md](CHANGELOG.md) lists each release.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). A pull request that changes `src/` needs a changeset: run `npx changeset` and describe the change for the changelog.
