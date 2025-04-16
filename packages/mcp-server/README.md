# Hidden Layer TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Building

Because it's not published yet, clone the repo and build it:

```sh
git clone git@github.com:stainless-sdks/hiddenlayer-sdk-typescript.git
cd hiddenlayer-sdk-typescript
yarn && ./scripts/build-all
```

### Running

```sh
# set env vars as needed
export HIDDENLAYER_TOKEN="My Bearer Token"
npx ./packages/mcp-server
```

> [!NOTE]
> Once this package is [published to npm](https://app.stainless.com/docs/guides/publish), this will become: `npx -y hiddenlayer-mcp`

### Via MCP Client

[Build the project](#building) as mentioned above.

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "hiddenlayer_api": {
      "command": "npx",
      "args": ["-y", "/path/to/local/hiddenlayer-sdk-typescript/packages/mcp-server"],
      "env": {
        "HIDDENLAYER_TOKEN": "My Bearer Token"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

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
