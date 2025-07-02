# Hidden Layer TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:stainless-sdks/hiddenlayer-sdk-typescript.git
cd hiddenlayer-sdk-typescript
./scripts/bootstrap
./scripts/build
```

### Running

```sh
# set env vars as needed
export HIDDENLAYER_TOKEN="My Bearer Token"
node ./packages/mcp-server/dist/index.js
```

> [!NOTE]
> Once this package is [published to npm](https://www.stainless.com/docs/guides/publish), this will become: `npx -y hiddenlayer-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "hiddenlayer_api": {
      "command": "node",
      "args": [
        "/path/to/local/hiddenlayer-sdk-typescript/packages/mcp-server",
        "--client=claude",
        "--tools=dynamic"
      ],
      "env": {
        "HIDDENLAYER_TOKEN": "My Bearer Token"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "hiddenlayer-mcp/server";

// import a specific tool
import retrieveModels from "hiddenlayer-mcp/tools/models/retrieve-models";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveModels, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `models`:

- `retrieve_models` (`read`): Get Model
- `delete_models` (`write`): Delete Adhoc Model

### Resource `models.cards`:

- `list_models_cards` (`read`): List Model Cards

### Resource `sensors`:

- `create_sensors` (`write`): Create a Sensor
- `retrieve_sensors` (`read`): Get Sensor
- `delete_sensors` (`write`): Delete Sensor
- `query_sensors` (`write`): Query a Sensor

### Resource `vectors`:

- `submit_vectors_vectors` (`write`): Submit vectors

### Resource `scans`:

- `check_health_scans` (`read`): Health check endpoint for Model Supply Chain Services
- `check_readiness_scans` (`read`): Readiness check endpoint for Model Supply Chain Services
- `retrieve_results_scans` (`read`): Retrieve Model Scan Results

### Resource `scans.results`:

- `retrieve_scans_results` (`read`): Get Result of a Model Scan
- `list_scans_results` (`read`): Get condensed reports for a Model Scan
- `patch_scans_results` (`write`): Indicate part (file or files) of a model scan has completed
- `start_scans_results` (`write`): Indicate model scan has started

### Resource `scans.jobs`:

- `list_scans_jobs` (`read`): List all Model Scan Jobs
- `request_scans_jobs` (`write`): Request a Model Scan Job

### Resource `scans.upload`:

- `complete_all_scans_upload` (`write`): Indicate All files are uploaded and start the scan
- `start_scans_upload` (`write`): Start V3 Upload

### Resource `scans.upload.file`:

- `add_upload_scans_file` (`write`): Add file to V3 Upload
- `complete_upload_scans_file` (`write`): Indicate that upload is completed for {file_id}
