# Reference
## EulaResponses
<details><summary><code>client.eulaResponses.<a href="/src/api/resources/eulaResponses/client/Client.ts">self</a>() -> HiddenLayer.SelfEulaResponsesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves the current EULA acceptance status for the authenticated user's tenant, including the version responded to and when it was last updated.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.eulaResponses.self();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `EulaResponsesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Credentials
<details><summary><code>client.credentials.<a href="/src/api/resources/credentials/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.ListCredentialsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Lists all API credentials for the requester's tenant. API credentials can be used to authenticate automated processes and integrations with the HiddenLayer API. The list includes both active and inactive credentials, along with their associated metadata. If the `embed` parameter is used with `created_by_user`, the response will also include details about the user who created each credential. The response includes up to 1000 items.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.credentials.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.ListCredentialsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CredentialsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.credentials.<a href="/src/api/resources/credentials/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.CredentialsWithSecret</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new API credential for authenticating automated processes and integrations with the HiddenLayer API. The credential consists of an immutable client ID and client secret pair.

If no expiry is provided, the credential will automatically expire one year from creation. In accordance with standard industry best practices, it is not recommended to set an expiration date-time more than 365 days in the future.
If an expiration date is set more than 365 days in the future, the request will be rejected with a 422 Unprocessable Entity response.

By default, if no permissions are specified, the credential will be granted all available permissions. To restrict the credential to specific permissions, provide a list of permission identifiers (scopes).
The available permissions can be found by calling [`GET /api/v2/permissions`](#operation/list_permissions_api_v2_permissions_get).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.credentials.create({
    name: "some-name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.CredentialsCreateRequestV2` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CredentialsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.credentials.<a href="/src/api/resources/credentials/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently deletes an API credential. Once deleted, the credential can no longer be used to authenticate with the HiddenLayer API.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.credentials.delete({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.DeleteCredentialsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CredentialsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Permissions
<details><summary><code>client.permissions.<a href="/src/api/resources/permissions/client/Client.ts">list</a>() -> HiddenLayer.ListPermissionsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Gets a list of valid permissions that can be assigned to users or API credentials.

HiddenLayer permissions follow a `{area}:{action}` format, where:
- The area name uses kebab-case (e.g., `model-version`)
- The action specifies what can be done with the resource area (e.g., r/read, w/write, or d/delete)
- Area and action are separated by a colon (:)

Hypothetical Example: `model-version:read` would grant permission to read model versions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.permissions.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `PermissionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Roles
<details><summary><code>client.roles.<a href="/src/api/resources/roles/client/Client.ts">list</a>() -> HiddenLayer.ListRolesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get a list of roles that can be assigned to users. The platform provides several predefined roles, each with its own set of permissions:

**Admin**
- Full system access with broad privileges
- Can manage integrations, model assets, detections, and users
- Has create, delete, edit, and configuration capabilities

**Analyst**
- Focused on model scanning and detection workflows
- Can submit and update scan results
- Can review details, add notes, and close detections

**Viewer**
- Read-only access to system resources
- Can view assets, results, models, and detections
- Cannot create, edit, or delete resources

**User Admin**
- Specialized in user management
- Can create, edit, and delete users
- Limited to user administration tasks

Note: Some resources are restricted to specific service integrations and are not accessible through these roles.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.roles.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `RolesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Users
<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">list</a>() -> HiddenLayer.ListUsersResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns all users belonging to the authenticated user's tenant. The response includes up to 1000 items. **Deprecated** — use [List Users (paginated)](#tag/Users/operation/list_users_access_v2_users_get) instead.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.CreateUsersResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new user in the tenant. The user's email address must be unique within the tenant.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.create({});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.UserRequestBody` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetUsersResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves details for the specified user.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.get({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.GetUsersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.User</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates details for the specified user. The user's email address must remain unique within the tenant.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.update({
    id: "00000000-0000-0000-0000-000000000000",
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.UpdateUsersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Permanently removes the specified user from the tenant.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.delete({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.DeleteUsersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">reset</a>({ ...params }) -> HiddenLayer.ResetUsersResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Initiates a password reset for the specified user by sending a password reset email.
The user must complete the reset workflow themselves via the link in the email.
The `password` field in the response is deprecated and included only for backwards compatibility.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.reset({
    email: "email"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.ResetUsersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">me</a>() -> HiddenLayer.MeUsersResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieves profile and role details for the currently authenticated user.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.me();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Oauth2
<details><summary><code>client.oauth2.<a href="/src/api/resources/oauth2/client/Client.ts">token</a>({ ...params }) -> HiddenLayer.AccessToken</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Exchanges the Client ID and Client Secret of an [API credential](#operation/create_credentials_api_v2_credentials_post) for an access token, using the OAuth2 client credentials grant. Send the Client ID and Client Secret as the HTTP Basic username and password.

Send the token as `Authorization: Bearer <access_token>` on every other request. It expires `expires_in` seconds after it is issued, so request a new one before then.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.oauth2.token({
    grant_type: "client_credentials"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.AccessTokenRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Oauth2Client.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## SsoIntegrations
<details><summary><code>client.ssoIntegrations.<a href="/src/api/resources/ssoIntegrations/client/Client.ts">list</a>() -> HiddenLayer.ListSsoIntegrationsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the list of SSO integrations associated with the requester's tenant. The results will be sorted by age in descending order (i.e. newest to oldest).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.ssoIntegrations.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `SsoIntegrationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.ssoIntegrations.<a href="/src/api/resources/ssoIntegrations/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.SsoIntegrationSamlV2</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates an SSO integration record that can be used to authenticate users with HiddenLayer. SSO integrations
cannot be enabled until all required information is populated to form a trusted connection between the HiddenLayer
and the Identity Provider (IdP).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.ssoIntegrations.create({
    type: "saml_v2",
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SsoIntegrationsCreateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SsoIntegrationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.ssoIntegrations.<a href="/src/api/resources/ssoIntegrations/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.SsoIntegrationSamlV2</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get SSO Integration
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.ssoIntegrations.get({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.GetSsoIntegrationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SsoIntegrationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.ssoIntegrations.<a href="/src/api/resources/ssoIntegrations/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.SsoIntegrationSamlV2</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates an existing SSO integration record that can be used to authenticate users with HiddenLayer. SSO integrations
cannot be enabled until all required information is populated to form a trusted connection between the HiddenLayer
and the Identity Provider (IdP).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.ssoIntegrations.update({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SsoIntegrationsUpdateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SsoIntegrationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Interactions
<details><summary><code>client.interactions.<a href="/src/api/resources/interactions/client/Client.ts">analyze</a>({ ...params }) -> HiddenLayer.EnrichedResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Performs a detailed security analysis of the input and/or output of LLM interactions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.interactions.analyze({
    "HL-Project-Id": "internal-search-chatbot",
    metadata: {
        model: "gpt-5",
        requester_id: "user-1234",
        provider: "openai"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.InteractionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `InteractionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PromptAnalyzer
<details><summary><code>client.promptAnalyzer.<a href="/src/api/resources/promptAnalyzer/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.HiddenLayerPromptAnalyzerResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Analyze LLM Prompt and Response
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.promptAnalyzer.create({
    "HL-Project-Id": "internal-search-chatbot",
    prompt: "Hello World",
    output: "Hello, how can I help you today?",
    model: "mistral-tiny"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.PromptAnalyzerRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PromptAnalyzerClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Runtime
<details><summary><code>client.runtime.<a href="/src/api/resources/runtime/client/Client.ts">evaluateInteraction</a>({ ...params }) -> HiddenLayer.InteractionEvaluationResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Performs synchronous security evaluation on an LLM **interaction**. The
interaction can be a standalone user prompt, a standalone model response,
a partial exchange, or a long multi-turn message history. The endpoint 
imposes no requirement that the messages form a complete request/response pair.

The request carries `metadata` and an `interaction` payload. The `interaction`
field accepts either:

- the **canonical**, provider-agnostic form (`CanonicalInteraction`) —
  an ordered sequence of messages (user, assistant, system, tool) with their
  role and content parts, and optionally the tool catalog that was in scope; or
- a **native LLM-provider payload** passed through verbatim. Supported
  provider formats:
  - [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
  - [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
  - [Anthropic Messages](https://docs.anthropic.com/en/api/messages)

Returns the evaluation context (`evaluated_interaction`): the canonicalized messages
with per-message signals and findings attached. Also returns the policy
outcome, which carries the enforcement action, threat level, any detections,
and the effective payload the caller should forward (`outcome.effective_interaction`).

Use this endpoint when you need full evaluation results. For inline pass-through
(provider request/response payloads returned in the same provider format), use
the request-evaluations and response-evaluations endpoints instead.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.runtime.evaluateInteraction({
    "HL-Project-Id": "internal-search-chatbot",
    metadata: {
        model: "gpt-4-turbo",
        requester_id: "user-12345",
        provider: "openai",
        external_session_id: "sess_4b8cde94604f4c389406a0b2f806069a"
    },
    interaction: {
        messages: [{
                role: "user",
                content: [{
                        type: "text",
                        text: "Hello, how can I help you today?"
                    }]
            }, {
                role: "assistant",
                content: [{
                        type: "text",
                        text: "Hello, how can I help you today?"
                    }]
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.InteractionEvaluationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuntimeClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.runtime.<a href="/src/api/resources/runtime/client/Client.ts">evaluateRequest</a>({ ...params }) -> HiddenLayer.ProviderPayload</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Analyzes an LLM request payload for security threats before it is sent to the model.

Accepts any valid provider request payload and returns:
- If detect or redact action: the request payload (potentially modified) in the provider's request format
- If block action: a canned block message in the provider's response format

If the project is in monitor mode, the endpoint does not block or redact. It returns the
request payload unchanged.

Use this endpoint inline in your LLM pipeline to evaluate prompts before they reach the model.

Supported provider formats:
- [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
- [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
- [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.runtime.evaluateRequest({
    "HL-Project-Id": "internal-search-chatbot",
    "HL-Runtime-Session-Id": "sess_4b8cde94604f4c389406a0b2f806069a",
    body: {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "What is the capital of France?"
            }
        ],
        "max_tokens": 1000,
        "temperature": 0.7
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.EvaluateRequestRuntimeRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuntimeClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.runtime.<a href="/src/api/resources/runtime/client/Client.ts">evaluateResponse</a>({ ...params }) -> HiddenLayer.ProviderPayload</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Analyzes an LLM response payload for security threats after it is received from the model.

Accepts any valid provider response payload and returns:
- If detect or redact action: the response payload (potentially modified) in the provider's response format
- If block action: a canned block message in the provider's response format

If the project is in monitor mode, the endpoint does not block or redact. It returns the
response payload unchanged.

Use this endpoint inline in your LLM pipeline to evaluate model outputs before returning them to users.

Supported provider formats:
- [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat)
- [OpenAI Responses](https://platform.openai.com/docs/api-reference/responses)
- [Anthropic Messages](https://docs.anthropic.com/en/api/messages)
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.runtime.evaluateResponse({
    "HL-Project-Id": "internal-search-chatbot",
    "HL-Runtime-Session-Id": "sess_4b8cde94604f4c389406a0b2f806069a",
    body: {
        "id": "chatcmpl-abc123",
        "object": "chat.completion",
        "created": 1704067200,
        "model": "gpt-4",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "The capital of France is Paris."
                },
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": 25,
            "completion_tokens": 10,
            "total_tokens": 35
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.EvaluateResponseRuntimeRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuntimeClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Sensors
<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.SensorSorItemResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sensors.create({
    plaintext_name: "plaintext_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SensorSorItemCreateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">retrieve</a>({ ...params }) -> HiddenLayer.SensorSorItemResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sensors.retrieve({
    sensor_id: "sensor_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.RetrieveSensorsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.SensorSorUpdateResponseModel</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sensors.update({
    sensor_id: "sensor_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SensorSorItemUpdateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.sensors.delete({
    sensor_id: "sensor_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.DeleteSensorsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">queryLegacy</a>({ ...params }) -> core.Page&lt;HiddenLayer.SensorSorItemResponse, HiddenLayer.SensorSorQueryResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.sensors.queryLegacy({});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.sensors.queryLegacy({});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SensorSorQueryRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.sensors.<a href="/src/api/resources/sensors/client/Client.ts">query</a>({ ...params }) -> core.Page&lt;HiddenLayer.SensorSorItemResponse, HiddenLayer.SensorSorQueryResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

⚠️ **DEPRECATED**: This endpoint will be removed after April 13, 2026.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.sensors.query({});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.sensors.query({});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SensorSorQueryRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SensorsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Models
<details><summary><code>client.models.<a href="/src/api/resources/models/client/Client.ts">retrieve</a>({ ...params }) -> HiddenLayer.SensorSorModel</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.retrieve({
    model_id: "model_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.RetrieveModelsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ModelsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.<a href="/src/api/resources/models/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.delete({
    model_id: "model_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.DeleteModelsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ModelsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.<a href="/src/api/resources/models/client/Client.ts">list</a>() -> HiddenLayer.SensorSorModel[]</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ModelsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.<a href="/src/api/resources/models/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.UpdateModelsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.update([{
        name: "loan application",
        source: "azure"
    }]);

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.SensorSorModel[]` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ModelsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Access ApiKeys
<details><summary><code>client.access.apiKeys.<a href="/src/api/resources/access/resources/apiKeys/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.StaticApiKey, HiddenLayer.ListApiKeysResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.access.apiKeys.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.access.apiKeys.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.ListApiKeysRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeysClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.access.apiKeys.<a href="/src/api/resources/access/resources/apiKeys/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.StaticApiKeyWithValue</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Prefer [API credentials](#operation/create_credentials_api_v2_credentials_post), which trade a client ID and secret for short-lived OAuth2 access tokens. Reserve Static API Keys for integrations that cannot easily support OAuth2.

A tenant can have at most 100 keys that are neither revoked nor retired, including keys with no active secret.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.apiKeys.create({
    name: "ci-pipeline"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.StaticApiKeyCreateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeysClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.access.apiKeys.<a href="/src/api/resources/access/resources/apiKeys/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.StaticApiKey</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.apiKeys.get({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.GetApiKeysRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeysClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.access.apiKeys.<a href="/src/api/resources/access/resources/apiKeys/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Revokes the key and all its secrets. Revoking a key that is already revoked returns `204`, whatever the `If-Match` value.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.apiKeys.delete({
    "If-Match": "\"7da7a728-f910-11e6-942a-68f728c1ba70\"",
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.DeleteApiKeysRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApiKeysClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Access Users
<details><summary><code>client.access.users.<a href="/src/api/resources/access/resources/users/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.User, HiddenLayer.ListUsersResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the list of users belonging to the authenticated user's tenant. Use the `cursor` parameter to navigate through pages of results. Replaces the deprecated `GET /api/v2/users` endpoint.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.access.users.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.access.users.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.ListUsersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UsersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Access Permissions
<details><summary><code>client.access.permissions.<a href="/src/api/resources/access/resources/permissions/client/Client.ts">list</a>() -> HiddenLayer.ListPermissionsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns permissions grouped by platform area, ready for rendering in a UI permission selector.

Use this endpoint when building interfaces that let users choose permissions — for example,
an API key creation modal. Each area group represents a platform capability (such as **AI Portfolio**
or **Runtime Security**) and contains the individual permission area elements — and the permissions
available on each — within it.

If you need a flat list of all permissions, use
[`GET /api/v2/permissions`](#operation/list_permissions_api_v2_permissions_get) instead.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.permissions.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `PermissionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Access Tokens
<details><summary><code>client.access.tokens.<a href="/src/api/resources/access/resources/tokens/client/Client.ts">shortLived</a>() -> HiddenLayer.ShortLivedTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Exchange a valid user access token for a short-lived JWT with minimal scopes. This endpoint is suitable for scenarios where a long-lived or broad-scope token is inappropriate. A typical use case is authenticating WebSocket connections, where the token may be passed via query parameters.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.tokens.shortLived();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `TokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Access ApiKeys Secrets
<details><summary><code>client.access.apiKeys.secrets.<a href="/src/api/resources/access/resources/apiKeys/resources/secrets/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.StaticApiKeySecretWithValue</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Adds a secret to the key. Existing secrets keep working until they are revoked or expire.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.apiKeys.secrets.create({
    "If-Match": "\"7da7a728-f910-11e6-942a-68f728c1ba70\"",
    id: "00000000-0000-0000-0000-000000000000",
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.apiKeys.CreateSecretsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecretsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.access.apiKeys.secrets.<a href="/src/api/resources/access/resources/apiKeys/resources/secrets/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Revokes only this secret; the key and its other secret keep working. Revoking a secret that is already revoked or expired, or whose key is revoked, returns `204`, whatever the `If-Match` value.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.access.apiKeys.secrets.delete({
    "If-Match": "\"7da7a728-f910-11e6-942a-68f728c1ba70\"",
    id: "00000000-0000-0000-0000-000000000000",
    secret_id: "01n1adc0r38r9n4m5p6t7w8x9y"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.access.apiKeys.DeleteSecretsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecretsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Assets
<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">listV1</a>({ ...params }) -> HiddenLayer.ListV1AssetsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.listV1({
    sort: "+discovered_at"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ListV1AssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">getV1</a>({ ...params }) -> HiddenLayer.AiAsset</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.getV1({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GetV1AssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">graph</a>({ ...params }) -> HiddenLayer.AiAssetInventoryV1AssetGraphNode</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.graph({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GraphAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">filtersV1</a>() -> HiddenLayer.FiltersV1AssetsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the available filter fields and their values. Tag names are included as a filter field.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.filtersV1();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">tagsV1</a>({ ...params }) -> HiddenLayer.AiAssetInventoryV1AssetTagMap</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns all custom and discovered tags assigned to the given asset.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.tagsV1({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.TagsV1AssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.Asset, HiddenLayer.ListAssetsResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Search and list the AI assets in your inventory. Provide a
full-text search query with `q`, and optionally narrow the
results with the available filters such as provider, cloud
account, region, service, asset type, policy status, tags
(`tag_name`, `tag_def`, and `tag`), relationship to another
asset (`related_to`), membership in a project (`project_id`),
and — for MODEL assets — the model id
(`model_id`), model name (`model_name`), or the latest scan's
start time (`scan_started_at`).
Results are returned in cursor-paginated pages of `page_size`
items; follow the `next` cursor to retrieve subsequent pages.
See the `sort` parameter for available sort fields. Filtering by
`project_id` or embedding `projects` additionally requires the
`project:read` scope.

To discover the filterable fields and their available values for
your tenant, call
[`GET /asset-inventory/v2/assets/filters`](/api/assets-and-integrations/ai-asset-inventory/v2/ai-asset-inventory/inventory/get_ai_asset_filters_v2).

The underlying query runs under a configurable server-side
statement timeout. A filter or sort combination expensive
enough to exceed it — typically an arbitrary-attribute filter or
sort over a very large tenant — receives `422 Unprocessable
Entity` with a "query exceeds allowed cost/time limit" message
suggesting index-backed sort fields to retry with.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.assets.list({
    page_size: 50,
    sort: "-created_at"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.assets.list({
    page_size: 50,
    sort: "-created_at"
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ListAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">suggestions</a>({ ...params }) -> HiddenLayer.SuggestionsAssetsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Return typeahead suggestions for a partial search term, to help
build asset search queries as the user types. The same filters
available on the asset list endpoint can be applied to scope the
suggestions. Filtering by `project_id` additionally requires the
`project:read` scope.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.suggestions({
    q: "q"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.SuggestionsAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">filters</a>({ ...params }) -> HiddenLayer.FilterFacetsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Return the filterable fields of the
[asset list endpoint](/api/assets-and-integrations/ai-asset-inventory/v2/ai-asset-inventory/inventory/list_ai_assets_v2)
together with their available values for your tenant, for
building a filter UI. Each facet identifies the exact list
filter it maps to: apply a selection by sending the facet's
`param` with the chosen `values` to
`GET /asset-inventory/v2/assets` — no field-name translation
layer required.

- **Unscoped** (no parameters) — returns the service-independent
  facets: `asset_type`, `policy_status`, and
  `annotating_service`. The `annotating_service` facet lists the
  services that have annotated assets in your tenant, so it
  doubles as the bootstrap for the scoped call.
- **Scoped** (`annotating_service[eq]` naming one service) —
  additionally returns that service's annotation attribute
  facets (for example, `attributes.provider` for the `discovery`
  service), with values enumerated from that service's
  annotations only. The attribute facets a service exposes are
  server-defined and evolve as annotating services register
  them; a service exposing none returns just the
  service-independent facets.
- The scope takes the scalar `[eq]` operator because it is a
  single service; the list endpoint's many-valued
  `annotating_service[in]` filter form is rejected here with
  `422 Unprocessable Entity`. (An `annotating_service` facet
  selection still round-trips to the list endpoint via `[in]`,
  as its `param` states.)
- **Project** (`project_id[eq]`) — limits every facet's values to
  the project's members. Requires the `project:read` scope in
  addition to `asset:read`.

The underlying query runs under a configurable server-side
statement timeout; a tenant whose data exceeds it receives
`422 Unprocessable Entity` with a
"query exceeds allowed cost/time limit" message rather than an
unbounded query.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.filters();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.FiltersAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.Asset</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Retrieve a single asset by its unique ID. The response contains
the full asset, including its creation and last-updated
timestamps and its current set of annotations. Each annotation
carries its `annotating_service` and an `attributes` property
map holding the details that service observed.

Embedding `projects` additionally requires the `project:read` scope.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.get({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GetAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">discoveredGraph</a>({ ...params }) -> HiddenLayer.AssetGraphNode</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Retrieve the relationship graph for an AI asset, starting from that
asset and following its relationships to the assets it connects to.
Use this to show how an asset relates to others — for example, the
models an endpoint serves, or the assets derived from a given model.

The asset is identified by its `asset_id`. The response is a tree
rooted at that asset: each node lists its outgoing `relationships`,
and each relationship gives its `relationship_type`, optional
`metadata`, and the target `asset` it points to. Only outgoing
relationships are followed, and traversal stops once `depth` levels
have been reached.

Requires the `asset:read` scope.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.discoveredGraph({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.DiscoveredGraphAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.<a href="/src/api/resources/assetInventory/resources/assets/client/Client.ts">tags</a>({ ...params }) -> HiddenLayer.AssetTagMap</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns all custom and discovered tags assigned to the given asset.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.tags({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.TagsAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Relationships
<details><summary><code>client.assetInventory.relationships.<a href="/src/api/resources/assetInventory/resources/relationships/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.AiAssetInventoryV1AssetRelationship</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.relationships.get({
    relationship_id: "relationship_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GetRelationshipsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RelationshipsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Metrics
<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">providerCountsV1</a>() -> HiddenLayer.AiAssetInventoryV1ProviderCounts</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.providerCountsV1();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">regionCountsV1</a>() -> HiddenLayer.AiAssetInventoryV1RegionCounts</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.regionCountsV1();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">assetTypeCountsV1</a>() -> HiddenLayer.AiAssetInventoryV1AssetTypeCounts</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.assetTypeCountsV1();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">providerCounts</a>() -> HiddenLayer.ProviderCounts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Return the number of AI assets in your inventory grouped by
cloud provider (for example, AWS, Azure, GCP, and Databricks).
Assets from providers outside this set are counted under
`other`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.providerCounts();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">regionCounts</a>() -> HiddenLayer.RegionCounts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Return the number of AI assets in your inventory grouped by
geographic location, broken down both by country and by
higher-level geographic region (for example, North America or
Europe).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.regionCounts();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.metrics.<a href="/src/api/resources/assetInventory/resources/metrics/client/Client.ts">assetTypeCounts</a>() -> HiddenLayer.AssetTypeCounts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Return the number of AI assets in your inventory grouped by
asset type (for example, model, endpoint, or agent).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.metrics.assetTypeCounts();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `MetricsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Resources
<details><summary><code>client.assetInventory.resources.<a href="/src/api/resources/assetInventory/resources/resources/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.ListResourcesResponse.Items.Item, HiddenLayer.ListResourcesResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.resources.list({
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.resources.list({
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ListResourcesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResourcesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Scans
<details><summary><code>client.assetInventory.scans.<a href="/src/api/resources/assetInventory/resources/scans/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.AssetScan</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.scans.get({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GetScansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Tags
<details><summary><code>client.assetInventory.tags.<a href="/src/api/resources/assetInventory/resources/tags/client/Client.ts">listV1</a>({ ...params }) -> core.Page&lt;HiddenLayer.AiAssetInventoryV1TagDefinition, HiddenLayer.AiAssetInventoryV1TagDefinitionList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a paginated list of tag definitions. Optionally filter by source.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.tags.listV1({
    sort: "+name",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.tags.listV1({
    sort: "+name",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ListV1TagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.tags.<a href="/src/api/resources/assetInventory/resources/tags/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.TagDefinition, HiddenLayer.TagDefinitionList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns a cursor-paginated list of tag definitions. Optionally filter by source.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.tags.list({
    sort: "+name",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.tags.list({
    sort: "+name",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ListTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory CustomTags
<details><summary><code>client.assetInventory.customTags.<a href="/src/api/resources/assetInventory/resources/customTags/client/Client.ts">updateV1</a>({ ...params }) -> HiddenLayer.AiAssetInventoryV1TagDefinition</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a tag definition. Only the name can be changed at this time.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.customTags.updateV1({
    tag_name: "tag_name",
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.AiAssetInventoryV1TagDefinitionUpdate` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.customTags.<a href="/src/api/resources/assetInventory/resources/customTags/client/Client.ts">valuesV1</a>({ ...params }) -> core.Page&lt;string, HiddenLayer.AiAssetInventoryV1TagValueList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a paginated list of values for a given custom tag name.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.customTags.valuesV1({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.customTags.valuesV1({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ValuesV1CustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.customTags.<a href="/src/api/resources/assetInventory/resources/customTags/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.TagDefinition</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Updates a tag definition. Only the name can be changed at this time.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.customTags.update({
    tag_name: "tag_name",
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.TagDefinitionUpdate` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.customTags.<a href="/src/api/resources/assetInventory/resources/customTags/client/Client.ts">values</a>({ ...params }) -> core.Page&lt;string, HiddenLayer.TagValueList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns a cursor-paginated list of values for a given custom tag name.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.customTags.values({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.customTags.values({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ValuesCustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory DiscoveredTags
<details><summary><code>client.assetInventory.discoveredTags.<a href="/src/api/resources/assetInventory/resources/discoveredTags/client/Client.ts">valuesV1</a>({ ...params }) -> core.Page&lt;string, HiddenLayer.AiAssetInventoryV1TagValueList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a paginated list of values for a given discovered tag name.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.discoveredTags.valuesV1({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.discoveredTags.valuesV1({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ValuesV1DiscoveredTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DiscoveredTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.discoveredTags.<a href="/src/api/resources/assetInventory/resources/discoveredTags/client/Client.ts">values</a>({ ...params }) -> core.Page&lt;string, HiddenLayer.TagValueList&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns a cursor-paginated list of values for a given discovered tag name.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.discoveredTags.values({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.discoveredTags.values({
    tag_name: "tag_name",
    sort: "+value",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.ValuesDiscoveredTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DiscoveredTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Annotations
<details><summary><code>client.assetInventory.annotations.<a href="/src/api/resources/assetInventory/resources/annotations/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.Asset</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Resolve an asset by the pair of `annotating_service` and that service's
`key`. Use this when the producer's identifier is known but the
server-generated asset ID is not.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.annotations.get({
    annotating_service: "annotating_service",
    annotating_service_key: "annotating_service_key"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.GetAnnotationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AnnotationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Jobs
<details><summary><code>client.assetInventory.jobs.<a href="/src/api/resources/assetInventory/resources/jobs/client/Client.ts">customTags</a>({ ...params }) -> HiddenLayer.CustomTagsJobsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Apply a custom-tag change to every asset matching a filter in one request, instead of calling the single-asset tag endpoints once per asset. The `action` (`PUT` or `DELETE`) is applied to each matched asset exactly as `PUT /asset-inventory/v2/assets/{asset_id}/custom-tags/{tag_name}` or `DELETE /asset-inventory/v2/assets/{asset_id}/custom-tags/{tag_name}` would apply it.
The filter accepts the same criteria as `GET /asset-inventory/v2/assets`, so you can preview exactly which assets a job will touch by running that search first.
The request is processed synchronously: the response is the finished `Job`, always in a terminal state (`COMPLETED` or `FAILED`), with `matched_count`, `succeeded_count`, `failed_count`, and per-asset `failures[]` filled in. A filter that matches no assets returns `COMPLETED` with `matched_count: 0`. Jobs are not stored, so there is no job ID to poll — the response is the only report of the outcome.
A job matches at most 10,000 assets; a filter that would match more is rejected with `422 Unprocessable Entity`. Narrow the filter and retry.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.jobs.customTags({
    filter: {
        assets: {
            asset_type: {
                "in": ["MODEL", "ENDPOINT"]
            },
            annotating_service: {
                "in": ["discovery"]
            },
            attributes: {
                "provider": {
                    eq: "AWS"
                },
                "region": {
                    "in": ["us-east-1", "eu-west-1"]
                }
            }
        }
    },
    action: "PUT",
    body: {
        "team": "ml-platform",
        "environment": "production",
        "cost-center": "ai-inference",
        "managed-by": "terraform",
        "data-classification": "confidential"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.BulkCustomTagJobRequestV2` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `JobsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Assets Search
<details><summary><code>client.assetInventory.assets.search.<a href="/src/api/resources/assetInventory/resources/assets/resources/search/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.SearchResult, HiddenLayer.SearchResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.assetInventory.assets.search.list({
    q: "q",
    sort: "+discovered_at"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.assetInventory.assets.search.list({
    q: "q",
    sort: "+discovered_at"
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.ListSearchRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SearchClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.search.<a href="/src/api/resources/assetInventory/resources/assets/resources/search/client/Client.ts">suggestions</a>({ ...params }) -> HiddenLayer.SearchSuggestionsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.search.suggestions({
    q: "q"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.SuggestionsSearchRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SearchClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## AssetInventory Assets CustomTags
<details><summary><code>client.assetInventory.assets.customTags.<a href="/src/api/resources/assetInventory/resources/assets/resources/customTags/client/Client.ts">updateV1</a>({ ...params }) -> HiddenLayer.AiAssetInventoryV1TagValue</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Assigns a custom tag to an asset. If the tag already exists on the asset, its value is updated.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.customTags.updateV1({
    asset_id: "asset_id",
    tag_name: "tag_name",
    body: {
        value: "value"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.UpdateV1CustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.customTags.<a href="/src/api/resources/assetInventory/resources/assets/resources/customTags/client/Client.ts">deleteV1</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Removes a custom tag assignment from an asset.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.customTags.deleteV1({
    asset_id: "asset_id",
    tag_name: "tag_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.DeleteV1CustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.customTags.<a href="/src/api/resources/assetInventory/resources/assets/resources/customTags/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.TagValue</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Assigns a custom tag to an asset. If the tag already exists on the asset, its value is updated.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.customTags.update({
    asset_id: "asset_id",
    tag_name: "tag_name",
    body: {
        value: "value"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.UpdateCustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.assetInventory.assets.customTags.<a href="/src/api/resources/assetInventory/resources/assets/resources/customTags/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Removes a custom tag assignment from an asset.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.assetInventory.assets.customTags.delete({
    asset_id: "asset_id",
    tag_name: "tag_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.assetInventory.assets.DeleteCustomTagsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomTagsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Audit Entries
<details><summary><code>client.audit.entries.<a href="/src/api/resources/audit/resources/entries/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.AuditEntry, HiddenLayer.ListEntriesResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns audit log entries for the tenant, sorted by time with the most recent first. Results can be filtered by time range, actor, role, action, and resource type, or searched by free text.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.audit.entries.list({
    start_time: "2025-05-27T00:00:00Z",
    end_time: "2025-05-27T23:59:59Z"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.audit.entries.list({
    start_time: "2025-05-27T00:00:00Z",
    end_time: "2025-05-27T23:59:59Z"
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.audit.ListEntriesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EntriesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Audit ActivityTypes
<details><summary><code>client.audit.activityTypes.<a href="/src/api/resources/audit/resources/activityTypes/client/Client.ts">list</a>() -> HiddenLayer.ActivityTypeList</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the list of all auditable activity types. Use this to understand what actions are tracked and to build filters when querying audit entries.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.audit.activityTypes.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ActivityTypesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Compliance Projects
<details><summary><code>client.compliance.projects.<a href="/src/api/resources/compliance/resources/projects/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.GetProjectItem, HiddenLayer.ListProjectsResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.compliance.projects.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.compliance.projects.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ListProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.projects.<a href="/src/api/resources/compliance/resources/projects/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.ProjectId</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns the new project ID; retrieve the project by ID to read its settings.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.projects.create();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.CreateProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.projects.<a href="/src/api/resources/compliance/resources/projects/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetProjectsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.projects.get({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.GetProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.projects.<a href="/src/api/resources/compliance/resources/projects/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.ProjectId</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates an existing project and returns its ID; retrieve the project by ID to read its settings. A missing project returns 404.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.projects.update({
    "If-Unmodified-Since": "Sat, 29 Oct 1994 19:43:31 GMT",
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.UpdateProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.projects.<a href="/src/api/resources/compliance/resources/projects/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.projects.delete({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.DeleteProjectsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Compliance RuleSets
<details><summary><code>client.compliance.ruleSets.<a href="/src/api/resources/compliance/resources/ruleSets/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.GetRuleSetItem, HiddenLayer.ListRuleSetsResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.compliance.ruleSets.list({
    limit: 50,
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.compliance.ruleSets.list({
    limit: 50,
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ListRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.<a href="/src/api/resources/compliance/resources/ruleSets/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.GetRuleSetItem</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.create({
    name: "name",
    description: "description"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.RuleSetDetails` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.<a href="/src/api/resources/compliance/resources/ruleSets/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetRuleSetItem</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.get({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.GetRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.<a href="/src/api/resources/compliance/resources/ruleSets/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.update({
    "If-Unmodified-Since": "Sat, 29 Oct 1994 19:43:31 GMT",
    id: "00000000-0000-0000-0000-000000000000",
    body: {
        name: "name",
        description: "description"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.UpdateRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.<a href="/src/api/resources/compliance/resources/ruleSets/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.delete({
    id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.DeleteRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Compliance RuleSets Settings
<details><summary><code>client.compliance.ruleSets.settings.<a href="/src/api/resources/compliance/resources/ruleSets/resources/settings/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.ListSettingsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.settings.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ruleSets.ListSettingsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettingsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.settings.<a href="/src/api/resources/compliance/resources/ruleSets/resources/settings/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.SettingsId</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.settings.create({
    id: "00000000-0000-0000-0000-000000000000",
    settings: {
        "key": "value"
    },
    settings_id: "settings_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ruleSets.CreateSettingsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettingsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.settings.<a href="/src/api/resources/compliance/resources/ruleSets/resources/settings/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.SettingsDetailsWithSchema</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.settings.get({
    id: "00000000-0000-0000-0000-000000000000",
    settings_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ruleSets.GetSettingsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettingsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.settings.<a href="/src/api/resources/compliance/resources/ruleSets/resources/settings/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.settings.update({
    "If-Match": "\"7da7a728-f910-11e6-942a-68f728c1ba70\"",
    id: "00000000-0000-0000-0000-000000000000",
    settings_id: "00000000-0000-0000-0000-000000000000",
    body: {
        settings: {
            "key": "value"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ruleSets.UpdateSettingsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettingsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.compliance.ruleSets.settings.<a href="/src/api/resources/compliance/resources/ruleSets/resources/settings/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.compliance.ruleSets.settings.delete({
    id: "00000000-0000-0000-0000-000000000000",
    settings_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.compliance.ruleSets.DeleteSettingsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettingsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Evaluations RedTeam
<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.RedTeamResultItem, HiddenLayer.RedTeamListResultsResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

List completed red team workflow results with filtering and bidirectional pagination.

Results are ordered by completed_at DESC (newest first).
Returns metadata only - use GET /evaluations/v1/red-team/{workflow_id} for full payload.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.evaluations.redTeam.list();
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.evaluations.redTeam.list();
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.ListRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.StartWorkflowResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Start a new red team client workflow.
Auto-triggers planning phase. Client should then poll /next-action.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.create({
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.ClientRedTeamBody` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">retrieveStatus</a>({ ...params }) -> HiddenLayer.WorkflowStatusResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Get current status of a red team workflow.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.retrieveStatus({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.RetrieveStatusRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">retrieveNextAction</a>({ ...params }) -> HiddenLayer.NextActionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Poll for next action - CLIENT'S MAIN POLLING ENDPOINT.

This endpoint is designed to be polled repeatedly by the client.
Returns immediately with current state:
- If attack ready: Returns attack_task with prompt
- If processing: Returns processing=true (client continues polling)
- If complete: Returns action_type=complete
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.retrieveNextAction({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.RetrieveNextActionRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">submitTargetResponse</a>({ ...params }) -> HiddenLayer.SubmitTargetResponseResult</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Submit target's response.

This triggers the ProcessTargetResponseWorkflow child workflow
for the specified session. Returns immediately.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.submitTargetResponse({
    workflow_id: "workflow_id",
    session_id: "session_id",
    target_response: "target_response"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.SubmitTargetResponseBody` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">retrieveEvaluationResults</a>({ ...params }) -> HiddenLayer.WorkflowResultResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Get the complete result of a red team workflow.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.retrieveEvaluationResults({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.RetrieveEvaluationResultsRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Delete a red team workflow result from storage.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.delete({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.DeleteRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.<a href="/src/api/resources/evaluations/resources/redTeam/client/Client.ts">terminate</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Terminate a running workflow job.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.terminate({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.TerminateRedTeamRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RedTeamClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Evaluations RedTeam RuleSuggestions
<details><summary><code>client.evaluations.redTeam.ruleSuggestions.<a href="/src/api/resources/evaluations/resources/redTeam/resources/ruleSuggestions/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.RuleSuggestionListItem, HiddenLayer.RuleSuggestionListResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

List rule suggestion runs generated for a red team evaluation, newest first.

Each run is independent - triggering a new run does not replace or affect prior runs.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.evaluations.redTeam.ruleSuggestions.list({
    workflow_id: "workflow_id"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.evaluations.redTeam.ruleSuggestions.list({
    workflow_id: "workflow_id"
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.redTeam.ListRuleSuggestionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSuggestionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.ruleSuggestions.<a href="/src/api/resources/evaluations/resources/redTeam/resources/ruleSuggestions/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.StartRuleSuggestionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Start a new rule suggestion run for a completed red team evaluation. Analyzes the
evaluation's successful attacks and generates a detection rule suggestion that can be
reviewed and added to a project's runtime security policy.

Callable multiple times for the same evaluation; each call starts an independent run.
The response's `suggestion_id` identifies the new run - use it in the status, result,
and list endpoints (the `{workflow_id}` path segment continues to identify the source
red team evaluation). Client should poll /status, then fetch the full result once
complete.

An empty JSON object `{}` is the minimal valid request body.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.ruleSuggestions.create({
    workflow_id: "workflow_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.redTeam.StartRuleSuggestionBody` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSuggestionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.ruleSuggestions.<a href="/src/api/resources/evaluations/resources/redTeam/resources/ruleSuggestions/client/Client.ts">status</a>({ ...params }) -> HiddenLayer.RuleSuggestionStatusResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Get current status of a rule suggestion run (polling endpoint).
Returns immediately with current state.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.ruleSuggestions.status({
    workflow_id: "workflow_id",
    suggestion_id: "suggestion_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.redTeam.StatusRuleSuggestionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSuggestionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.evaluations.redTeam.ruleSuggestions.<a href="/src/api/resources/evaluations/resources/redTeam/resources/ruleSuggestions/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.RuleSuggestionResultResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Get the complete result of a rule suggestion run, including any generated rules.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.evaluations.redTeam.ruleSuggestions.get({
    workflow_id: "workflow_id",
    suggestion_id: "suggestion_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.evaluations.redTeam.GetRuleSuggestionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSuggestionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance Evaluations
<details><summary><code>client.governance.evaluations.<a href="/src/api/resources/governance/resources/evaluations/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.BulkEvaluationResults</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the governance evaluation results for multiple artifacts by their unique identifiers.
Each artifact will have a corresponding status to indicate whether evaluation results exist for that ID.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.evaluations.list({
    artifact_ids: ["artifact_ids"]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ListEvaluationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EvaluationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.evaluations.<a href="/src/api/resources/governance/resources/evaluations/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.EvaluationResult</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the governance evaluation results for a specific artifact by its unique identifier.
The response includes whether the artifact is compliant with the defined policies and an explanation of the evaluation.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.evaluations.get({
    artifact_id: "artifact_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.GetEvaluationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EvaluationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance Licenses
<details><summary><code>client.governance.licenses.<a href="/src/api/resources/governance/resources/licenses/client/Client.ts">list</a>() -> HiddenLayer.ListLicensesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns every license value a `license` condition accepts, including `unknown` and `custom`
alongside the named licenses. Rules store each license's `id`; `name` is for display only.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.licenses.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `LicensesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance RuleSets
<details><summary><code>client.governance.ruleSets.<a href="/src/api/resources/governance/resources/ruleSets/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.RuleSet, HiddenLayer.ListRuleSetsResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of rule sets that can be used to evaluate artifacts against governance policies.
This endpoint supports pagination with the `page_size` and `cursor` parameters.
Rule sets are ordered by their creation time, with the oldest rule sets listed first.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.governance.ruleSets.list({
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.governance.ruleSets.list({
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ListRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.ruleSets.<a href="/src/api/resources/governance/resources/ruleSets/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.RuleSet</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new rule set for evaluating artifacts against governance policies.
Rule sets can contain multiple rules, each with a set of conditions to evaluate.
This endpoint allows you to create a new set of rules with their compliance criteria.
Order matters; later rules may override earlier ones. Each rule's `is_disabled` value is
honored as submitted, so a rule set can be created with some of its rules already disabled.

When `replace_active_policy` is `true`, creating a rule set also disables whichever
custom rule set is currently enabled for the tenant, so the newly created rule set
becomes the tenant's sole active custom policy. The default rule set is never disabled
by this operation.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.create({
    body: {
        display_name: "display_name",
        rules: [{
                is_compliant_when_conditions_met: true,
                conditions: [{
                        field: "field",
                        condition_operator: "equals"
                    }]
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.CreateRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.ruleSets.<a href="/src/api/resources/governance/resources/ruleSets/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.RuleSet</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a specific rule set by its unique identifier. This endpoint returns the details of the rule set, including its rules and compliance criteria.
The response includes the rule set's ID, display name, and the list of rules it contains.
If the rule set does not exist, a 404 Not Found error is returned.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.get({
    rule_set_id: "rule_set_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.GetRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.ruleSets.<a href="/src/api/resources/governance/resources/ruleSets/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a rule set by its unique identifier. This operation disables the rule set so it cannot be applied to artifacts during evaluation.
If the rule set does not exist, a 404 Not Found error is returned.
This operation is irreversible; once deleted, the rule set cannot be recovered.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.delete({
    rule_set_id: "rule_set_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.DeleteRuleSetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RuleSetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance PolicyPacks
<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.PolicyPackSummary, HiddenLayer.ListPolicyPacksResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Returns pack summaries without `settings` or `detection_rules`. To read those, get the policy pack by ID.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.governance.policyPacks.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.governance.policyPacks.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ListPolicyPacksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.PolicyPack</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

The pack must assign at least one detection rule through `rule_pack_ids` or `individual_rules`; otherwise returns 422.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.policyPacks.create({
    name: "name",
    settings: [{
            settings: {
                "key": "value"
            },
            settings_id: "settings_id"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.PolicyPackWriteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">recommendations</a>({ ...params }) -> HiddenLayer.PolicyPackRecommendation</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

To apply the recommendation, set the returned `id` as the project's `policy_pack_id`.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.policyPacks.recommendations({
    application_type: "GENERAL"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.PolicyPackRecommendationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.PolicyPack</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.policyPacks.get({
    policy_pack_id: "policy_pack_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.GetPolicyPacksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.PolicyPack</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Replaces the entire pack, including `settings`; omitted optional fields are cleared.
- **403** when the pack is HiddenLayer-authored; only custom packs can be modified.
- **422** when the pack would assign no detection rules.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.policyPacks.update({
    policy_pack_id: "policy_pack_id",
    body: {
        name: "name",
        settings: [{
                settings: {
                    "key": "value"
                },
                settings_id: "settings_id"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.UpdatePolicyPacksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.policyPacks.<a href="/src/api/resources/governance/resources/policyPacks/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Projects using the pack are moved to the pack assigned to the tenant's default project. The pack's policy, ruleset, and ruleset settings are also deleted unless another project or pack still references them.
Returns 403 when the pack is HiddenLayer-authored; only custom packs can be deleted.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.policyPacks.delete({
    policy_pack_id: "policy_pack_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.DeletePolicyPacksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyPacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance RulePacks
<details><summary><code>client.governance.rulePacks.<a href="/src/api/resources/governance/resources/rulePacks/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.RulePack, HiddenLayer.ListRulePacksResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.governance.rulePacks.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.governance.rulePacks.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ListRulePacksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulePacksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Governance RuleSets Rules
<details><summary><code>client.governance.ruleSets.rules.<a href="/src/api/resources/governance/resources/ruleSets/resources/rules/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.RuleSet</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Add a new rule to an existing rule set. This endpoint allows you to define a rule with its compliance criteria and conditions.
The new rule will be appended to the existing rules in the specified rule set.
If the rule set does not exist, a 404 Not Found error is returned.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.rules.create({
    rule_set_id: "rule_set_id",
    body: {
        is_compliant_when_conditions_met: true,
        conditions: [{
                field: "field",
                condition_operator: "equals"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ruleSets.CreateRulesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.ruleSets.rules.<a href="/src/api/resources/governance/resources/ruleSets/resources/rules/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.RuleSet</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Replace an existing rule in a rule set with a new definition. This endpoint allows you to update the compliance criteria and conditions of a rule, preserving
 the rule's order in the rule set. If the rule set or the rule does not exist, a 404 Not Found error is returned.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.rules.update({
    rule_set_id: "rule_set_id",
    rule_id: "rule_id",
    body: {
        is_compliant_when_conditions_met: true,
        conditions: [{
                field: "field",
                condition_operator: "equals"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ruleSets.UpdateRulesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.governance.ruleSets.rules.<a href="/src/api/resources/governance/resources/ruleSets/resources/rules/client/Client.ts">delete</a>({ ...params }) -> HiddenLayer.RuleSet</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Disable a rule in a rule set. This endpoint allows you to remove a rule. It will no longer affect artifact evaluations.
If the rule set or the rule does not exist, a 404 Not Found error is returned.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.governance.ruleSets.rules.delete({
    rule_set_id: "rule_set_id",
    rule_id: "rule_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.governance.ruleSets.DeleteRulesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RulesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Integrations Assets
<details><summary><code>client.integrations.assets.<a href="/src/api/resources/integrations/resources/assets/client/Client.ts">scans</a>({ ...params }) -> HiddenLayer.AssetScanTriggerResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Triggers an on-demand retrieval and scan workflow for a discovered AI asset. This endpoint validates the asset exists and has a matching integration, then sends a message to initiate the asset retrieval and scanning process.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.integrations.assets.scans({
    asset_id: "asset_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.integrations.ScansAssetsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AssetsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Metrics TimeseriesInferences
<details><summary><code>client.metrics.timeseriesInferences.<a href="/src/api/resources/metrics/resources/timeseriesInferences/client/Client.ts">listV2</a>({ ...params }) -> HiddenLayer.InferenceTimeseriesResponseV2</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesInferences.listV2({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListV2TimeseriesInferencesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesInferencesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.metrics.timeseriesInferences.<a href="/src/api/resources/metrics/resources/timeseriesInferences/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.InferenceTimeseriesResponseV3</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesInferences.list({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListTimeseriesInferencesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesInferencesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Metrics TimeseriesIncidents
<details><summary><code>client.metrics.timeseriesIncidents.<a href="/src/api/resources/metrics/resources/timeseriesIncidents/client/Client.ts">listV2</a>({ ...params }) -> HiddenLayer.IncidentTimeseriesResponseV2</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesIncidents.listV2({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListV2TimeseriesIncidentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesIncidentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.metrics.timeseriesIncidents.<a href="/src/api/resources/metrics/resources/timeseriesIncidents/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.IncidentTimeseriesResponseV3</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesIncidents.list({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListTimeseriesIncidentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesIncidentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Metrics TimeseriesConvictions
<details><summary><code>client.metrics.timeseriesConvictions.<a href="/src/api/resources/metrics/resources/timeseriesConvictions/client/Client.ts">listV2</a>({ ...params }) -> HiddenLayer.ConvictionTimeseriesResponseV2</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesConvictions.listV2({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListV2TimeseriesConvictionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesConvictionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.metrics.timeseriesConvictions.<a href="/src/api/resources/metrics/resources/timeseriesConvictions/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.ConvictionTimeseriesResponseV3</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesConvictions.list({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListTimeseriesConvictionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesConvictionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Metrics TimeseriesScans
<details><summary><code>client.metrics.timeseriesScans.<a href="/src/api/resources/metrics/resources/timeseriesScans/client/Client.ts">listV2</a>({ ...params }) -> HiddenLayer.ScanTimeseriesResponseV2</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesScans.listV2({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListV2TimeseriesScansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesScansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.metrics.timeseriesScans.<a href="/src/api/resources/metrics/resources/timeseriesScans/client/Client.ts">list</a>({ ...params }) -> HiddenLayer.ScanTimeseriesResponseV3</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.metrics.timeseriesScans.list({
    start_timestamp: "2024-01-01T00:00:00Z",
    end_timestamp: "2024-01-01T00:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.metrics.ListTimeseriesScansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TimeseriesScansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Mitre Atlas Tactics
<details><summary><code>client.mitre.atlas.tactics.<a href="/src/api/resources/mitre/resources/atlas/resources/tactics/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.MitreAtlasTacticV1</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.mitre.atlas.tactics.get({
    tactic_id: "AML.TA0001"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.mitre.atlas.GetTacticsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TacticsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Mitre Atlas Techniques
<details><summary><code>client.mitre.atlas.techniques.<a href="/src/api/resources/mitre/resources/atlas/resources/techniques/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetTechniquesResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.mitre.atlas.techniques.get({
    technique_id: "AML.T0043"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.mitre.atlas.GetTechniquesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TechniquesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## ModelIntel File
<details><summary><code>client.modelIntel.file.<a href="/src/api/resources/modelIntel/resources/file/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetFileResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve detailed file information including all associated instances, repositories, and metadata
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.modelIntel.file.get({
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    page_size: 50
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.modelIntel.GetFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.modelIntel.file.<a href="/src/api/resources/modelIntel/resources/file/client/Client.ts">metadata</a>({ ...params }) -> HiddenLayer.File_</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve file information such as filetype, file size in bytes, and MIME type
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.modelIntel.file.metadata({
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.modelIntel.MetadataFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Models Cards
<details><summary><code>client.models.cards.<a href="/src/api/resources/models/resources/cards/client/Client.ts">listV3</a>({ ...params }) -> core.Page&lt;HiddenLayer.ModelCardV3, HiddenLayer.ModelCardV3QueryResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.models.cards.listV3({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.models.cards.listV3({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.ListV3CardsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.cards.<a href="/src/api/resources/models/resources/cards/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.ModelCardV4, HiddenLayer.ModelCardV4QueryResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deprecated in favor of `GET /asset-inventory/v2/assets`
(`asset_type[in]=MODEL`), which returns the same model-card data —
scan status/timing and findings from the `supply-chain` annotation —
alongside the rest of an asset's data, with matching filters
(`model_id[eq]`, `scan_started_at[gt/gte/lt/lte]`) and sorts
(`model_name`, `scan_started_at`).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.models.cards.list({
    limit: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.models.cards.list({
    limit: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.ListCardsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.cards.<a href="/src/api/resources/models/resources/cards/client/Client.ts">suggestions</a>({ ...params }) -> HiddenLayer.SuggestionsCardsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.cards.suggestions({
    q: "tes"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.SuggestionsCardsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Models PolicyCompliance
<details><summary><code>client.models.policyCompliance.<a href="/src/api/resources/models/resources/policyCompliance/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Override the policy compliance status for a model. Send {"compliant": true} to mark as compliant, or {"compliant": false} to mark as noncompliant.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.policyCompliance.update({
    model_id: "model_id",
    compliant: true
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.OverridePolicyComplianceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyComplianceClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.policyCompliance.<a href="/src/api/resources/models/resources/policyCompliance/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove the manual policy compliance override for a model, reverting to the policy-derived compliance status.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.policyCompliance.delete({
    model_id: "model_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.DeletePolicyComplianceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PolicyComplianceClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Models Versions Location
<details><summary><code>client.models.versions.location.<a href="/src/api/resources/models/resources/versions/resources/location/client/Client.ts">internal</a>({ ...params }) -> HiddenLayer.InternalLocationResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.versions.location.internal({
    version_id: "version_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.versions.InternalLocationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LocationClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Models Versions Locations
<details><summary><code>client.models.versions.locations.<a href="/src/api/resources/models/resources/versions/resources/locations/client/Client.ts">get</a>({ ...params }) -> HiddenLayer.GetLocationsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.versions.locations.get({
    version_id: "version_id",
    key: "key"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.versions.GetLocationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LocationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.models.versions.locations.<a href="/src/api/resources/models/resources/versions/resources/locations/client/Client.ts">update</a>({ ...params }) -> HiddenLayer.UpdateLocationsResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.models.versions.locations.update({
    version_id: "version_id",
    key: "key",
    body: "string"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.models.versions.UpdateLocationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `LocationsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## ScanIndices Submission
<details><summary><code>client.scanIndices.submission.<a href="/src/api/resources/scanIndices/resources/submission/client/Client.ts">create</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scanIndices.submission.create({
    scanner_type: "hl_model_scanner",
    source: {
        SAAS: {
            requester_id: "someone@hiddenlayer.com"
        }
    },
    scan_result: {
        "file_results": [
            {
                "status": "done",
                "details": {
                    "sha256": "fae6d75cb56ba5d9bf898b5b49a83d635668cf726f0a1b25cf7dbb1b299101d6"
                }
            }
        ]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scanIndices.ScanSubmission` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubmissionClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Jobs
<details><summary><code>client.scans.jobs.<a href="/src/api/resources/scans/resources/jobs/client/Client.ts">request</a>({ ...params }) -> HiddenLayer.ScanJob</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.jobs.request({
    inventory: {
        model_name: "some-model",
        model_version: "",
        requesting_entity: "some-user@example.com"
    },
    access: {
        source: "HUGGING_FACE"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.ScanJobRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `JobsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.jobs.<a href="/src/api/resources/scans/resources/jobs/client/Client.ts">retrieve</a>({ ...params }) -> HiddenLayer.ScanReportOfRecordV3</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.jobs.retrieve({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.RetrieveJobsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `JobsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.jobs.<a href="/src/api/resources/scans/resources/jobs/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.ScanReportOfRecordV3Summary, HiddenLayer.ListJobsResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.scans.jobs.list({
    start_time: "2025-05-27T00:00:00Z",
    end_time: "2025-05-27T23:59:59Z",
    scanner_version: "1.0.0",
    detection_category: "Embedded Payloads"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.scans.jobs.list({
    start_time: "2025-05-27T00:00:00Z",
    end_time: "2025-05-27T23:59:59Z",
    scanner_version: "1.0.0",
    detection_category: "Embedded Payloads"
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.ListJobsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `JobsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Upload
<details><summary><code>client.scans.upload.<a href="/src/api/resources/scans/resources/upload/client/Client.ts">start</a>({ ...params }) -> HiddenLayer.StartUploadResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.upload.start({
    model_version: "model_version",
    model_name: "model_name",
    requesting_entity: "requesting_entity"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.MultiFileUploadRequestV3` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UploadClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.upload.<a href="/src/api/resources/scans/resources/upload/client/Client.ts">completeAll</a>({ ...params }) -> HiddenLayer.CompleteAllUploadResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.upload.completeAll({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.CompleteAllUploadRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `UploadClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Results
<details><summary><code>client.scans.results.<a href="/src/api/resources/scans/resources/results/client/Client.ts">listFiles</a>({ ...params }) -> core.Page&lt;HiddenLayer.ScanFileResultWithComplianceV3, HiddenLayer.ListFilesResultsResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a cursor-paginated list of file results for a given scan. Results are sorted by compliance status, then highest detection severity, then file path.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.scans.results.listFiles({
    scan_id: "00000000-0000-0000-0000-000000000000",
    page_size: 50
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.scans.results.listFiles({
    scan_id: "00000000-0000-0000-0000-000000000000",
    page_size: 50
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.ListFilesResultsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResultsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.results.<a href="/src/api/resources/scans/resources/results/client/Client.ts">sarif</a>({ ...params }) -> string</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.results.sarif({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.SarifResultsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResultsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.results.<a href="/src/api/resources/scans/resources/results/client/Client.ts">retrieveSummary</a>({ ...params }) -> HiddenLayer.ScanReportSummaryResponseV3</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns aggregated summary information for a scan without file-level results.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.results.retrieveSummary({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.RetrieveSummaryResultsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ResultsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Reports
<details><summary><code>client.scans.reports.<a href="/src/api/resources/scans/resources/reports/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;HiddenLayer.ScanReport, HiddenLayer.ListReportsResponse&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Returns a cursor-paginated list of scan reports.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.scans.reports.list({
    page_size: 5,
    limit: 5
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.scans.reports.list({
    page_size: 5,
    limit: 5
});
while (page.hasNextPage()) {
    page = await page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.ListReportsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ReportsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Reports Csv
<details><summary><code>client.scans.reports.csv.<a href="/src/api/resources/scans/resources/reports/resources/csv/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.CreateCsvResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Asynchronously initiates generation of a CSV scan report containing all scan results for the given time range.
Returns an ephemeral job ID that can be used to check the status of the export and download the file.
File is stored for 30 days once generated.

Constraints:
- Both `time[gte]` and `time[lte]` are required
- Date range cannot exceed 31 days
- Dates must be in RFC3339 format (e.g., 2023-01-01T00:00:00Z)
- Only scans with status "done" will be included in the export
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.reports.csv.create({
    time: {
        gte: "2024-01-15T09:30:00Z",
        lte: "2024-01-15T09:30:00Z"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.reports.CreateCsvRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CsvClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.reports.csv.<a href="/src/api/resources/scans/resources/reports/resources/csv/client/Client.ts">get</a>({ ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Checks the status to see if the CSV file is ready to download.  If the CSV file is ready the file will be returned in the response.  Files are stored for 30 days. If the report_id is lost, the report can be re-generated by re-submitting the request.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.reports.csv.get({
    report_id: "report_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.reports.GetCsvRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CsvClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Reports SupplyChain Csv
<details><summary><code>client.scans.reports.supplyChain.csv.<a href="/src/api/resources/scans/resources/reports/resources/supplyChain/resources/csv/client/Client.ts">create</a>({ ...params }) -> HiddenLayer.CreateCsvResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Asynchronously initiates generation of a supply chain CSV report containing scan results matching the specified filters.
Returns an ephemeral report ID that can be used to check the status of the export and download the file.
File is stored for 30 days once generated.

**Row Limit**: Returns up to 10,000 most recent scan results.

**Filtering**: Supports the same filtering parameters as the Query endpoint (GET /scan/v3/results).

**Sorting**: Supports sorting via the `sort` parameter. Results can be ordered by any CSV column.

**Columns**: The CSV columns can be customized using the optional `column_list` query parameter.
If not specified, defaults to: name, detections, scanned_on, policy_status, origin, threat_level.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.reports.supplyChain.csv.create({
    start_time: "2025-05-27T00:00:00Z",
    end_time: "2025-05-27T23:59:59Z",
    scanner_version: "1.0.0",
    detection_category: "Embedded Payloads",
    region: "us-east-1",
    provider: "aws"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.reports.supplyChain.CreateCsvRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CsvClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.reports.supplyChain.csv.<a href="/src/api/resources/scans/resources/reports/resources/supplyChain/resources/csv/client/Client.ts">get</a>({ ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Checks the status to see if the supply chain CSV file is ready to download.
If the CSV file is ready the file will be returned in the response.
Files are stored for 30 days. If the report_id is lost, the report can be re-generated by re-submitting the request.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.reports.supplyChain.csv.get({
    report_id: "report_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.reports.supplyChain.GetCsvRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CsvClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Scans Upload File
<details><summary><code>client.scans.upload.file.<a href="/src/api/resources/scans/resources/upload/resources/file/client/Client.ts">add</a>({ ...params }) -> HiddenLayer.AddFileResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.upload.file.add({
    "file-content-length": 1,
    "file-name": "exampleFile.txt",
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.upload.AddFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.scans.upload.file.<a href="/src/api/resources/scans/resources/upload/resources/file/client/Client.ts">complete</a>({ ...params }) -> HiddenLayer.CompleteFileResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.scans.upload.file.complete({
    scan_id: "00000000-0000-0000-0000-000000000000",
    file_id: "file_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.scans.upload.CompleteFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FileClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## SupplyChain Scans
<details><summary><code>client.supplyChain.scans.<a href="/src/api/resources/supplyChain/resources/scans/client/Client.ts">get</a>({ ...params }) -> Record&lt;string, unknown&gt; | undefined</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.supplyChain.scans.get({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.supplyChain.GetScansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.supplyChain.scans.<a href="/src/api/resources/supplyChain/resources/scans/client/Client.ts">guidance</a>({ ...params }) -> HiddenLayer.GuidanceScansResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

[BETA] This endpoint is not GA or Production ready and is subject to changes at any time. Breaking changes may occur.

Remediation guidance is generated on-demand with AI assistance and may not be
immediately available.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.supplyChain.scans.guidance({
    scan_id: "00000000-0000-0000-0000-000000000000"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `HiddenLayer.supplyChain.GuidanceScansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ScansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

