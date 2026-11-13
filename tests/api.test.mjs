import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseXcbRate, workerRows } from '../src/lib/ctr/api.ts';

test('reads workers_sorted v2 rows and keeps the worker metadata', () => {
	const payload = {
		workersTotal: 1,
		workers: [{
			name: '_alice_example_social-rig1',
			worker: {
				hr: 1200,
				hr2: 1100,
				offline: false,
				lastBeat: 1794500000,
				decodedName: 'rig1',
				fediverse: true,
				fediverseUrl: 'https://example.social/@alice#rig1'
			}
		}]
	};
	assert.deepEqual(workerRows(payload), payload.workers);
});

test('ignores the discontinued sorted worker shape', () => {
	assert.deepEqual(workerRows({ workers: [{ Key: 'rig1', Worker: { hr: 1200 } }] }), []);
	assert.deepEqual(workerRows({ workers: null }), []);
});

test('reads the direct XCB to fiat rate', () => {
	assert.deepEqual(parseXcbRate({ from_currency_code: 'XCB', to_currency_code: 'EUR', conversion_value: 0.02071265, inverse_conversion_value: 48.2796744984345, effective_date: '2026-11-13T00:00:00.000Z' }, 'eur'), {
		price: 0.02071265,
		currency: 'EUR',
		effectiveDate: '2026-11-13T00:00:00.000Z'
	});
	assert.equal(parseXcbRate({ from_currency_code: 'EUR', to_currency_code: 'XCB', conversion_value: 48.2796744984345 }, 'eur'), null);
	assert.equal(parseXcbRate({ from_currency_code: 'XCB', to_currency_code: 'EUR', conversion_value: 0 }, 'eur'), null);
});
