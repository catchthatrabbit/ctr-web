<script lang="ts">
	import { ArrowUpRight, Bell, Download, Gauge, Smartphone, Wallet, Pickaxe, X } from '@lucide/svelte';
	import { locale as localeStore } from '#lib/helpers/i18n.js';
	import { ui } from './translations.js';

	const sourceUrl = 'https://github.com/catchthatrabbit/application';
	let downloadDialog: HTMLDialogElement;
</script>

<svelte:head>
	<title>Mobile app | Catch That Rabbit</title>
	<meta name="description" content="Catch That Rabbit mobile app for monitoring Core Blockchain mining accounts, workers, payouts and notifications." />
</svelte:head>

<div class="mobile-app-page">
	<section class="app-hero">
		<div class="hero-copy">
			<img class="section-rabbit" src="/img/section-rabbits/head-and-neck-hand-above.svg" alt="" aria-hidden="true" />
			<p class="eyebrow">{ui('MOBILE APP', $localeStore)}</p>
			<h1>{ui('Your pool, wherever you are.', $localeStore)}</h1>
			<p class="lead">{ui('Keep your Catch That Rabbit accounts, miners and payouts close at hand.', $localeStore)}</p>
			<div class="hero-actions">
				<button class="primary-action" type="button" onclick={() => downloadDialog.showModal()}>{ui('Download the app', $localeStore)} <Download size={18} aria-hidden="true" /></button>
				<a class="secondary-action" href="/start-mining">{ui('Start mining', $localeStore)} <span aria-hidden="true">→</span></a>
			</div>
			<div class="platform-note"><Smartphone size={17} aria-hidden="true" /> {ui('Built with Flutter for Android and iOS.', $localeStore)}</div>
		</div>
		<div class="device-wrap" aria-hidden="true">
			<div class="device-glow"></div>
			<div class="device">
				<div class="device-island"></div>
				<div class="device-content">
					<img class="app-icon" src="/img/mobile-app-icon.png" alt="" />
					<div class="device-title">Catch That Rabbit</div>
					<div class="device-subtitle">Core Blockchain</div>
					<div class="device-lines"><span></span><span></span><span></span></div>
					<div class="device-card"><span class="device-card-dot"></span><span></span><span></span></div>
					<div class="device-card"><span class="device-card-dot"></span><span></span><span></span></div>
					<div class="device-card"><span class="device-card-dot"></span><span></span><span></span></div>
				</div>
			</div>
		</div>
	</section>

	<section class="features" aria-labelledby="features-title">
		<div class="section-heading">
			<p class="eyebrow">{ui('YOUR MINING COMPANION', $localeStore)}</p>
			<h2 id="features-title">{ui('Your mining at a glance.', $localeStore)}</h2>
		</div>
		<div class="feature-grid">
			<article class="feature-card"><div class="feature-icon"><Wallet size={22} aria-hidden="true" /></div><h3>{ui('Accounts', $localeStore)}</h3><p>{ui('Add and switch between XCB addresses, with secure local storage.', $localeStore)}</p></article>
			<article class="feature-card"><div class="feature-icon"><Gauge size={22} aria-hidden="true" /></div><h3>{ui('Dashboard', $localeStore)}</h3><p>{ui('See balances, round share and farm health in one place.', $localeStore)}</p></article>
			<article class="feature-card"><div class="feature-icon"><Pickaxe size={22} aria-hidden="true" /></div><h3>{ui('Workers', $localeStore)}</h3><p>{ui('Check each miner’s hashrate and online status.', $localeStore)}</p></article>
			<article class="feature-card"><div class="feature-icon"><ArrowUpRight size={22} aria-hidden="true" /></div><h3>{ui('Payouts', $localeStore)}</h3><p>{ui('Review your payment history by pool and account.', $localeStore)}</p></article>
			<article class="feature-card"><div class="feature-icon"><Bell size={22} aria-hidden="true" /></div><h3>{ui('Notifications', $localeStore)}</h3><p>{ui('Get alerts for miner status and rank changes.', $localeStore)}</p></article>
		</div>
	</section>

	<section class="app-status" aria-labelledby="app-status-title">
		<div><p class="eyebrow">{ui('NEW API UPDATE', $localeStore)}</p><h2 id="app-status-title">{ui('The next app update is on its way.', $localeStore)}</h2><p>{ui('The mobile app is being updated for the new pool API. Follow the source repository for the latest version.', $localeStore)}</p></div>
		<a href={sourceUrl} target="_blank" rel="noopener noreferrer">{ui('Open source repository', $localeStore)} <ArrowUpRight size={18} aria-hidden="true" /></a>
	</section>
