import { json, type RequestHandler } from '@sveltejs/kit';
import { parseXcbRate } from '#lib/ctr/api.js';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const currency = (params.currency ?? '').toLowerCase();
	if (!/^[a-z]{3}$/.test(currency)) return json({ error: 'Invalid currency' }, { status: 400 });
	try {
		const response = await fetch(`https://core.exposed/obp/v6.0.0/fx/xcb/${currency}`, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
		if (!response.ok) throw new Error('Exchange rate unavailable');
		const rate = parseXcbRate(await response.json(), currency);
		if (!rate) throw new Error('Invalid exchange rate');
		return json(rate, { headers: { 'cache-control': 'public, max-age=60' } });
	} catch {
		return json({ error: 'Exchange rate unavailable' }, { status: 502 });
	}
};
