<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { ChevronDown, Eclipse, Languages, Moon, Sun } from '@lucide/svelte';
	import { Footer } from '#lib/components/footer/index.js';
	import { applyLocale, locale as localeStore } from '#lib/helpers/i18n.js';
	import { getSiteConfig } from '#lib/helpers/siteConfig.js';
	import { getStoredLocale, getStoredTheme, removeStoredTheme, setStoredTheme } from '#lib/helpers/storageKeys.js';
	import { ui } from '#lib/ctr/translations.js';
	import '../css/app.css';
	let { children }: { children: Snippet } = $props();
	let menuOpen = $state(false);
	let languageOpen = $state(false);
	let dark = $state(false);
	let themeMode = $state<'light' | 'dark' | 'system'>('system');
	const config = getSiteConfig();
	const colorMode = config?.themeConfig?.colorMode;
	const navLogo = config?.themeConfig?.navbar?.logo;
	const links = (config?.themeConfig?.navbar?.items ?? []) as NavbarItem[];
	const leftLinks = links.filter((link) => link.position !== 'right');
	const rightLinks = links.filter((link) => link.position === 'right');
	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'de', name: 'Deutsch' },
		{ code: 'es', name: 'Español' },
		{ code: 'fr', name: 'Français' },
		{ code: 'it', name: 'Italiano' },
		{ code: 'pt-br', name: 'Português (Brasil)' },
		{ code: 'sk', name: 'Slovenčina' },
		{ code: 'vi', name: 'Tiếng Việt' },
		{ code: 'ru', name: 'Русский' },
		{ code: 'ja', name: '日本語' },
		{ code: 'th', name: 'ไทย' },
		{ code: 'zh-cn', name: '中文' }
	];

	async function selectLanguage(code: string) {
		await applyLocale(code);
		document.documentElement.lang = code;
		languageOpen = false;
		menuOpen = false;
	}

	function applyTheme(value: boolean) {
		dark = value;
		document.documentElement.classList.toggle('dark', value);
		document.documentElement.style.colorScheme = value ? 'dark' : 'light';
	}

	function toggleTheme() {
		if (colorMode?.respectPrefersColorScheme) {
			themeMode = themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system';
		} else {
			themeMode = themeMode === 'light' ? 'dark' : 'light';
		}
		applyTheme(themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
		if (themeMode === 'system') removeStoredTheme();
		else setStoredTheme(themeMode);
	}

	onMount(() => {
		const storedLocale = getStoredLocale();
		const browserLocale = navigator.language.toLowerCase();
		const initialLocale = languages.find((item) => item.code === storedLocale)?.code
			?? languages.find((item) => item.code === browserLocale)?.code
			?? languages.find((item) => item.code.split('-')[0] === browserLocale.split('-')[0])?.code
			?? 'en';
		void applyLocale(initialLocale);
		document.documentElement.lang = initialLocale;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const desktop = window.matchMedia('(min-width: 997px)');
		const stored = getStoredTheme();
		themeMode = stored === 'light' || stored === 'dark' || stored === 'system'
			? stored
			: colorMode?.respectPrefersColorScheme ? 'system' : colorMode?.defaultMode === 'dark' ? 'dark' : 'light';
		const sync = () => applyTheme(themeMode === 'dark' || (themeMode === 'system' && media.matches));
		const closeOnDesktop = () => { if (desktop.matches) menuOpen = false; };
		const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { menuOpen = false; languageOpen = false; } };
		const closeLanguageOutside = (event: PointerEvent) => {
			if (!(event.target as Element).closest('.language-control')) languageOpen = false;
		};
		sync();
		media.addEventListener('change', sync);
		desktop.addEventListener('change', closeOnDesktop);
		window.addEventListener('keydown', closeOnEscape);
		window.addEventListener('pointerdown', closeLanguageOutside);
		return () => {
			media.removeEventListener('change', sync);
			desktop.removeEventListener('change', closeOnDesktop);
			window.removeEventListener('keydown', closeOnEscape);
			window.removeEventListener('pointerdown', closeLanguageOutside);
		};
	});

	$effect(() => {
		if (!menuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = previousOverflow; };
	});
</script>

<svelte:head>
	<link rel="icon" href="/img/favicon.ico" />
</svelte:head>

