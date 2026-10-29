---
"@hiddenlayerai/hiddenlayer-sdk": major
---

Generate the SDK with Fern. The package name, the `HiddenLayer` client, its environment variables and the model and community scanners stay; Node.js 22 is now the minimum, the scanners' storage SDKs become optional peer dependencies, path parameters move into each method's request object, request and response types move to the `HiddenLayerApi` namespace, client options and errors are renamed, `scans.jobs.list` and `sensors.query` return pages, and every public API in the specification is now covered. [docs/BREAKING_CHANGES_v4.0.0.md](https://github.com/hiddenlayerai/hiddenlayer-sdk-typescript/blob/main/docs/BREAKING_CHANGES_v4.0.0.md) lists every change.
