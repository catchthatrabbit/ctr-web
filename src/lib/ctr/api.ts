export type WorkerRow = {
	name: string;
	worker: {
		hr: number;
		hr2: number;
		offline: boolean;
		lastBeat: number;
		decodedName?: string;
		fediverse?: boolean;
		fediverseUrl?: string;
	};
};

// The new workers_sorted endpoint returns [{ name, worker }].
export function workerRows(payload: unknown): WorkerRow[] {
	if (!payload || typeof payload !== 'object' || !('workers' in payload)) return [];
	const rows = payload.workers;
	if (!Array.isArray(rows)) return [];
	return rows.filter((row): row is WorkerRow =>
		Boolean(row && typeof row.name === 'string' && row.worker && typeof row.worker === 'object')
	);
}

export function parseXcbRate(payload: unknown, currency: string): { price: number; currency: string; effectiveDate?: string } | null {
	if (!payload || typeof payload !== 'object') return null;
	const value = payload as Record<string, unknown>;
	if (String(value.from_currency_code).toUpperCase() !== 'XCB') return null;
	if (String(value.to_currency_code).toUpperCase() !== currency.toUpperCase()) return null;
	const price = Number(value.conversion_value);
	if (!Number.isFinite(price) || price <= 0) return null;
	return {
		price,
		currency: currency.toUpperCase(),
		...(typeof value.effective_date === 'string' && { effectiveDate: value.effective_date })
	};
}