</div>

<dialog bind:this={downloadDialog} class="download-dialog" aria-labelledby="download-title" aria-describedby="download-description">
	<div class="dialog-head">
		<img src="/img/mobile-app-icon.png" alt="" />
		<button type="button" class="dialog-close" aria-label={ui('Close', $localeStore)} onclick={() => downloadDialog.close()}><X size={20} aria-hidden="true" /></button>
	</div>
	<h2 id="download-title">{ui('Download the app', $localeStore)}</h2>
	<p id="download-description">{ui('Store links will be added here when available.', $localeStore)}</p>
	<div class="store-options">
		<div class="store-option"><Smartphone size={22} aria-hidden="true" /><span>Android</span><small>{ui('Coming soon', $localeStore)}</small></div>
		<div class="store-option"><Smartphone size={22} aria-hidden="true" /><span>iOS</span><small>{ui('Coming soon', $localeStore)}</small></div>
	</div>
</dialog>

<style>
	.mobile-app-page { width: calc(100% - 48px); max-width: 1200px; margin: 0 auto; padding-bottom: 90px; }
	.app-hero { min-height: 650px; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr); align-items: center; gap: 48px; padding: 66px 0 90px; }
	.section-rabbit { display: block; height: 64px; max-width: 170px; object-fit: contain; object-position: left bottom; margin-bottom: 28px; }
	.eyebrow { margin: 0; color: #24916e; font-size: 12px; font-weight: 800; letter-spacing: .18em; }
	h1, h2, h3, p { margin-top: 0; }
	h1 { max-width: 750px; margin: 18px 0 24px; font-size: clamp(3.5rem, 6.7vw, 6.4rem); line-height: .99; letter-spacing: -.075em; font-weight: 820; }
	.lead { max-width: 610px; margin-bottom: 29px; color: #61736a; font-size: clamp(18px, 2.2vw, 23px); line-height: 1.5; }
	.hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
	.hero-actions a, .hero-actions button, .app-status a { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 46px; padding: 12px 19px; border-radius: 10px; font-size: 14px; font-weight: 750; text-decoration: none; }
	.primary-action { border: 0; background: #24916e; color: white; cursor: pointer; }
	.primary-action:hover { background: #1b795b; }
	.secondary-action { color: #1b7655; border: 1px solid #cbded1; }
	.secondary-action:hover { background: #e9f1e9; }
	.platform-note { display: flex; align-items: center; gap: 9px; margin-top: 22px; color: #688072; font-size: 13px; }
	.device-wrap { position: relative; display: grid; place-items: center; min-height: 535px; }
	.device-glow { position: absolute; width: min(100%, 470px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, #b6e6b874, #dceedd4b 48%, transparent 70%); }
	.device { position: relative; width: 270px; height: 525px; padding: 10px; border: 5px solid #1b3128; border-radius: 40px; background: #0d1a14; box-shadow: 22px 34px 60px #183a2d34, inset 0 0 0 2px #496556; transform: rotate(7deg); }
	.device-island { position: absolute; top: 14px; left: 50%; z-index: 1; width: 86px; height: 21px; border-radius: 20px; background: #08100c; transform: translateX(-50%); }
	.device-content { height: 100%; padding: 70px 17px 20px; border-radius: 27px; background: linear-gradient(155deg, #1d3d2b, #0c1a14 75%); color: #fff; overflow: hidden; }
	.app-icon { display: block; width: 78px; height: 78px; border: 1px solid #415448; border-radius: 18px; margin-bottom: 18px; }
	.device-title { font-size: 18px; font-weight: 800; letter-spacing: -.04em; }
	.device-subtitle { margin-top: 3px; color: #acc7ae; font-size: 11px; }
	.device-lines { display: flex; flex-direction: column; gap: 8px; margin: 25px 0; }
	.device-lines span { display: block; height: 9px; border-radius: 20px; background: #5e947455; }
	.device-lines span:first-child { width: 65%; }
	.device-lines span:nth-child(2) { width: 90%; }
	.device-lines span:last-child { width: 75%; }
	.device-card { display: flex; align-items: center; gap: 8px; height: 49px; margin-bottom: 9px; padding: 11px; border: 1px solid #4f86604a; border-radius: 10px; background: #29513a82; }
	.device-card-dot { flex: 0 0 18px; height: 18px; border-radius: 50%; background: #8dd0a0; }
	.device-card span:nth-child(2) { width: 46%; height: 7px; border-radius: 10px; background: #a2c4a675; }
	.device-card span:last-child { width: 18%; height: 7px; border-radius: 10px; margin-left: auto; background: #9dcca66e; }
	.features { padding: 30px 0 80px; }
	.section-heading { margin-bottom: 28px; }
	.section-heading h2 { max-width: 700px; margin: 12px 0 0; font-size: clamp(2.2rem, 4vw, 3.7rem); line-height: 1.08; letter-spacing: -.055em; }
	.feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
	.feature-card { min-height: 205px; padding: 25px; border: 1px solid #e0e8df; border-radius: 17px; background: #fff; }
	.feature-icon { display: grid; place-items: center; width: 42px; height: 42px; margin-bottom: 21px; border-radius: 12px; background: #e7f3e9; color: #238b67; }
	.feature-card h3 { margin-bottom: 9px; font-size: 21px; letter-spacing: -.035em; }
	.feature-card p { margin-bottom: 0; color: #63756a; font-size: 14px; line-height: 1.6; }
	.app-status { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding: 34px; border-radius: 19px; background: #173d2b; color: #fff; }
	.app-status .eyebrow { color: #9be0b1; }
	.app-status h2 { margin: 11px 0 8px; font-size: clamp(25px, 3vw, 34px); letter-spacing: -.045em; }
	.app-status p:last-child { max-width: 660px; margin-bottom: 0; color: #c1d9c8; line-height: 1.55; }
	.app-status a { flex: 0 0 auto; background: #fff; color: #20694c; }
	.app-status a:hover { background: #e5f5e8; }
	.download-dialog { position: fixed; inset: 0; width: min(calc(100% - 32px), 480px); max-height: calc(100dvh - 32px); margin: auto; overflow-y: auto; padding: 28px; border: 1px solid #d7e5d8; border-radius: 20px; background: #fff; color: #172a25; box-shadow: 0 30px 80px #06140ba8; }
	.download-dialog::backdrop { background: #07150eab; backdrop-filter: blur(5px); }
	.dialog-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px; }
	.dialog-head img { width: 56px; height: 56px; border-radius: 13px; }
	.dialog-close { display: grid; place-items: center; width: 34px; height: 34px; border: 0; border-radius: 8px; background: #edf4ee; color: #315541; cursor: pointer; }
	.dialog-close:hover { background: #dcebe0; }
	.download-dialog h2 { margin: 0 0 9px; font-size: 31px; letter-spacing: -.05em; }
	.download-dialog p { margin: 0 0 25px; color: #607469; line-height: 1.55; }
	.store-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.store-option { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; min-height: 122px; padding: 18px; border: 1px solid #dfe9df; border-radius: 12px; background: #f6f9f5; color: #275b42; }
	.store-option span { color: #213c2d; font-weight: 750; }
	.store-option small { color: #688072; font-size: 12px; }
	:global(.dark) .lead, :global(.dark) .platform-note, :global(.dark) .feature-card p { color: #a8bfae; }
	:global(.dark) .section-rabbit { filter: invert(1); }
	:global(.dark) .secondary-action { color: #a9e7b9; border-color: #42674b; }
	:global(.dark) .secondary-action:hover { background: #24412e; }
	:global(.dark) .feature-card { background: #17271e; border-color: #314b38; }
	:global(.dark) .feature-icon { background: #24412e; color: #a9e7b9; }
	:global(.dark) .device-glow { background: radial-gradient(circle, #2b684254, #1f422b34 48%, transparent 70%); }
	:global(.dark) .download-dialog { background: #17271e; color: #e9f3eb; border-color: #365440; }
	:global(.dark) .download-dialog p, :global(.dark) .store-option small { color: #a8bfae; }
	:global(.dark) .dialog-close, :global(.dark) .store-option { background: #213b2a; border-color: #365440; color: #a9e7b9; }
	:global(.dark) .store-option span { color: #e9f3eb; }
	@media (max-width: 850px) { .app-hero { grid-template-columns: 1fr; gap: 10px; padding-top: 46px; } .device-wrap { min-height: 450px; } .device { transform: rotate(5deg) scale(.83); } .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 600px) { .mobile-app-page { width: calc(100% - 32px); padding-bottom: 50px; } .app-hero { padding: 40px 0 45px; } h1 { font-size: clamp(2.65rem, 11vw, 3.5rem); letter-spacing: -.06em; } .device-wrap { min-height: 405px; } .device { transform: rotate(5deg) scale(.75); } .features { padding-bottom: 50px; } .feature-grid { grid-template-columns: 1fr; } .feature-card { min-height: 0; } .app-status { align-items: flex-start; flex-direction: column; padding: 26px; } .app-status a { width: 100%; } .download-dialog { padding: 22px; } }
</style>
