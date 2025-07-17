# MCP Server Setup & Local Development

## 1. Environment Variables

Before starting, set up authentication and database access variables.

### Create Your Environment File

Copy the example file:

    cp .dev.vars.example .dev.vars

Edit `.dev.vars` and fill in:

    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    COOKIE_ENCRYPTION_KEY=your_random_encryption_key

## 2. GitHub OAuth Setup

- Go to GitHub Developer Settings > OAuth Apps
- Click "New OAuth App"
  - Application name: MCP Server (Local Development)
  - Homepage URL: <http://localhost:8788>
  - Authorization callback URL: <http://localhost:8788/callback>
- Register the app
- Copy the Client ID and Secret into `.dev.vars`

## 3. Generate Encryption Key

Generate a secure key for cookies:

    openssl rand -hex 32

Paste the output as `COOKIE_ENCRYPTION_KEY` in `.dev.vars`.

## 4. Local Development

Start the server:

    wrangler dev

The MCP server will run on the port specified in your `wrangler.jsonc` under `dev.port`. By default, this is set to 8788:

    "dev": {
      "port": 8788
    }

Access the server at <http://localhost:8788> (or your configured port).

## 5. Testing with MCP Inspector

- Install and run Inspector:

    npx @modelcontextprotocol/inspector@latest

- Connect to your server:
  - Transport Type: Streamable HTTP
  - URL: <http://127.0.0.1:8788/mcp>
- Authenticate via GitHub OAuth

## References & Inspiration

This project builds on ideas and code from:

- [Remote MCP Server with Auth (coleam00)](https://github.com/coleam00/remote-mcp-server-with-auth)
- [Cloudflare AI Remote MCP GitHub OAuth Demo](https://github.com/cloudflare/ai/tree/main/demos/remote-mcp-github-oauth)
