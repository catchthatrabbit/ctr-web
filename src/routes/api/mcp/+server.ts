import type { RequestHandler } from '@sveltejs/kit';
import { pools } from '#lib/ctr/config.js';
import { createPoolMcpHandler, type McpRegion } from '#lib/server/poolMcp.js';

const maxRequestBytes = 16 * 1024;
const maxResponseBytes = 256 * 1024;

async function limitedText(response: Request | Response, maxBytes: number): Promise<string> {
	if (Number(response.headers.get('content-length') ?? 0) > maxBytes) throw new Error('Payload is too large');
	if (!response.body) return '';
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let text = '';
	let size = 0;
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		size += value.byteLength;
		if (size > maxBytes) {
			await reader.cancel();
			throw new Error('Payload is too large');
		}
		text += decoder.decode(value, { stream: true });
	}
	return text + decoder.decode();
}

const handleMcp: RequestHandler = async (event) => {
	const { request, url, fetch } = event;
	const origin = request.headers.get('origin');
	if (origin && ['localhost', '127.0.0.1'].includes(url.hostname)) {
		try {
			if (new URL(origin).hostname !== url.hostname) return new Response('Invalid origin', { status: 403 });
		} catch {
			return new Response('Invalid origin', { status: 403 });
		}
	}

	let forwarded = request;
	if (request.method === 'POST') {
		try {
			const body = await limitedText(request, maxRequestBytes);
			forwarded = new Request(request.url, {
				method: 'POST',
				headers: request.headers,
				body,
				signal: request.signal
			});
		} catch {
			return new Response('MCP request is too large', { status: 413 });
		}
	}

	const handler = createPoolMcpHandler(pools, async (region: McpRegion, endpoint, query) => {
		const path = `/api/pool/${region}/${endpoint}`;
		const target = query?.size ? `${path}?${query}` : path;
		const response = await fetch(target, {
			headers: { accept: 'application/json' },
			signal: AbortSignal.timeout(12000)
		});
		if (!response.ok) throw new Error(`Pool ${region} API unavailable (${response.status})`);
		const body = await limitedText(response, maxResponseBytes);
		try {
			return JSON.parse(body) as unknown;
		} catch {
			throw new Error(`Pool ${region} returned invalid JSON`);
		}
	});
	const response = await handler.fetch(forwarded);
	const headers = new Headers(response.headers);
	headers.set('cache-control', 'no-store');
	headers.set('Access-Control-Expose-Headers', 'Mcp-Session-Id, Mcp-Protocol-Version');
	return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};

export const GET = handleMcp;
export const POST = handleMcp;
export const DELETE = handleMcp;

export const OPTIONS: RequestHandler = () => new Response(null, {
	status: 204,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Mcp-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
		'Access-Control-Max-Age': '86400'
	}
});
