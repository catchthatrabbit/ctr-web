<script lang="ts">
	import { locale as localeStore } from '#lib/helpers/i18n.js';
	import { ui } from './translations.js';
	import { pools, regions, formatHashrate, type Region } from './config.js';
	import { validateCoreId } from '#lib/helpers/coreIdValidation.js';

	type PoolSettings = { PoolFee?: number | string; Region?: string };
	type FeePreview = {
		applied: boolean;
		nftFeeWaiverEnabled: boolean;
		hashrateHs?: number;
		hashrateOk: boolean;
		ownsNft: boolean;
		tierDiscount?: number;
		rebateFraction?: number;
		reason?: string;
	};

	let region = $state<Region>('DE');
	let settings = $state<PoolSettings | null>(null);
	let settingsLoading = $state(true);
	let settingsError = $state('');
	let address = $state('');
	let preview = $state<FeePreview | null>(null);
	let previewLoading = $state(false);
	let previewError = $state('');
	const feePercent = $derived(settings && settings.PoolFee !== undefined && settings.PoolFee !== null && settings.PoolFee !== '' && Number.isFinite(Number(settings.PoolFee)) ? Number(settings.PoolFee) : null);
	const appliedFraction = $derived(preview?.applied ? Number(preview.rebateFraction ?? 0) : 0);
	const effectiveFeePercent = $derived(feePercent === null ? null : feePercent * (1 - appliedFraction));
	const percent = (value: number) => `${new Intl.NumberFormat($localeStore, { maximumFractionDigits: 2 }).format(value)}%`;
	const voucherTiers = [
		{ hashrate: 'Up to 1 MH/s', rebate: '100%', feeShare: '0%' },
		{ hashrate: 'Above 1 to 5 MH/s', rebate: '50%', feeShare: '50%' },
		{ hashrate: 'Above 5 MH/s', rebate: '20%', feeShare: '80%' }
	];

	$effect(() => {
		const code = region;
		const controller = new AbortController();
		settings = null;
		settingsLoading = true;
		settingsError = '';
		preview = null;
		previewError = '';
		fetch(`/api/pool/${code}/settings`, { signal: controller.signal })
			.then((response) => response.ok ? response.json() : Promise.reject(new Error(ui('Pool settings are unavailable.', $localeStore))))
			.then((value: PoolSettings) => {
				if (!controller.signal.aborted) {
					if (value.PoolFee === undefined || value.PoolFee === null || value.PoolFee === '' || !Number.isFinite(Number(value.PoolFee))) throw new Error(ui('Pool fee was not returned by this pool.', $localeStore));
					settings = value;
				}
			})
			.catch((cause: unknown) => { if (!controller.signal.aborted) settingsError = cause instanceof Error ? cause.message : ui('Pool settings are unavailable.', $localeStore); })
			.finally(() => { if (!controller.signal.aborted) settingsLoading = false; });
		return () => controller.abort();
	});

	async function checkDiscount() {
		const payoutAddress = address.trim();
		const selectedRegion = region;
		preview = null;
		previewError = '';
		if (!validateCoreId(payoutAddress, 'coreId').isValid) {
			previewError = ui('Enter a valid Core Blockchain payout address.', $localeStore);
			return;
		}
		previewLoading = true;
		try {
			const response = await fetch(`/api/pool/${selectedRegion}/nft_fee_waiver/${encodeURIComponent(payoutAddress)}`);
			if (!response.ok) throw new Error(ui('NFT fee preview is unavailable for this pool.', $localeStore));
			const result = await response.json() as FeePreview;
			if (region === selectedRegion) preview = result;
		} catch (cause) {
			if (region === selectedRegion) previewError = cause instanceof Error ? cause.message : ui('NFT fee preview is unavailable.', $localeStore);
		} finally {
			previewLoading = false;
		}
	}
</script>

<section class="fee-intro">
	<img src="/img/section-rabbits/head-and-neck-hand-above.svg" alt="" aria-hidden="true" />
	<p class="eyebrow">{ui("TRANSPARENT REWARDS", $localeStore)}</p>
	<h1>{ui("Pool fee.", $localeStore)}</h1>
	<p>{ui("See the live fee for each Catch That Rabbit pool and how an eligible NFT can reduce your share.", $localeStore)}</p>
</section>

