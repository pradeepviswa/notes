import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

class MyMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "my-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // Add your tools here
    this.server.setRequestHandler("tools/call", async (request) => {
      const { name, arguments: args } = request.params;
      if (name === "example_tool") {
        return {
          content: [{ type: "text", text: `Example tool called with: ${JSON.stringify(args)}` }],
        };
      }
      throw new Error(`Unknown tool: ${name}`);
    });

    this.server.setRequestHandler("tools/list", async () => {
      return {
        tools: [
          {
            name: "example_tool",
            description: "An example tool",
            inputSchema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
              required: ["message"],
            },
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("MCP server running on stdio");
  }
}

const server = new MyMCPServer();
server.run().catch(console.error);