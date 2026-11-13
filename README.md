# Catch That Rabbit

SvelteKit front end for the Catch That Rabbit Core Blockchain mining pools. This project replaces the Docusaurus front end in `ctr-web` while keeping the pool tools and familiar URLs.

## Run locally

Requires Node.js 22.17 or newer.

```sh
npm install
npm run dev
```

Use `npm run check` for Svelte and TypeScript diagnostics and `npm run build` for a production build.

## Features

- Live statistics for the DACH, Nordic, ASEAN, Far East and America pools
- Block, payment and miner explorers with pool selection and pagination
- Wallet and worker views, including the `/wallet`, `/w`, and `/coreid` URL aliases
- Pool selection and downloadable `pool.cfg` miner configuration
- Profit calculator using network difficulty, live XCB rates, machine presets and electricity costs
- Contact, documentation and blog pages from the prior site

The SvelteKit endpoints under `/api/pool/[region]/...` proxy the pool's **v2 API** (`/v2/api/...`). `/api/price/[currency]` reads the public Core Exposed FX pair `XCB → currency` at `/obp/v6.0.0/fx/xcb/{currency}` and returns the fiat value of one XCB. The calculator and wallet payment estimates use this rate. Mining servers and default pool API origins are defined in `src/lib/ctr/config.ts`.

The Postman collection is in the neighboring `pool` project at `docs/postman/CatchThatRabbit-Pool-API.postman_collection.json`. Its API hostname pattern is `api-{region}.catchthatrabbit.com`. Set the server-side environment variables `CTR_POOL_API_DE`, `CTR_POOL_API_FI`, `CTR_POOL_API_SG`, `CTR_POOL_API_HK`, and `CTR_POOL_API_AM` to override individual origins when deployment hostnames differ. Values must be origins such as `https://api-de.catchthatrabbit.com` (include a port if needed).

Run `npm run test:api` to check the sorted-worker response shape and MCP tools.

## Public MCP connector

The website serves a free, anonymous, read-only [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) endpoint at `https://<website-host>/api/mcp`. Configure an MCP client with that URL; no API key or account is required. For example:

```json
{
	"mcpServers": {
		"catch-that-rabbit": {
			"url": "https://<website-host>/api/mcp"
		}
	}
}
```

Available tools are `list_pools`, `get_pool_stats`, `get_pool_settings`, `get_pool_blocks`, `get_pool_payments`, `get_pool_account`, and `get_pool_workers`. They expose public information for the DE, FI, SG, HK, and AM pools. List queries accept a page size of 1–50 and an offset of 0–100000. Wallet tools require a 44-character hexadecimal Core address. The connector calls the website's `/api/pool/[region]/...` route, which reads the pool's v2 API; pool data remains hosted by the pools. Upstream errors are returned as MCP tool errors. The endpoint requires the website API to be enabled in site configuration.

## Deployment

The project currently uses `@sveltejs/adapter-auto`. Select a deployment adapter for your host before deploying. Set `PUBLIC_SITE_URL` to the public origin when building.