<div class="fee-grid">
	<section class="fee-card" aria-labelledby="current-fee-title">
		<div class="card-heading"><div><p class="eyebrow">{ui("CURRENT RATE", $localeStore)}</p><h2 id="current-fee-title">{ui("Pool fee", $localeStore)}</h2></div><label>{ui("Pool", $localeStore)}<select bind:value={region}>{#each regions as code}<option value={code}>{pools[code].name} · {code}</option>{/each}</select></label></div>
		{#if settingsLoading}<p role="status">{ui("Loading the live pool fee…", $localeStore)}</p>
		{:else if settingsError}<p class="error" role="status">{settingsError}</p>
		{:else if feePercent !== null}<strong class="fee-rate">{percent(feePercent)}</strong><p class="muted">{ui('The nominal pool fee on gross block rewards at', $localeStore)} {pools[region].name}.</p>{/if}
		<p class="small-note">{ui("The rate comes from this pool’s public settings API and can vary by pool.", $localeStore)}</p>
	</section>

	<section class="fee-card" aria-labelledby="nft-title">
		<p class="eyebrow">{ui("NFT FEE DISCOUNT", $localeStore)}</p>
		<h2 id="nft-title">{ui("Check your payout address", $localeStore)}</h2>
		<p>{ui("Eligible payout addresses receive a rebate on their share of the pool fee. Eligibility depends on the NFT rule and your hashrate tier.", $localeStore)}</p>
		<form onsubmit={(event) => { event.preventDefault(); void checkDiscount(); }}>
			<label for="fee-address">{ui("Core Blockchain payout address", $localeStore)}</label>
			<div class="address-row"><input id="fee-address" bind:value={address} placeholder={ui('Enter your Core ID', $localeStore)} /><button disabled={previewLoading} type="submit">{ui(previewLoading ? 'Checking…' : 'Check discount', $localeStore)}</button></div>
		</form>
		{#if previewError}<p class="error" role="status">{previewError}</p>{/if}
		{#if preview}<div class="preview" role="status"><strong>{preview.applied ? ui("NFT rebate applies", $localeStore) : ui("No NFT rebate applies now", $localeStore)}</strong><span>{preview.applied ? `${percent((preview.rebateFraction ?? 0) * 100)} ${ui('of your fee share rebated', $localeStore)}` : ui(preview.reason ?? 'This address does not currently qualify.', $localeStore)}</span>{#if preview.hashrateOk && preview.hashrateHs !== undefined}<span>{ui('Hashrate used for tier:', $localeStore)} {formatHashrate(preview.hashrateHs)}</span>{/if}{#if effectiveFeePercent !== null}<span>{ui('Predicted effective fee:', $localeStore)} {percent(effectiveFeePercent)} {ui('of gross reward for your share', $localeStore)}</span>{/if}</div>{/if}
	</section>
</div>

<section class="fee-card voucher-tiers" aria-labelledby="voucher-tiers-title">
	<p class="eyebrow">{ui("VOUCHER DISCOUNT TIERS", $localeStore)}</p>
	<h2 id="voucher-tiers-title">{ui("Your hashrate sets the rebate", $localeStore)}</h2>
	<p class="muted">{ui("The pool repository’s voucher configuration uses these exact bands for an eligible payout address. The upper limits are inclusive.", $localeStore)}</p>
	<div class="tier-table-wrap">
		<table>
			<thead><tr><th scope="col">{ui("Large-window hashrate", $localeStore)}</th><th scope="col">{ui("Pool fee rebated", $localeStore)}</th><th scope="col">{ui("Fee share remaining", $localeStore)}</th></tr></thead>
			<tbody>{#each voucherTiers as tier}<tr><th scope="row">{ui(tier.hashrate, $localeStore)}</th><td><strong>{tier.rebate}</strong></td><td>{tier.feeShare}</td></tr>{/each}</tbody>
		</table>
	</div>
	<p class="small-note">{ui("Hashrate is aggregated over the large window, set to 3 hours in the repository example. The voucher must pass the pool’s NFT expiration check.", $localeStore)}</p>
</section>

<section class="fee-card explanation" aria-labelledby="calculation-title">
	<p class="eyebrow">{ui("HOW THE DISCOUNT WORKS", $localeStore)}</p>
	<h2 id="calculation-title">{ui("Calculated from your fee share", $localeStore)}</h2>
	<ol>
		<li><strong>{ui("Find the nominal fee.", $localeStore)}</strong> {ui("Gross block reward × the pool fee rate shown above.", $localeStore)}</li>
		<li><strong>{ui("Find your share.", $localeStore)}</strong> {ui("The pool allocates that fee across miners according to their PPLNS shares in the round.", $localeStore)}</li>
		<li><strong>{ui("Choose a hashrate tier.", $localeStore)}</strong> {ui("Your aggregate hashrate over the large window, normally 3 hours, determines a rebate multiplier.", $localeStore)}</li>
		<li><strong>{ui("Check the NFT rule.", $localeStore)}</strong> {ui("The payout address must pass the configured NFT expiration check. The pool may use its ownership cache or check the contract directly.", $localeStore)}</li>
		<li><strong>{ui("Apply the rebate.", $localeStore)}</strong> {ui("Your fee-share rebate = your nominal fee share × the tier multiplier. A multiplier of 1 removes your fee share, 0.5 halves it, and a multiplier above 1 adds a bonus.", $localeStore)}</li>
	</ol>
	<p class="muted">{ui("The preview is an estimate. The actual rebate is calculated when a block reward is credited, using that round’s shares and current eligibility.", $localeStore)}</p>
</section>

<style>
	.fee-intro { padding: 80px 0 42px; }
	.fee-intro img { display: block; height: 64px; max-width: 170px; object-fit: contain; object-position: left bottom; margin-bottom: 14px; }
	.eyebrow { color: #24916e; font-size: 12px; font-weight: 800; letter-spacing: .18em; }
	h1, h2, p { margin-top: 0; }
	h1 { font-size: clamp(3.3rem, 7vw, 6.3rem); line-height: .99; letter-spacing: -.07em; font-weight: 800; margin: 20px 0 26px; }
	.fee-intro > p:last-child { color: #63716b; font-size: 19px; line-height: 1.6; max-width: 650px; }
	.fee-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
	.fee-card { background: #fff; border: 1px solid #e2e8e0; border-radius: 18px; padding: 28px; }
	.fee-card h2 { font-size: 27px; letter-spacing: -.04em; }
	.card-heading { display: flex; align-items: start; justify-content: space-between; gap: 20px; }
	label { display: block; font-size: 13px; font-weight: 750; }
	select, input { display: block; width: 100%; padding: 13px; border: 1px solid #d6e1d9; border-radius: 10px; background: #fafbf8; color: #172a25; }
	select { margin-top: 6px; min-width: 165px; }
	.fee-rate { display: block; color: #238b67; font-size: clamp(52px, 8vw, 86px); letter-spacing: -.06em; line-height: 1; margin: 20px 0 10px; }
	.muted, .small-note { color: #63716b; line-height: 1.6; }
	.small-note { font-size: 13px; margin: 28px 0 0; }
	.address-row { display: flex; gap: 8px; margin-top: 8px; }
	.address-row input { min-width: 0; }
	.address-row button { flex: 0 0 auto; background: #238b67; color: #fff; border: 0; border-radius: 10px; padding: 0 16px; font-weight: 750; }
	.address-row button:disabled { opacity: .6; }
	.error { color: #9b4d2e; }
	.preview { display: flex; flex-direction: column; gap: 7px; margin-top: 20px; padding: 17px; background: #eaf2e9; border-radius: 12px; font-size: 14px; }
	.preview strong { color: #226c4d; }
	.voucher-tiers { margin-bottom: 20px; }
	.voucher-tiers > .muted { max-width: 760px; }
	.tier-table-wrap { width: 100%; overflow-x: auto; }
	.voucher-tiers table { width: 100%; border-collapse: collapse; text-align: left; }
	.voucher-tiers th, .voucher-tiers td { padding: 15px 18px; border-bottom: 1px solid #e2e8e0; }
	.voucher-tiers thead th { color: #5f7869; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
	.voucher-tiers tbody th { font-weight: 700; }
	.voucher-tiers tbody strong { color: #238b67; font-size: 18px; }
	.voucher-tiers .small-note { margin-top: 18px; }
	.explanation ol { margin: 20px 0; padding-left: 24px; line-height: 1.65; }
	.explanation li { padding: 0 0 10px 8px; }
	:global(.dark) .fee-intro img { filter: invert(1); }
	:global(.dark) .fee-card { background: #17271e; border-color: #314b38; }
	:global(.dark) .fee-intro > p:last-child, :global(.dark) .muted, :global(.dark) .small-note { color: #a8bfae; }
	:global(.dark) select, :global(.dark) input { background: #122219; color: #e9f3eb; border-color: #385742; }
	:global(.dark) .preview { background: #1b3024; }
	:global(.dark) .preview strong { color: #a9e7b9; }
	:global(.dark) .voucher-tiers th, :global(.dark) .voucher-tiers td { border-color: #314b38; }
	:global(.dark) .voucher-tiers thead th { color: #a8bfae; }
	:global(.dark) .voucher-tiers tbody strong { color: #a9e7b9; }
	@media (max-width: 700px) { .fee-intro { padding-top: 42px; } .fee-grid { grid-template-columns: 1fr; } .card-heading { flex-direction: column; } .address-row { flex-direction: column; } .address-row button { padding: 13px; } }
</style>
