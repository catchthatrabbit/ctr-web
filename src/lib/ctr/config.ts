export const pools = {
	DE: { name: 'DACH', description: 'Germany · Austria · Switzerland', server: 'de.catchthatrabbit.com', api: 'https://api-de.catchthatrabbit.com' },
	FI: { name: 'Nordic', description: 'Finland · Norway · Sweden', server: 'fi.catchthatrabbit.com', api: 'https://api-fi.catchthatrabbit.com' },
	SG: { name: 'ASEAN', description: 'Singapore · Thailand · Philippines', server: 'sg.catchthatrabbit.com', api: 'https://api-sg.catchthatrabbit.com' },
	HK: { name: 'Far East', description: 'Hong Kong · China · Japan', server: 'hk.catchthatrabbit.com', api: 'https://api-hk.catchthatrabbit.com' },
	AM: { name: 'America', description: 'United States · Mexico · Brazil', server: 'am.catchthatrabbit.com', api: 'https://api-am.catchthatrabbit.com' }
} as const;

export type Region = keyof typeof pools;
export const regions = Object.keys(pools) as Region[];
export const isRegion = (value: string): value is Region => value in pools;

export const formatHashrate = (value: number) => {
	if (!Number.isFinite(value)) return '—';
	const units = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s'];
	let n = value;
	let i = 0;
	while (Math.abs(n) >= 1000 && i < units.length - 1) { n /= 1000; i++; }
	return `${new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(n)} ${units[i]}`;
};

export const formatXcb = (value: number | string | undefined, unit: 'nucle' | 'core' = 'nucle') => {
	const n = Number(value ?? 0);
	return `${new Intl.NumberFormat('en', { maximumFractionDigits: 5 }).format(n / (unit === 'core' ? 1e18 : 1e9))} XCB`;
};

export const formatDate = (value: number | string | undefined) => {
	const n = Number(value);
	if (!n) return '—';
	return new Date(n < 1e12 ? n * 1000 : n).toLocaleString();
};
