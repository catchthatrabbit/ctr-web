import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { z } from 'zod/v4';

const regionSchema = z.enum(['DE', 'FI', 'SG', 'HK', 'AM']).describe('Pool region code');
const addressSchema = z.string().regex(/^[0-9a-fA-F]{44}$/, 'Use a 44-character hex payout address');
const limitSchema = z.number().int().min(1).max(50).default(10);
const offsetSchema = z.number().int().min(0).max(100000).default(0);

export type McpRegion = z.infer<typeof regionSchema>;
export type PoolInfo = { name: string; description: string; server: string };
export type PoolDataReader = (region: McpRegion, endpoint: string, query?: URLSearchParams) => Promise<unknown>;

function result(data: unknown) {
	const value = { data };
	return { content: [{ type: 'text' as const, text: JSON.stringify(value) }], structuredContent: value };
}

function toolError(error: unknown) {
	return {
		isError: true,
		content: [{ type: 'text' as const, text: error instanceof Error ? error.message : 'Pool data unavailable' }]
	};
}

async function readTool(read: () => Promise<unknown>) {
	try {
		return result(await read());
	} catch (error) {
		return toolError(error);
	}
}

function paging(limit: number, offset: number, extra?: Record<string, string>) {
	return new URLSearchParams({ limit: String(limit), offset: String(offset), ...extra });
}

/** Public, read-only MCP surface. The server factory creates a fresh instance per request. */
export function createPoolMcpHandler(pools: Record<McpRegion, PoolInfo>, read: PoolDataReader) {
	return createMcpHandler(() => {
		const server = new McpServer({ name: 'catch-that-rabbit-pools', version: '1.0.0' });
		const annotations = { readOnlyHint: true, openWorldHint: true };

		server.registerTool('list_pools', {
			title: 'List Catch That Rabbit pools',
			description: 'List the five public mining pool regions and their mining server hostnames.',
			annotations
		}, async () => result(Object.entries(pools).map(([code, pool]) => ({
			code,
			name: pool.name,
			description: pool.description,
			server: pool.server
		}))));

		server.registerTool('get_pool_stats', {
			title: 'Get pool statistics',
			description: 'Get live hashrate, miners, blocks, and other public statistics for one pool.',
			inputSchema: z.object({ region: regionSchema }),
			annotations
		}, async ({ region }) => readTool(() => read(region, 'stats')));

		server.registerTool('get_pool_settings', {
			title: 'Get pool settings',
			description: 'Get public pool settings, including the pool fee and payment settings.',
			inputSchema: z.object({ region: regionSchema }),
			annotations
		}, async ({ region }) => readTool(() => read(region, 'settings')));

		server.registerTool('get_pool_blocks', {
			title: 'Get pool blocks',
			description: 'Get a bounded page of all, matured, immature, or candidate blocks.',
			inputSchema: z.object({
				region: regionSchema,
				kind: z.enum(['all', 'matured', 'immature', 'candidates']).default('all'),
				limit: limitSchema,
				offset: offsetSchema
			}),
			annotations
		}, async ({ region, kind, limit, offset }) => {
			const endpoint = kind === 'all' ? 'blocks' : `${kind === 'candidates' ? 'candidates' : kind}_blocks`;
			return readTool(() => read(region, endpoint, paging(limit, offset)));
		});

		server.registerTool('get_pool_payments', {
			title: 'Get pool payments',
			description: 'Get a bounded page of public pool payments, optionally filtered to a payout address.',
			inputSchema: z.object({
				region: regionSchema,
				address: addressSchema.optional(),
				limit: limitSchema,
				offset: offsetSchema
			}),
			annotations
		}, async ({ region, address, limit, offset }) =>
			readTool(() => read(region, address ? `payments/${address}` : 'payments', paging(limit, offset)))
		);

		server.registerTool('get_pool_account', {
			title: 'Get payout account',
			description: 'Get public mining balance, shares, and hashrate for a payout address.',
			inputSchema: z.object({ region: regionSchema, address: addressSchema }),
			annotations
		}, async ({ region, address }) => readTool(() => read(region, `accounts/${address}`)));

		server.registerTool('get_pool_workers', {
			title: 'Get account workers',
			description: 'Get a bounded page of public workers for a payout address, optionally filtered by status.',
			inputSchema: z.object({
				region: regionSchema,
				address: addressSchema,
				status: z.enum(['all', 'online', 'offline']).default('all'),
				limit: limitSchema,
				offset: offsetSchema
			}),
			annotations
		}, async ({ region, address, status, limit, offset }) => {
			const filter = status === 'all' ? undefined : { [status]: 'true' };
			return readTool(() => read(region, `workers_sorted/${address}`, paging(limit, offset, filter)));
		});

		return server;
	});
}
