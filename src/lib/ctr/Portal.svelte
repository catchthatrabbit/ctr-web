<script lang="ts">
	import { locale as localeStore } from '#lib/helpers/i18n.js';
	import { ui } from './translations.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { pools, regions, isRegion, formatHashrate, formatXcb, formatDate, type Region } from './config.js';
	import { sloganSecondary, poolSince, poolNames } from './branding.js';
	import Fee from './Fee.svelte';
	import { machines } from './machines.js';
	import { currencies } from './currencies.js';
	import { validateCoreId } from '#lib/helpers/coreIdValidation.js';
	import { workerRows as parseWorkerRows } from './api.js';

	let { path = '/' }: { path?: string } = $props();
	const segments = $derived(path.split('/').filter(Boolean));
	const kind = $derived(segments[0] ?? 'home');
	const walletFromPath = $derived(['wallet-overview', 'wallet', 'w', 'coreid'].includes(kind) ? (segments[1] ?? '') : '');
	let region = $state<Region>('DE');
	let walletInput = $state('');
	let wallet = $state('');
	let workerName = $state('worker1');
	let workerMode = $state<'plain' | 'fediverse'>('plain');
	let fediverseDomain = $state('');
	let secondaryRegion = $state<Region>('FI');
	let tab = $state('matured');
	let pageNumber = $state(0);
	let statusFilter = $state('all');
	let data = $state<any>(null);
	let stats = $state<Record<string, any>>({});
	let statsLoaded = $state(false);
	let recentBlocks = $state<any[]>([]);
	let loading = $state(false);
	let error = $state('');
	let notice = $state('');
	let currency = $state('EUR');
	let hashrate = $state(10000);
	let selectedMachine = $state('');
	let watts = $state(150);
	let electricityRate = $state(0.25);
	let extraExpenses = $state(0);
	let price = $state(0);
	let priceLoading = $state(false);
	let searching = $state(false);

	const pool = $derived(pools[region]);
	const pathPool = $derived(segments[0] === 'coreid' && isRegion((segments[2] ?? '').toUpperCase()) ? (segments[2] ?? '').toUpperCase() as Region : undefined);
	const walletAddress = $derived(walletFromPath || wallet);
	const selectedWallet = $derived(page.url.searchParams.get('wallet') ?? '');
	const workerKey = $derived(segments[0] === 'coreid' && segments[3] === 'worker' && segments[4] ? decodeURIComponent(segments[4]) : undefined);
	const statsList = $derived(regions.map(code => ({ code, ...pools[code], stats: stats[code] })));
	const totalHashrate = $derived(statsList.reduce((sum, item) => sum + Number(item.stats?.hashrate ?? 0), 0));
	const totalMiners = $derived(statsList.reduce((sum, item) => sum + Number(item.stats?.minersTotal ?? 0), 0));
	const totalBlocks = $derived(statsList.reduce((sum, item) => sum + Number(item.stats?.maturedTotal ?? 0), 0));
	const anyStats = $derived(Object.keys(stats).length > 0);
	const blockReward = $derived(Number(stats[region]?.blockReward ?? 0) / 1e18);
	const difficulty = $derived(Math.max(0, ...(stats[region]?.nodes ?? []).map((node: { difficulty: string }) => Number(node.difficulty) || 0)));
	const rewardMonthly = $derived(difficulty > 0 && hashrate > 0 ? (hashrate / difficulty) * 86400 * blockReward * 30 : 0);
	const incomeMonthly = $derived(rewardMonthly * price);
	const powerMonthly = $derived((watts * 24 * 30 / 1000) * electricityRate);
	const profitMonthly = $derived(incomeMonthly - powerMonthly - extraExpenses);
	const walletFiat = (amount: number | string | undefined) => price > 0
		? new Intl.NumberFormat($localeStore, { style: 'currency', currency: 'USD' }).format(Number(amount ?? 0) / 1e9 * price)
		: '—';

	async function api(code: Region, endpoint: string): Promise<any> {
		const response = await fetch(`/api/pool/${code}/${endpoint}`);
		if (!response.ok) throw new Error(`${ui('Unable to load pool data', $localeStore)}: ${pools[code].name}`);
		return response.json();
	}

	async function loadStats() {
		const results = await Promise.allSettled(regions.map(code => api(code, 'stats')));
		const next: Record<string, any> = {};
		results.forEach((result, index) => { if (result.status === 'fulfilled') next[regions[index]] = result.value; });
		stats = next;
		statsLoaded = true;
		const blocks = await Promise.allSettled(regions.map(code => api(code, 'matured_blocks?limit=3&offset=0')));
		recentBlocks = blocks.flatMap((result, index) => result.status === 'fulfilled' ? (result.value.matured ?? []).map((block: any) => ({ ...block, region: regions[index] })) : []).sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
	}

	async function loadPage(currentKind: string, currentRegion: Region, currentTab: string, currentPage: number, currentWallet: string, currentFilter: string, currentWorker?: string) {
		loading = true;
		error = '';
		data = null;
		try {
			const offset = currentPage * 10;
			if (currentKind === 'blocks') {
				const endpoint = currentTab === 'immature' ? 'immature_blocks' : currentTab === 'candidates' ? 'candidates_blocks' : 'matured_blocks';
				data = await api(currentRegion, `${endpoint}?limit=10&offset=${offset}`);
			} else if (currentKind === 'payments') {
				data = await api(currentRegion, `payments?limit=10&offset=${offset}`);
			} else if (currentKind === 'miners') {
				data = await api(currentRegion, `miners?limit=10&offset=${offset}`);
			} else if (currentWallet && ['wallet-overview', 'wallet', 'w', 'coreid'].includes(currentKind)) {
				const account = await api(currentRegion, `accounts/${encodeURIComponent(currentWallet)}`);
				const [workers, payments, worker] = await Promise.allSettled([
					api(currentRegion, `workers_sorted/${encodeURIComponent(currentWallet)}?limit=10&offset=${offset}${currentFilter === 'online' ? '&online=true' : currentFilter === 'offline' ? '&offline=true' : ''}`),
					api(currentRegion, `payments/${encodeURIComponent(currentWallet)}?limit=10&offset=${offset}`),
					currentWorker ? api(currentRegion, `worker/${encodeURIComponent(currentWallet)}?worker=${encodeURIComponent(currentWorker)}`) : Promise.resolve(null)
				]);
				data = { account, workers: workers.status === 'fulfilled' ? workers.value : null, payments: payments.status === 'fulfilled' ? payments.value : null, worker: worker.status === 'fulfilled' ? worker.value : null };
			}
		} catch (cause) {
			error = cause instanceof Error ? cause.message : ui('Pool data is unavailable', $localeStore);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		const currentKind = kind;
		const currentRegion = region;
		const currentTab = tab;
		const currentPage = pageNumber;
		const currentWallet = walletAddress;
		const currentFilter = statusFilter;
		const currentWorker = workerKey;
		void loadPage(currentKind, currentRegion, currentTab, currentPage, currentWallet, currentFilter, currentWorker);
	});

	$effect(() => { void loadStats(); });
	$effect(() => {
		if (pathPool) region = pathPool;
		if (kind === 'go-live') {
			walletInput = segments[1] && segments[1] !== '_' ? segments[1] : '';
			const chosen = (segments[2] ?? '').toUpperCase();
			const backup = (segments[3] ?? '').toUpperCase();
			if (isRegion(chosen)) region = chosen;
			if (isRegion(backup)) secondaryRegion = backup;
		}
	});

	$effect(() => {
		const currentCurrency = kind === 'calculator' ? currency : walletAddress ? 'USD' : null;
		if (!currentCurrency) return;
		const controller = new AbortController();
		priceLoading = true;
		price = 0;
		fetch(`/api/price/${currentCurrency.toLowerCase()}`, { signal: controller.signal })
			.then(response => response.ok ? response.json() : Promise.reject())
			.then(value => { if (!controller.signal.aborted) price = Number(value.price) || 0; })
			.catch(() => { if (!controller.signal.aborted) price = 0; })
			.finally(() => { if (!controller.signal.aborted) priceLoading = false; });
		return () => controller.abort();
	});

	async function openWallet() {
		const value = walletInput.replace(/\s+/g, '').trim();
		if (!value) { notice = ui('Enter a wallet address or Core ID.', $localeStore); return; }
		searching = true;
		const matches = await Promise.allSettled(regions.map(code => api(code, `accounts/${encodeURIComponent(value)}`)));
		searching = false;
		const found = regions.filter((_, index) => matches[index].status === 'fulfilled');
		if (found.length > 1) void goto(`/pool-selection?wallet=${encodeURIComponent(value)}`);
		else void goto(`/coreid/${encodeURIComponent(value)}/${found[0] ?? 'DE'}`);
	}

	function copy(value: string) {
		void navigator.clipboard.writeText(value).then(() => { notice = ui('Copied to clipboard', $localeStore); setTimeout(() => notice = '', 3000); });
	}

	function downloadConfig() {
		const address = walletInput.replace(/\s+/g, '').trim();
		const plain = workerName.trim();
		if (!validateCoreId(address, 'coreId').isValid || !plain || !/^[a-zA-Z0-9_-]+$/.test(plain)) { notice = ui('Enter a valid Core wallet and a worker name using letters, numbers, _ or -.', $localeStore); return; }
		if (workerMode === 'fediverse' && !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fediverseDomain)) { notice = ui('Enter a valid Fediverse domain.', $localeStore); return; }
		const worker = workerMode === 'plain' ? plain : `_${plain.toLowerCase()}_${fediverseDomain.toLowerCase().replace(/\./g, '_')}`;
		const text = [`wallet=${address.toLowerCase()}`, `worker=${worker}`, `server[1]=${pools[region].server}`, 'port[1]=8008', `server[2]=${pools[secondaryRegion].server}`, 'port[2]=8008'].join('\n');
		const url = URL.createObjectURL(new Blob([text + '\n'], { type: 'text/plain' }));
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'pool.cfg';
		anchor.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
		notice = ui('pool.cfg downloaded', $localeStore);
	}

	function rowsOf(value: any): any[] {
		if (!value) return [];
		if (Array.isArray(value)) return value;
		if (typeof value === 'object') return Object.entries(value).map(([Key, Worker]) => ({ Key, Worker }));
		return [];
	}

	function useMachine(name: string) {
		selectedMachine = name;
		const machine = machines.find(item => item.name === name);
		if (machine) {
			hashrate = machine.hashrate;
			watts = machine.powerConsumption ?? 0;
		}
	}

	const rows = $derived(kind === 'blocks' ? rowsOf(data?.[tab]) : kind === 'payments' ? rowsOf(data?.payments) : kind === 'miners' ? rowsOf(data?.miners) : []);
	const workerRows = $derived(parseWorkerRows(data?.workers));
	const paymentRows = $derived(rowsOf(data?.payments?.payments));
