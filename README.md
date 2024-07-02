# HiddenLayer SDK TypeScript (Beta)

HiddenLayer SDK Typescript is a library that provides a set of tools to interact with the HiddenLayer API. It is written in TypeScript and can be used in both Node.js and browser environments.

## Contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [Code examples](#code-examples)
- [Interface stability](#interface-stability)

## Installation

To install the HiddenLayer SDK for TypeScript, use the following commands:

```
npm install @hiddenlayerai/hiddenlayer-sdk
```

## Getting Started

Once you've installed the HiddenLayer package, you can instantiate the `HiddenLayerServiceClient` for the SaaS platform as follows:

```typescript
import { HiddenLayerServiceClient } from './hiddenlayer/HiddenLayerServiceClient';

const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';

const client = HiddenLayerServiceClient.createSaaSClient(clientId, clientSecret);
```

If you are using the Enterprise version of the production, you can instantiate the `HiddenLayerServiceClient` as follows:

```typescript
const host = 'https://your.hiddenlayer.enterprise.test';

const client = HiddenLayerServiceClient.createEnterpriseClient(host);
```

### Scanning Models

```typescript
const modelName = 'YOUR_MODEL';
const modelPath = 'path/to/model/file.pkl';
const results = await client.modelScanner.scanFile(modelName, modelPath);
```

## Code Examples

Code examples can be found in the repo [here](./examples).

## Interface Stability

HiddenLayer is actively working on stabilizing the HiddenLayer SDK for TypeScript. You are highly encouraged to pin the exact dependency version.