<div class="ctr-shell">
	<header class="ctr-header">
		<div class="header-inner">
			<a class="brand nav-brand" href="/" aria-label="Catch That Rabbit home">
				<img class="logo-light" src={navLogo?.src ?? '/img/rabbit-black.svg'} alt="" />
				<img class="logo-dark" src={navLogo?.srcDark ?? '/img/rabbit-white.svg'} alt="" />
				<span class="brand-wordmark">CTR</span>
			</a>
			<nav class="desktop-nav" aria-label="Main navigation">
				<div class="nav-left">
					{#each leftLinks as link}<a href={link.to ?? link.href ?? '/'} target={link.target} rel={link.rel} class:nav-cta={link.className === 'button'} onclick={() => menuOpen = false}>{ui(link.label, $localeStore)}</a>{/each}
				</div>
				<div class="nav-right">
					{#each rightLinks as link}<a href={link.to ?? link.href ?? '/'} target={link.target} rel={link.rel} class:nav-cta={link.className === 'button'} onclick={() => menuOpen = false}>{ui(link.label, $localeStore)}</a>{/each}
				</div>
			</nav>
			<div class="header-controls">
				<div class="language-control desktop-language">
					<button class="language-toggle" type="button" onclick={() => languageOpen = !languageOpen} aria-label="Select language" aria-haspopup="listbox" aria-expanded={languageOpen} aria-controls="language-options"><Languages size={18} /><span>{$localeStore.toUpperCase()}</span><ChevronDown size={14} /></button>
					{#if languageOpen}<div id="language-options" class="language-options" role="listbox" aria-label="Language">{#each languages as language}<button type="button" role="option" aria-selected={$localeStore === language.code} onclick={() => void selectLanguage(language.code)}>{language.name}</button>{/each}</div>{/if}
				</div>
				{#if !colorMode?.disableSwitch}
					<button class="theme-toggle" type="button" onclick={toggleTheme} aria-label={themeMode === 'system' ? 'Switch to light theme' : themeMode === 'light' ? 'Switch to dark theme' : colorMode?.respectPrefersColorScheme ? 'Use system theme' : 'Switch to light theme'} title={themeMode === 'system' ? 'System theme' : themeMode === 'dark' ? 'Dark theme' : 'Light theme'}>{#if themeMode === 'system'}<Eclipse size={18} />{:else if themeMode === 'dark'}<Moon size={18} />{:else}<Sun size={18} />{/if}</button>
				{/if}
					<button class="menu-button" type="button" onclick={() => menuOpen = !menuOpen} aria-label={menuOpen ? 'Close navigation bar' : 'Open navigation bar'} aria-controls="mobile-navigation" aria-expanded={menuOpen}>
						{#if menuOpen}
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" /></svg>
						{:else}
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
						{/if}
					</button>
			</div>
		</div>
	</header>
	{#if menuOpen}
		<nav id="mobile-navigation" class="mobile-nav" aria-label="Main navigation">
			{#each links as link}
				<a href={link.to ?? link.href ?? '/'} target={link.target} rel={link.rel} onclick={() => menuOpen = false}>{ui(link.label, $localeStore)}</a>
			{/each}
			<div class="language-control mobile-language">
				<button class="mobile-language-toggle" type="button" onclick={() => languageOpen = !languageOpen} aria-expanded={languageOpen}><Languages size={20} /> {ui('Language', $localeStore)}: {languages.find((item) => item.code === $localeStore)?.name ?? 'English'} <ChevronDown size={18} /></button>
				{#if languageOpen}<div class="mobile-language-options">{#each languages as language}<button type="button" aria-current={$localeStore === language.code ? 'true' : undefined} onclick={() => void selectLanguage(language.code)}>{language.name}</button>{/each}</div>{/if}
			</div>
		</nav>
	{/if}
	<main class="ctr-main">{@render children()}</main>
	<Footer />
</div>

<style>
	:global(body) { margin: 0; overflow-x: clip; }
	.ctr-shell { min-height: 100vh; display: flex; flex-direction: column; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
	.ctr-header { background: #f7f5f0e8; border-bottom: 1px solid #dfe8de; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(14px); }
	.header-inner { width: min(1200px, calc(100% - 48px)); min-height: 72px; margin: 0 auto; padding: 14px 0; display: flex; align-items: center; gap: 18px; }
	.brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: #183d30; font-weight: 850; letter-spacing: -.04em; white-space: nowrap; }
	.brand-wordmark { font-size: 25px; line-height: 1; }
	.brand img { width: 40px; height: 40px; object-fit: contain; }
	.nav-brand img { width: 48px; height: 28px; }
	.logo-dark { display: none; }
	:global(.dark) .logo-light { display: none; }
	:global(.dark) .logo-dark { display: block; }
	:global(.dark) .nav-brand { color: #fff; }
	.header-controls { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
	.language-control { position: relative; }
	.language-toggle { min-height: 38px; display: inline-flex; align-items: center; gap: 6px; padding: 0 9px; border: 1px solid #d1ddd4; border-radius: 10px; background: transparent; color: #254d38; font-size: 12px; font-weight: 750; }
	.language-toggle:hover { background: #e7efe8; }
	.language-options { position: absolute; top: calc(100% + 9px); right: 0; z-index: 110; width: 220px; max-height: min(70vh, 420px); overflow-y: auto; padding: 6px; border: 1px solid #355342; border-radius: 12px; background: #17271e; box-shadow: 0 16px 36px #0004; }
	.language-options button { display: block; width: 100%; padding: 9px 11px; border: 0; border-radius: 7px; background: none; color: #e4f1e8; text-align: left; font-size: 13px; }
	.language-options button:hover, .language-options button[aria-selected="true"] { background: #28523b; }
	.mobile-language { display: none; }
	.theme-toggle { width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid #d1ddd4; border-radius: 10px; background: transparent; color: #254d38; }
	.theme-toggle:hover { background: #e7efe8; }
	.desktop-nav { display: flex; align-items: center; flex: 1; min-width: 0; }
	.nav-left, .nav-right { display: flex; align-items: center; gap: clamp(14px, 2vw, 30px); }
	.nav-right { margin-left: auto; }
	.desktop-nav a { text-decoration: none; color: #365747; font-weight: 700; font-size: 13px; white-space: nowrap; }
	.desktop-nav a:hover { color: #218960; }
	.desktop-nav .nav-cta { background: #238b67; color: white; border-radius: 10px; padding: 12px 16px; }
	.desktop-nav .nav-cta:hover { background: #176d50; color: white; }
	.mobile-nav { display: none; }
	.menu-button { display: none; width: 38px; height: 38px; padding: 7px; border: 0; background: none; color: #16c784; cursor: pointer; }
	.menu-button svg { display: block; width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
	:global(main.ctr-main) { flex: 1; }
	:global(.dark) .ctr-header { background: #101d18ed; border-color: #2b4537; }
	:global(.dark) .desktop-nav a { color: #c1d7c8; }
	:global(.dark) .desktop-nav a:hover { color: #a1e0b7; }
	:global(.dark) .desktop-nav .nav-cta { color: white; }
	:global(.dark) .theme-toggle { color: #e3f1e7; border-color: #395745; }
	:global(.dark) .theme-toggle:hover { background: #1c3528; }
	:global(.dark) .language-toggle { color: #e3f1e7; border-color: #395745; }
	:global(.dark) .language-toggle:hover { background: #1c3528; }
	@media(max-width: 996px) {
		.ctr-header, :global(.dark) .ctr-header { background: #0f172acc; border-color: #33415580; backdrop-filter: blur(12px); }
		.logo-light, :global(.dark) .logo-light { display: none; }
		.logo-dark, :global(.dark) .logo-dark { display: block; }
		.nav-brand, :global(.dark) .nav-brand { color: #fff; }
		.theme-toggle { display: none; }
		.desktop-language { display: none; }
		.menu-button { display: grid; place-items: center; width: 40px; height: 40px; padding: 4px; color: #fff; }
		.menu-button svg { width: 32px; height: 32px; }
		.header-controls { margin-left: auto; }
		.desktop-nav { display: none; }
		.mobile-nav { display: block; position: fixed; top: 72px; right: 0; bottom: 0; left: 0; z-index: 99; overflow-y: auto; background: #1f2937; padding-bottom: env(safe-area-inset-bottom, 0px); }
		.mobile-nav a { display: flex; width: 100%; align-items: center; justify-content: center; gap: 8px; padding: 32px 16px; border-bottom: 1px solid #4755694d; color: #fff; text-align: center; text-decoration: none; font-size: 20px; line-height: 28px; font-weight: 400; }
		.mobile-nav a:hover, .mobile-nav a:focus-visible { color: #818cf8; }
		.mobile-language { display: block; }
		.mobile-language-toggle { display: flex; width: 100%; align-items: center; justify-content: center; gap: 9px; padding: 32px 16px; border: 0; border-bottom: 1px solid #4755694d; background: none; color: white; font-size: 20px; }
		.mobile-language-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: #4755694d; }
		.mobile-language-options button { padding: 16px 8px; border: 0; background: #1f2937; color: #e5e7eb; font-size: 15px; }
		.mobile-language-options button[aria-current="true"] { color: #a9e7b9; font-weight: 800; }
	}
	@media(max-width: 650px) {
		.header-inner { width: min(100% - 32px, 1200px); }
	}
</style>