</script>

<svelte:head>
	<title>{kind === 'home' ? 'Catch That Rabbit' : `${kind.replaceAll('-', ' ')} | Catch That Rabbit`}</title>
	<meta name="description" content="Catch That Rabbit Core Blockchain mining pool. Explore pool stats, miners, blocks, payments and your wallet." />
</svelte:head>

{#if notice}<div class="notice" role="status">{notice}<button onclick={() => notice = ''} aria-label="Dismiss">×</button></div>{/if}

{#if kind === 'home'}
	<section class="hero">
		<div class="hero-copy">
			<img class="section-rabbit search-rabbit" src="/img/section-rabbits/rabbit-miners.svg" alt="" aria-hidden="true" />
			<p class="eyebrow">CATCH THAT RABBIT · {ui(poolSince, $localeStore).toUpperCase()}</p>
			<h1>Catch That<br /><em>Rabbit.</em></h1>
			<p class="hero-slogan-secondary">{ui(sloganSecondary, $localeStore)}</p>
			<p class="hero-pools"><strong>{ui("XCB Pools:", $localeStore)}</strong> {poolNames}</p>
			<p class="lead">{ui("Core Blockchain mining pool - transparent pool for XCB rewards.", $localeStore)}</p>
			<form class="wallet-search" onsubmit={(event) => { event.preventDefault(); openWallet(); }}>
				<input aria-label="Wallet address or Core ID" placeholder={ui("Enter your wallet address or Core ID", $localeStore)} bind:value={walletInput} />
				<button type="submit" disabled={searching}>{searching ? ui("Searching…", $localeStore) : ui("View wallet →", $localeStore)}</button>
			</form>
			<div class="hero-links"><a href="/start-mining">{ui("How to start mining ↗", $localeStore)}</a><a href="/calculator">{ui("Estimate profit ↗", $localeStore)}</a><a href="/fee">{ui("Fee ↗", $localeStore)}</a></div>
		</div>
		<img class="rabbit" src="/img/thatRabbitImg.png" alt="Catch That Rabbit mascot" />
	</section>
	<section class="section"><div class="section-heading"><div><img class="section-rabbit" src="/img/section-rabbits/rabbit-pool-statistics.svg" alt="" aria-hidden="true" /><p class="eyebrow">{ui("LIVE NETWORK", $localeStore)}</p><h2>{ui("Across every pool", $localeStore)}</h2></div><span class="live"><span></span> {ui("Live statistics", $localeStore)}</span></div>
		{#if statsLoaded && !anyStats}<p class="data-warning" role="status">{ui("Live pool data is temporarily unavailable. Please try again later.", $localeStore)}</p>{/if}
		<div class="stats-grid"><div class="stat"><small>{ui("Combined hashrate", $localeStore)}</small><strong>{anyStats ? formatHashrate(totalHashrate) : '—'}</strong></div><div class="stat"><small>{ui("Active miners", $localeStore)}</small><strong>{anyStats ? totalMiners.toLocaleString() : '—'}</strong></div><div class="stat"><small>{ui("Matured blocks", $localeStore)}</small><strong>{anyStats ? totalBlocks.toLocaleString() : '—'}</strong></div><div class="stat"><small>{ui("Mining regions", $localeStore)}</small><strong>05 <span>{ui("worldwide", $localeStore)}</span></strong></div></div>
		<div class="section-heading compact"><div><img class="section-rabbit" src="/img/section-rabbits/dive.svg" alt="" aria-hidden="true" /><h3>{ui("Choose your pool", $localeStore)}</h3></div><a href="/pool-selection">{ui("Compare pools →", $localeStore)}</a></div>
		<div class="pool-grid">{#each statsList as item}<a class="pool-card" href={`/go-live/_/${item.code}`}><span class="pool-code">{item.code}</span><h3>{item.name}</h3><p>{ui(item.description, $localeStore)}</p><div><span>{item.stats ? formatHashrate(item.stats.hashrate ?? 0) : '—'}</span><span>↗</span></div></a>{/each}</div>
		<div class="section-heading compact"><div><img class="section-rabbit" src="/img/section-rabbits/head-and-neck-above.svg" alt="" aria-hidden="true" /><h3>{ui("Recent blocks", $localeStore)}</h3></div><a href="/blocks">{ui("View all blocks →", $localeStore)}</a></div>
		<div class="table-wrap"><table><thead><tr><th>{ui("Block", $localeStore)}</th><th>{ui("Pool", $localeStore)}</th><th>{ui("Reward", $localeStore)}</th><th>{ui("Found", $localeStore)}</th></tr></thead><tbody>{#each recentBlocks as block}<tr><td><a href={`https://blockindex.net/block/${block.hash}`} target="_blank" rel="noreferrer">#{block.height} ↗</a></td><td>{pools[block.region as Region].name}</td><td>{formatXcb(block.reward, 'core')}</td><td>{formatDate(block.timestamp)}</td></tr>{:else}<tr><td colspan="4" class="empty">{statsLoaded ? ui("Recent blocks are unavailable.", $localeStore) : ui("Loading recent blocks…", $localeStore)}</td></tr>{/each}</tbody></table></div>
	</section>
	<section class="cta"><div><p class="eyebrow">{ui("READY TO JOIN?", $localeStore)}</p><h2>{ui("Put your miner to work.", $localeStore)}</h2><p>{ui("Configure a pool, choose a worker name and download your miner settings.", $localeStore)}</p></div><a class="button light" href="/go-live">{ui("Launch miner →", $localeStore)}</a></section>
{:else if kind === 'pool-selection'}
	<section class="page-intro"><img class="section-rabbit" src="/img/section-rabbits/dive.svg" alt="" aria-hidden="true" /><p class="eyebrow">{ui("GLOBAL POOL NETWORK", $localeStore)}</p><h1>{ui("Find your pool.", $localeStore)}</h1><p>{ui("Pick a pool near you for a responsive connection. All regions share the same simple setup.", $localeStore)}</p></section>
	<div class="pool-grid full">{#each statsList as item}<div class="pool-card"><span class="pool-code">{item.code}</span><h2>{item.name}</h2><p>{ui(item.description, $localeStore)}</p><div class="pool-detail"><span>{ui("Hashrate", $localeStore)}</span><strong>{item.stats ? formatHashrate(item.stats.hashrate ?? 0) : '—'}</strong></div><div class="pool-detail"><span>{ui("Miners", $localeStore)}</span><strong>{item.stats?.minersTotal ?? '—'}</strong></div><div class="pool-detail"><span>{ui("Server", $localeStore)}</span><code>{item.server}:8008</code></div><a class="button" href={selectedWallet ? `/coreid/${encodeURIComponent(selectedWallet)}/${item.code}` : `/go-live/_/${item.code}`}>{selectedWallet ? ui("View wallet", $localeStore) : ui("Use this pool", $localeStore)} →</a></div>{/each}</div>
{:else if kind === 'go-live' || kind === 'start-mining'}
	<section class="page-intro"><img class="section-rabbit" src={kind === 'go-live' ? '/img/section-rabbits/head-down.svg' : '/img/section-rabbits/head-and-neck-above.svg'} alt="" aria-hidden="true" /><p class="eyebrow">{ui("START MINING", $localeStore)}</p><h1>{kind === 'go-live' ? ui("Launch your miner.", $localeStore) : ui("Start catching rewards.", $localeStore)}</h1><p>{ui("Set up your Core wallet and connect a worker to one of our pools.", $localeStore)}</p></section>
	<div class="two-column"><div class="panel"><div class="step">01 / {ui('YOUR IDENTITY', $localeStore)}</div><label>{ui("Core wallet address or Core ID", $localeStore)}<input placeholder={ui("Your wallet address", $localeStore)} bind:value={walletInput} /></label><label>{ui("Worker name", $localeStore)}<input placeholder="worker1" bind:value={workerName} /></label><div class="segmented" class:with-domain={workerMode === 'fediverse'}><button class:active={workerMode === 'plain'} onclick={() => workerMode = 'plain'}>{ui('Plain name', $localeStore)}</button><button class:active={workerMode === 'fediverse'} onclick={() => workerMode = 'fediverse'}>{ui('Fediverse', $localeStore)}</button></div>{#if workerMode === 'fediverse'}<label>{ui("Fediverse domain", $localeStore)}<input placeholder="coretalk.space" bind:value={fediverseDomain} /></label>{/if}<div class="step">02 / {ui('POOLS', $localeStore)}</div><label>{ui("Primary pool", $localeStore)}<select bind:value={region}>{#each regions as code}<option value={code}>{pools[code].name} — {code}</option>{/each}</select></label><label>{ui("Backup pool", $localeStore)}<select bind:value={secondaryRegion}>{#each regions as code}<option value={code}>{pools[code].name} — {code}</option>{/each}</select></label><button class="button wide" onclick={downloadConfig}>{ui("Download pool.cfg ↓", $localeStore)}</button></div><div class="panel guide"><div class="step">{ui("QUICK SETUP", $localeStore)}</div><h2>{ui("Three steps to mining", $localeStore)}</h2><ol><li><strong>{ui("Get a Core wallet", $localeStore)}</strong><p>{ui("Use your wallet address to receive pool rewards.", $localeStore)}</p></li><li><strong>{ui("Download your configuration", $localeStore)}</strong><p>{ui("Choose a primary and backup pool, then save", $localeStore)} <code>pool.cfg</code>.</p></li><li><strong>{ui("Start your miner", $localeStore)}</strong><p>{ui("Place the file beside CoreMiner and run your miner.", $localeStore)}</p></li></ol><div class="config-preview"><span>{ui("CONNECTION PREVIEW", $localeStore)}</span><code>{pools[region].server}:8008</code><button onclick={() => copy(`${pools[region].server}:8008`)}>{ui("Copy", $localeStore)}</button></div><a href="https://github.com/catchthatrabbit/coreminer/releases" target="_blank" rel="noreferrer">{ui("Download CoreMiner ↗", $localeStore)}</a></div></div>
{:else if kind === 'fee'}
	<Fee />
{:else if kind === 'calculator'}
	<section class="page-intro"><p class="eyebrow">{ui("MINING TOOLS", $localeStore)}</p><h1>{ui("Profit calculator.", $localeStore)}</h1><p>{ui("Estimate mining rewards using live network difficulty and XCB exchange rates.", $localeStore)}</p></section>
	<div class="two-column"><div class="panel"><label>{ui("Mining device", $localeStore)}<select value={selectedMachine} onchange={(event) => useMachine(event.currentTarget.value)}><option value="">{ui("Custom hashrate", $localeStore)}</option>{#each machines as machine}<option value={machine.name}>{machine.name}</option>{/each}</select></label><label>{ui("Hashrate (H/s)", $localeStore)}<input type="number" min="1" bind:value={hashrate} /></label><label>{ui("Power consumption (W)", $localeStore)}<input type="number" min="0" bind:value={watts} /></label><label>{ui("Electricity cost per kWh", $localeStore)}<input type="number" min="0" step="0.01" bind:value={electricityRate} /></label><label>{ui("Other monthly expenses", $localeStore)}<input type="number" min="0" bind:value={extraExpenses} /></label><label>{ui("Currency", $localeStore)}<select bind:value={currency}>{#each currencies as item}<option value={item.value}>{item.value} — {item.name}</option>{/each}</select></label><label>{ui("Network pool", $localeStore)}<select bind:value={region}>{#each regions as code}<option value={code}>{pools[code].name}</option>{/each}</select></label></div><div class="panel result"><span class="step">{ui("MONTHLY ESTIMATE", $localeStore)}</span><small>{ui("Estimated profit", $localeStore)}</small><strong class:negative={profitMonthly < 0}>{priceLoading ? ui("Loading…", $localeStore) : price ? new Intl.NumberFormat($localeStore, { style: 'currency', currency }).format(profitMonthly) : ui("Exchange rate unavailable", $localeStore)}</strong><div class="pool-detail"><span>{ui("XCB earned", $localeStore)}</span><b>{rewardMonthly.toFixed(4)} XCB</b></div><div class="pool-detail"><span>{ui("Gross revenue", $localeStore)}</span><b>{new Intl.NumberFormat($localeStore, { style: 'currency', currency }).format(incomeMonthly)}</b></div><div class="pool-detail"><span>{ui("Electricity", $localeStore)}</span><b>− {new Intl.NumberFormat($localeStore, { style: 'currency', currency }).format(powerMonthly)}</b></div><div class="pool-detail"><span>{ui("Other expenses", $localeStore)}</span><b>− {new Intl.NumberFormat($localeStore, { style: 'currency', currency }).format(extraExpenses)}</b></div><p>{ui("Based on current network difficulty. Actual rewards and prices vary.", $localeStore)}</p></div></div>
{:else if kind === 'blocks' || kind === 'payments' || kind === 'miners'}
	<section class="page-intro"><img class="section-rabbit" src={kind === 'blocks' ? '/img/section-rabbits/tails-above.svg' : kind === 'payments' ? '/img/section-rabbits/head-and-neck-hand-above.svg' : '/img/section-rabbits/head-above.svg'} alt="" aria-hidden="true" /><p class="eyebrow">{ui("POOL EXPLORER", $localeStore)}</p><h1>{ui(kind === 'blocks' ? 'Recent blocks.' : kind === 'payments' ? 'Pool payments.' : 'Active miners.', $localeStore)}</h1><p>{ui(kind === 'blocks' ? 'See candidate, immature and matured blocks.' : kind === 'payments' ? 'Browse recent rewards sent by the pool.' : 'Explore miners contributing to the network.', $localeStore)}</p></section>
	<div class="toolbar"><label>{ui("Pool", $localeStore)} <select bind:value={region}>{#each regions as code}<option value={code}>{pools[code].name} · {code}</option>{/each}</select></label>{#if kind === 'blocks'}<div class="segmented"><button class:active={tab === 'matured'} onclick={() => { tab = 'matured'; pageNumber = 0; }}>{ui("Matured", $localeStore)}</button><button class:active={tab === 'immature'} onclick={() => { tab = 'immature'; pageNumber = 0; }}>{ui("Immature", $localeStore)}</button><button class:active={tab === 'candidates'} onclick={() => { tab = 'candidates'; pageNumber = 0; }}>{ui("Candidates", $localeStore)}</button></div>{/if}</div>
	<div class="table-wrap"><table><thead><tr>{#if kind === 'blocks'}<th>{ui("Block", $localeStore)}</th><th>{ui("Hash", $localeStore)}</th><th>{ui("Reward", $localeStore)}</th><th>{ui("Time", $localeStore)}</th>{:else if kind === 'payments'}<th>{ui("Recipient", $localeStore)}</th><th>{ui("Transaction", $localeStore)}</th><th>{ui("Amount", $localeStore)}</th><th>{ui("Time", $localeStore)}</th>{:else}<th>{ui("Miner", $localeStore)}</th><th>{ui("Hashrate", $localeStore)}</th><th>{ui("Status", $localeStore)}</th><th>{ui("Last share", $localeStore)}</th>{/if}</tr></thead><tbody>{#each rows as row}{#if kind === 'blocks'}<tr><td>#{row.height}</td><td><a href={`https://blockindex.net/block/${row.hash}`} target="_blank" rel="noreferrer">{String(row.hash ?? '').slice(0, 20)}… ↗</a></td><td>{formatXcb(row.reward, 'core')}</td><td>{formatDate(row.timestamp)}</td></tr>{:else if kind === 'payments'}<tr><td><a href={`/wallet-overview/${row.address}`}>{String(row.address ?? '').slice(0, 18)}…</a></td><td><a href={`https://blockindex.net/tx/${row.tx}`} target="_blank" rel="noreferrer">{String(row.tx ?? '').slice(0, 18)}… ↗</a></td><td>{formatXcb(row.amount)}</td><td>{formatDate(row.timestamp)}</td></tr>{:else}<tr><td><a href={`/wallet-overview/${String(row.Key ?? '').split('.')[0]}`}>{row.Key}</a></td><td>{formatHashrate(row.Worker?.hr ?? row.hr ?? 0)}</td><td><span class:offline={row.Worker?.offline ?? row.offline} class="status">{row.Worker?.offline ?? row.offline ? ui("Offline", $localeStore) : ui("Online", $localeStore)}</span></td><td>{formatDate(row.Worker?.lastBeat ?? row.lastBeat)}</td></tr>{/if}{:else}<tr><td colspan="4" class="empty">{loading ? ui("Loading pool activity…", $localeStore) : error || ui("No records found.", $localeStore)}</td></tr>{/each}</tbody></table></div>
	<div class="pagination"><button disabled={pageNumber === 0 || loading} onclick={() => pageNumber--}>← {ui('Previous', $localeStore)}</button><span>{ui('Page', $localeStore)} {pageNumber + 1}</span><button disabled={rows.length < 10 || loading} onclick={() => pageNumber++}>{ui('Next', $localeStore)} →</button></div>
{:else if walletAddress}
		<section class="page-intro"><img class="section-rabbit" src="/img/section-rabbits/rabbit-miners.svg" alt="" aria-hidden="true" /><p class="eyebrow">{ui("WALLET OVERVIEW", $localeStore)}</p><h1>{ui(workerKey ? 'Worker details.' : 'Your mining at a glance.', $localeStore)}</h1><p class="address">{walletAddress} <button onclick={() => copy(walletAddress)}>Copy</button></p></section>
	<div class="toolbar"><label>{ui("Pool", $localeStore)} <select bind:value={region}>{#each regions as code}<option value={code}>{pools[code].name} · {code}</option>{/each}</select></label><a class="button small" href={`/go-live/${walletAddress}/${region}`}>{ui("Launch another miner →", $localeStore)}</a></div>
	{#if error}<div class="empty panel">{error}. {ui('Try another pool or check the address.', $localeStore)}</div>{:else if loading}<div class="empty panel">{ui("Loading wallet…", $localeStore)}</div>{:else if data?.account}
		<div class="stats-grid"><div class="stat"><small>{ui("Current hashrate", $localeStore)}</small><strong>{formatHashrate(data.account.currentHashrate ?? 0)}</strong></div><div class="stat"><small>{ui("Balance", $localeStore)}</small><strong>{formatXcb(data.account.stats?.balance)}</strong><small>≈ {walletFiat(data.account.stats?.balance)}</small></div><div class="stat"><small>{ui("Online workers", $localeStore)}</small><strong>{data.account.workersOnline ?? 0}</strong></div><div class="stat"><small>{ui("Total paid", $localeStore)}</small><strong>{formatXcb(data.account.stats?.paid)}</strong></div></div>
		{#if data.account.profitability || data.account.feePrediction}<div class="panel account-estimate"><h2>{ui("Mining estimate", $localeStore)}</h2>{#if data.account.profitability}<div class="pool-detail"><span>{ui("Estimated 30-day reward", $localeStore)}</span><strong>{data.account.profitability.estimatedCoinsPer30dLong} XCB</strong></div>{/if}{#if data.account.feePrediction}<div class="pool-detail"><span>{ui("Predicted pool fee", $localeStore)}</span><strong>{data.account.feePrediction.total?.predictedNetPoolFeePercentOfGross ?? data.account.feePrediction.poolFeePercent}%</strong></div>{#if data.account.feePrediction.nftFeeWaiverApplied}<p>{ui("Eligible NFT fee waiver applied to this estimate.", $localeStore)}</p>{/if}{/if}</div>{/if}
		{#if workerKey}<div class="panel"><h2>{data.worker?.decodedName ?? workerKey}</h2>{#if data.worker}<p>{ui('Hashrate ~30m:', $localeStore)} {formatHashrate(data.worker.hashrateShortHs ?? 0)}</p><p>{ui('Hashrate ~3h:', $localeStore)} {formatHashrate(data.worker.hashrateLongHs ?? 0)}</p><p>{ui('Last share:', $localeStore)} {formatDate(data.worker.lastShareAt)}</p><p>{ui('Status:', $localeStore)} {data.worker.offline ? ui("Offline", $localeStore) : ui("Online", $localeStore)}</p>{#if data.worker.profitability}<p>{ui('Estimated 30-day reward:', $localeStore)} {data.worker.profitability.estimatedCoinsPer30dLong} XCB</p>{/if}{#if data.worker.fediverseUrl}<p><a href={data.worker.fediverseUrl} target="_blank" rel="noreferrer">{ui("Fediverse profile ↗", $localeStore)}</a></p>{/if}{:else}<p>{ui("Worker data is unavailable in this pool.", $localeStore)}</p>{/if}<a href={`/coreid/${walletAddress}/${region}`}>{ui("← Back to wallet", $localeStore)}</a></div>{:else}
		<div class="section-heading compact"><h2>{ui("Workers", $localeStore)}</h2><div class="segmented"><button class:active={statusFilter === 'all'} onclick={() => statusFilter = 'all'}>All</button><button class:active={statusFilter === 'online'} onclick={() => statusFilter = 'online'}>Online</button><button class:active={statusFilter === 'offline'} onclick={() => statusFilter = 'offline'}>Offline</button></div></div><div class="table-wrap"><table><thead><tr><th>{ui("Worker", $localeStore)}</th><th>{ui("Hashrate", $localeStore)}</th><th>{ui("Status", $localeStore)}</th><th>{ui("Last share", $localeStore)}</th></tr></thead><tbody>{#each workerRows as row}<tr><td><a href={`/coreid/${walletAddress}/${region}/worker/${encodeURIComponent(row.name)}`}>{row.worker.decodedName ?? row.name}</a></td><td>{formatHashrate(row.worker.hr ?? 0)}</td><td><span class:offline={row.worker.offline} class="status">{row.worker.offline ? ui("Offline", $localeStore) : ui("Online", $localeStore)}</span></td><td>{formatDate(row.worker.lastBeat)}</td></tr>{:else}<tr><td colspan="4" class="empty">{ui("No workers found.", $localeStore)}</td></tr>{/each}</tbody></table></div>
		<div class="section-heading compact"><h2>{ui("Recent payments", $localeStore)}</h2></div><div class="table-wrap"><table><thead><tr><th>{ui("Transaction", $localeStore)}</th><th>{ui("Amount", $localeStore)}</th><th>{ui("USD estimate", $localeStore)}</th><th>{ui("Time", $localeStore)}</th></tr></thead><tbody>{#each paymentRows as row}<tr><td><a href={`https://blockindex.net/tx/${row.tx}`} target="_blank" rel="noreferrer">{String(row.tx ?? '').slice(0, 24)}… ↗</a></td><td>{formatXcb(row.amount)}</td><td>{walletFiat(row.amount)}</td><td>{formatDate(row.timestamp)}</td></tr>{:else}<tr><td colspan="4" class="empty">{ui("No payments found.", $localeStore)}</td></tr>{/each}</tbody></table></div>
		<div class="pagination"><button disabled={pageNumber === 0} onclick={() => pageNumber--}>← {ui('Previous', $localeStore)}</button><span>{ui('Page', $localeStore)} {pageNumber + 1}</span><button disabled={workerRows.length < 10} onclick={() => pageNumber++}>{ui('Next', $localeStore)} →</button></div>{/if}
	{/if}
{:else if kind === 'contact'}
		<section class="page-intro"><img class="section-rabbit" src="/img/section-rabbits/ears.svg" alt="" aria-hidden="true" /><p class="eyebrow">{ui("GET IN TOUCH", $localeStore)}</p><h1>{ui("We're here to help.", $localeStore)}</h1><p>{ui("Questions about mining, pool setup or security? Reach the right team below.", $localeStore)}</p></section><div class="pool-grid contact-grid"><div class="pool-card"><span class="pool-code">01</span><h2>{ui("Support", $localeStore)}</h2><p>{ui("Mining setup, rewards and general questions.", $localeStore)}</p><a href="mailto:support@catchthatrabbit.com">support@catchthatrabbit.com ↗</a></div><div class="pool-card"><span class="pool-code">02</span><h2>{ui("Security", $localeStore)}</h2><p>{ui("Report a security issue privately.", $localeStore)}</p><a href="mailto:security@catchthatrabbit.com">security@catchthatrabbit.com ↗</a><p><a href="mailto:ctr@onion.email">ctr@onion.email ↗</a></p><a href="https://keys.openpgp.org/vks/v1/by-fingerprint/AF5A75BDC5748490B63A4FE2F0E61C2B76529B62" target="_blank" rel="noreferrer">{ui("PGP public key ↗", $localeStore)}</a></div><div class="pool-card"><span class="pool-code">03</span><h2>{ui("Commercial", $localeStore)}</h2><p>{ui("Partnerships, hardware and mining farm inquiries.", $localeStore)}</p><a href="mailto:contact@catchthatrabbit.com">contact@catchthatrabbit.com ↗</a></div><div class="pool-card"><span class="pool-code">04</span><h2>{ui("Rentals", $localeStore)}</h2><p>{ui("Mining device rentals and related inquiries.", $localeStore)}</p><a href="mailto:rentals@catchthatrabbit.com">rentals@catchthatrabbit.com ↗</a></div></div>
{:else if kind === 'docs'}
	<section class="page-intro"><p class="eyebrow">{ui("DOCUMENTATION", $localeStore)}</p><h1>Catch That Rabbit.</h1><p>{ui("Introduction and getting started with the project.", $localeStore)}</p></section><div class="panel"><h2>{ui("Introduction", $localeStore)}</h2><p>{ui("This is the documentation for the Catch That Rabbit project.", $localeStore)}</p><h2>{ui("Getting started", $localeStore)}</h2><ol><li>{ui("Clone the repository.", $localeStore)}</li><li>{ui("Install the dependencies.", $localeStore)}</li><li>{ui("Run the project.", $localeStore)}</li></ol><h2>{ui("Contributing", $localeStore)}</h2><ol><li>{ui("Fork the repository.", $localeStore)}</li><li>{ui("Create a branch.", $localeStore)}</li><li>{ui("Make your changes and commit them.", $localeStore)}</li></ol></div>
{:else if kind === 'blog'}
	<section class="page-intro"><p class="eyebrow">{ui("NEWS", $localeStore)}</p><h1>{ui("Blog.", $localeStore)}</h1><p>{ui("News and updates from Catch That Rabbit.", $localeStore)}</p></section><div class="panel"><h2>{ui("Welcome", $localeStore)}</h2><p>{ui("Hello, this is the blog of Catch That Rabbit. Here you can find the latest news and updates about the project.", $localeStore)}</p></div>
{:else}
	<section class="page-intro"><h1>{ui("Page not found.", $localeStore)}</h1><p>{ui("That rabbit has moved on.", $localeStore)}</p><a href="/">{ui("Return home →", $localeStore)}</a></section>
{/if}

<style>
	:global(body) { background: #f7f5f0; color: #172a25; }
	:global(main.ctr-main) { width: min(1200px, calc(100% - 48px)); margin: 0 auto; padding: 0 0 100px; }
	:global(a) { color: inherit; }
	:global(a:hover) { color: #228d70; }
	:global(button) { cursor: pointer; }
	.hero { display: grid; grid-template-columns: 1.15fr .85fr; align-items: center; min-height: 590px; gap: 35px; padding: 60px 0; }
	.hero-copy { position: relative; z-index: 1; }
		.section-rabbit { display: block; width: auto; max-width: 170px; height: 64px; object-fit: contain; object-position: left bottom; margin-bottom: 14px; }
		.search-rabbit { height: 54px; margin-bottom: 20px; }
		.section-heading .section-rabbit { height: 50px; margin-bottom: 10px; }
		:global(.dark) .section-rabbit { filter: invert(1); }
	.eyebrow, .step { color: #24916e; font-size: 12px; font-weight: 800; letter-spacing: .18em; }
	h1, h2, h3, p { margin-top: 0; }
	h1 { font-size: clamp(3.3rem, 7vw, 6.3rem); line-height: .99; letter-spacing: -.07em; font-weight: 800; margin: 20px 0 26px; }
		h1 em { color: #4ba77e; font-style: normal; }
		.hero-slogan-secondary { color: #238b67; font-size: clamp(19px, 2.2vw, 25px); font-style: italic; font-weight: 600; margin: 0 0 14px; }
		.hero-pools { color: #63716b; font-size: 14px; line-height: 1.5; margin-bottom: 18px; }
		.hero-pools strong { color: #24916e; }
	.lead, .page-intro > p:last-child { color: #63716b; font-size: 19px; line-height: 1.6; max-width: 550px; }
	.rabbit { max-width: 100%; max-height: 510px; object-fit: contain; filter: drop-shadow(0 35px 25px #27533b22); }
	.wallet-search { display: flex; padding: 6px; max-width: 620px; background: #fff; border: 1px solid #d7e0d9; border-radius: 16px; box-shadow: 0 12px 35px #1f503b11; margin-top: 34px; }
	.wallet-search input { flex: 1; border: 0; min-width: 0; padding: 14px; outline: 0; color: #172a25; }
	.wallet-search button, .button { background: #238b67; color: white; border: 0; border-radius: 11px; padding: 14px 20px; font-weight: 750; text-decoration: none; display: inline-flex; justify-content: center; align-items: center; }
	.wallet-search button:hover, .button:hover { background: #176d50; color: #fff; }
	.hero-links { display: flex; gap: 24px; margin-top: 20px; font-weight: 700; font-size: 14px; }
	.section { padding: 30px 0 75px; }
	.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
	.section-heading h2 { font-size: 34px; letter-spacing: -.04em; margin-bottom: 0; }
	.section-heading.compact { align-items: center; margin-top: 55px; }
	.section-heading.compact h2, .section-heading.compact h3 { margin: 0; font-size: 24px; }
	.section-heading a { color: #238b67; font-weight: 750; }
	.live { font-size: 13px; font-weight: 700; color: #407c60; }
	.live span { display: inline-block; width: 8px; height: 8px; background: #47c28c; border-radius: 50%; margin-right: 6px; }
	.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 30px; }
	.stat, .panel { background: white; border: 1px solid #e2e8e0; border-radius: 18px; padding: 28px; }
	.stat small, .result small { display: block; color: #6a7870; font-size: 13px; margin-bottom: 15px; }
	.stat strong { display: block; font-size: clamp(20px, 2.6vw, 32px); letter-spacing: -.04em; white-space: nowrap; }
	.stat strong span { font-size: 14px; font-weight: 500; color: #6a7870; }
	.pool-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 13px; }
	.pool-card { display: block; text-decoration: none; background: #eaf2e9; border: 1px solid #d8e7d7; border-radius: 18px; padding: 24px; min-width: 0; }
	.pool-card:hover { border-color: #70b38c; color: inherit; }
	.pool-card h3, .pool-card h2 { margin: 30px 0 7px; font-size: 23px; letter-spacing: -.04em; }
	.pool-card p { font-size: 13px; color: #66776b; min-height: 38px; }
	.pool-card > div:last-child { display: flex; justify-content: space-between; font-weight: 750; font-size: 13px; margin-top: 25px; }
	.pool-code { display: inline-flex; border-radius: 7px; background: #d5e9d7; color: #287952; padding: 7px 9px; font-size: 11px; font-weight: 800; letter-spacing: .1em; }
	.cta { background: #214c3b; color: white; border-radius: 25px; padding: 52px; display: flex; align-items: center; justify-content: space-between; gap: 25px; }
	.cta h2 { font-size: 38px; letter-spacing: -.05em; margin: 12px 0; }
	.cta p:last-child { color: #b8d0c2; margin: 0; }
	.cta .eyebrow { color: #8ed9a8; }
	.button.light { background: #fff; color: #1e654a; white-space: nowrap; }
	.page-intro { padding: 80px 0 42px; }
	.page-intro h1 { font-size: clamp(3rem, 6vw, 5rem); }
	.page-intro .address { overflow-wrap: anywhere; font-family: monospace; font-size: 16px; }
	.page-intro .address button, .config-preview button { color: #238b67; border: 0; background: none; font-weight: 750; }
	.pool-grid.full { grid-template-columns: repeat(3, 1fr); }
	.pool-grid.full .pool-card { background: white; }
	.pool-detail { border-top: 1px solid #e1e8e1; padding: 14px 0; display: flex; justify-content: space-between; gap: 10px; align-items: center; font-size: 14px; }
	.pool-detail span { color: #68796f; }
	.pool-detail code { overflow-wrap: anywhere; text-align: right; }
	.pool-grid.full .button { width: 100%; margin-top: 15px; }
	.two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
	.panel label, .toolbar label { display: block; font-size: 13px; font-weight: 750; margin-bottom: 20px; }
	.panel input, .panel select, .toolbar select { display: block; width: 100%; margin-top: 8px; padding: 14px; border: 1px solid #d6e1d9; border-radius: 10px; background: #fafbf8; color: #172a25; outline-color: #24916e; }
	.step { margin-bottom: 24px; }
	.step:not(:first-child) { margin-top: 32px; }
	.segmented { display: flex; flex-wrap: wrap; gap: 4px; background: #eaf0e9; border-radius: 11px; padding: 4px; width: fit-content; }
	.segmented.with-domain { margin-bottom: 20px; }
	.segmented button { border: 0; background: none; color: #4f6658; border-radius: 8px; padding: 9px 14px; font-size: 13px; font-weight: 700; }
	.segmented button.active { background: white; color: #1b7655; box-shadow: 0 2px 5px #1c493b13; }
	.button.wide { width: 100%; margin-top: 25px; }
	.button.small { padding: 12px 16px; }
	.guide h2 { font-size: 27px; }
	.guide ol { list-style: none; counter-reset: step; margin: 0 0 22px; padding: 0; }
	.guide li { counter-increment: step; padding: 0 0 10px 45px; position: relative; }
	.guide li::before { content: counter(step); position: absolute; left: 0; top: 0; color: #24916e; font-weight: 800; }
	.guide li p { color: #6a7870; font-size: 14px; margin: 5px 0 18px; }
	.guide a { color: #238b67; font-weight: 700; }
	.config-preview { display: flex; justify-content: space-between; gap: 10px; background: #eff5ee; border-radius: 10px; padding: 18px; margin-bottom: 23px; flex-wrap: wrap; }
	.config-preview span { width: 100%; font-size: 11px; font-weight: 800; letter-spacing: .1em; color: #6a7870; }
	.result { background: #eaf2e9; }
	.result strong { display: block; font-size: clamp(23px, 4vw, 42px); color: #238b67; margin-bottom: 30px; }
	.result strong.negative { color: #b74c4c; }
	.result p { color: #6a7870; font-size: 13px; margin-top: 30px; }
	.toolbar { display: flex; align-items: end; justify-content: space-between; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; }
	.toolbar label { margin: 0; min-width: 220px; }
	.table-wrap { overflow-x: auto; background: #fff; border: 1px solid #e2e8e0; border-radius: 16px; }
	table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
	th { color: #68796f; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }
	th, td { padding: 18px 20px; border-bottom: 1px solid #edf0ea; white-space: nowrap; }
	tr:last-child td { border-bottom: 0; }
	td a { color: #238b67; font-weight: 650; }
	.empty { text-align: center; color: #6a7870; padding: 45px; }
	.pagination { display: flex; gap: 20px; justify-content: center; align-items: center; margin-top: 25px; font-size: 13px; }
	.pagination button { padding: 10px 14px; border: 1px solid #d8e4da; border-radius: 8px; background: white; color: #226c4d; font-weight: 700; }
	.pagination button:disabled { opacity: .4; cursor: default; }
	.status { color: #198957; background: #e3f6e9; padding: 5px 9px; border-radius: 20px; font-size: 12px; font-weight: 700; }
	.status.offline { color: #9b5e4d; background: #f8eae4; }
	.contact-grid { grid-template-columns: repeat(2, 1fr); }
	.contact-grid .pool-card { background: white; }
	.contact-grid .pool-card a { color: #238b67; overflow-wrap: anywhere; }
	.notice { position: fixed; z-index: 2000; bottom: 24px; right: 24px; background: #173d2f; color: white; border-radius: 12px; padding: 14px 18px; box-shadow: 0 10px 35px #0003; }
	.notice button { border: 0; background: none; color: white; margin-left: 20px; font-size: 20px; }
	.data-warning { color: #8b4a28; background: #fff0dc; border: 1px solid #f1d4aa; border-radius: 10px; padding: 13px 16px; margin: 0 0 18px; font-size: 14px; }
	:global(.dark body) { background: #0e1713; color: #e9f3eb; }
	:global(.dark) .lead, :global(.dark) .page-intro > p:last-child, :global(.dark) .pool-card p, :global(.dark) .guide li p, :global(.dark) .result p { color: #a8bfae; }
		:global(.dark) .hero-pools { color: #a8bfae; }
	:global(.dark) .stat, :global(.dark) .panel, :global(.dark) .table-wrap, :global(.dark) .wallet-search, :global(.dark) .pool-grid.full .pool-card, :global(.dark) .contact-grid .pool-card { background: #17271e; border-color: #314b38; }
	:global(.dark) .pool-card, :global(.dark) .result { background: #1b3024; border-color: #365440; }
	:global(.dark) .wallet-search input, :global(.dark) .panel input, :global(.dark) .panel select, :global(.dark) .toolbar select { background: #122219; color: #e9f3eb; border-color: #385742; }
	:global(.dark) .wallet-search input::placeholder, :global(.dark) .panel input::placeholder { color: #9ab4a1; }
	:global(.dark) .stat small, :global(.dark) .result small, :global(.dark) .pool-detail span, :global(.dark) th { color: #a2b8a8; }
	:global(.dark) .pool-detail, :global(.dark) th, :global(.dark) td { border-color: #314b38; }
	:global(.dark) .pool-code, :global(.dark) .segmented, :global(.dark) .config-preview { background: #24412e; color: #a9e7b9; }
	:global(.dark) .segmented button { color: #c4d6c8; }
	:global(.dark) .segmented button.active, :global(.dark) .pagination button { background: #355a3d; color: #e9f3eb; border-color: #446b4e; }
	:global(.dark) .cta { background: #254c34; }
	:global(.dark) .cta p:last-child { color: #c2d8c8; }
	:global(.dark) .empty { color: #a8bfae; }
	:global(.dark) .data-warning { background: #443323; color: #f6d9aa; border-color: #705439; }
	@media (max-width: 900px) { .hero { grid-template-columns: 1fr 250px; min-height: 0; } .pool-grid { grid-template-columns: repeat(3, 1fr); } .stats-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 650px) { :global(main.ctr-main) { width: min(100% - 32px, 1200px); } .hero { display: flex; flex-direction: column-reverse; padding-top: 28px; align-items: flex-start; } .rabbit { height: 220px; align-self: center; } .wallet-search { flex-direction: column; } .wallet-search button { width: 100%; } .hero-links { flex-wrap: wrap; } .stats-grid, .pool-grid, .pool-grid.full, .two-column, .contact-grid { grid-template-columns: 1fr; } .pool-card p { min-height: 0; } .cta { padding: 28px; flex-direction: column; align-items: flex-start; } .page-intro { padding-top: 42px; } .section-heading { align-items: flex-start; flex-direction: column; } }
</style>
