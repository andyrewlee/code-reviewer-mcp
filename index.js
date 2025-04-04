import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { parallelCodeReview } from "./parallel-code-review.js";

const server = new McpServer({
  name: "Code Reviewer",
  version: "1.0.0"
});

server.tool("code_review",
  { code: z.string() },
  async ({ code }) => {
    const { summary } = await parallelCodeReview(code);
    return {
      content: [{ type: "text", text: summary }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
