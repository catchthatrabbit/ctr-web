import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPoolMcpHandler } from '../src/lib/server/poolMcp.ts';

const pools = {
	DE: { name: 'DACH', description: 'Germany', server: 'de.example', api: 'https://api.example' },
	FI: { name: 'Nordic', description: 'Finland', server: 'fi.example' },
	SG: { name: 'ASEAN', description: 'Singapore', server: 'sg.example' },
	HK: { name: 'Far East', description: 'Hong Kong', server: 'hk.example' },
	AM: { name: 'America', description: 'United States', server: 'am.example' }
};

async function rpc(handler, id, method, params = {}) {
	const response = await handler.fetch(new Request('https://example.com/api/mcp', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json, text/event-stream',
			'mcp-protocol-version': '2025-11-25'
		},
		body: JSON.stringify({ jsonrpc: '2.0', id, method, params })
	}));
	assert.equal(response.status, 200);
	const body = await response.text();
	const message = body.split('\n').find((line) => line.startsWith('data: '));
	assert.ok(message, body);
	return JSON.parse(message.slice(6));
}

test('advertises public read-only tools without exposing upstream API origins', async () => {
	const handler = createPoolMcpHandler(pools, async () => { throw new Error('Unexpected fetch'); });
	const listed = await rpc(handler, 1, 'tools/list');
	assert.deepEqual(listed.result.tools.map((tool) => tool.name), [
		'list_pools', 'get_pool_stats', 'get_pool_settings', 'get_pool_blocks',
		'get_pool_payments', 'get_pool_account', 'get_pool_workers'
	]);
	assert.ok(listed.result.tools.every((tool) => tool.annotations.readOnlyHint));
	const result = await rpc(handler, 2, 'tools/call', { name: 'list_pools', arguments: {} });
	assert.equal(result.result.structuredContent.data.length, 5);
	assert.equal(result.result.structuredContent.data[0].server, 'de.example');
	assert.equal(result.result.structuredContent.data[0].api, undefined);
});

test('routes bounded queries and reports pool errors as MCP tool errors', async () => {
	const calls = [];
	const handler = createPoolMcpHandler(pools, async (region, endpoint, query) => {
		calls.push({ region, endpoint, query: query?.toString() });
		if (endpoint === 'stats') throw new Error('Pool DE API unavailable (502)');
		return { ok: true };
	});
	const blocks = await rpc(handler, 1, 'tools/call', {
		name: 'get_pool_blocks', arguments: { region: 'FI', kind: 'candidates', limit: 3, offset: 6 }
	});
	assert.equal(blocks.result.structuredContent.data.ok, true);
	assert.deepEqual(calls[0], { region: 'FI', endpoint: 'candidates_blocks', query: 'limit=3&offset=6' });
	const stats = await rpc(handler, 2, 'tools/call', {
		name: 'get_pool_stats', arguments: { region: 'DE' }
	});
	assert.equal(stats.result.isError, true);
	assert.match(stats.result.content[0].text, /502/);
	const invalid = await rpc(handler, 3, 'tools/call', {
		name: 'get_pool_blocks', arguments: { region: 'FI', limit: 51 }
	});
	assert.equal(invalid.result.isError, true);
	assert.equal(calls.length, 2);
});
