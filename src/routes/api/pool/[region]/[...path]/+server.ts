import { json, type RequestHandler } from '@sveltejs/kit';
import { isRegion, pools } from '#lib/ctr/config.js';
import * as env from '$app/env/private';

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const region = (params.region ?? '').toUpperCase();
	if (!isRegion(region)) return json({ error: 'Unknown pool' }, { status: 400 });
	const path = params.path ?? '';
	if (!/^[a-zA-Z0-9_./-]+$/.test(path) || path.includes('..')) return json({ error: 'Invalid path' }, { status: 400 });
	const configuredOrigin = env[`CTR_POOL_API_${region}`] || pools[region].api;
	let origin: URL;
	try {
		origin = new URL(configuredOrigin);
		if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.pathname !== '/') throw new Error('Invalid API origin');
	} catch {
		return json({ error: 'Invalid pool API origin' }, { status: 500 });
	}
	const upstream = new URL(`/v2/api/${path}${url.search}`, origin);
	try {
		const response = await fetch(upstream, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
		const body = await response.text();
		return new Response(body, { status: response.status, headers: { 'content-type': response.headers.get('content-type') ?? 'application/json', 'cache-control': 'public, max-age=15' } });
	} catch {
		return json({ error: 'Pool API unavailable' }, { status: 502 });
	}
};
