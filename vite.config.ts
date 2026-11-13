import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { Config } from 'vite-plugin-config';
import tailwindcss from '@tailwindcss/vite';

declare const process: { env: Record<string, string | undefined> };

// Language configuration: availableLocales as locale codes; names are read from each locale's language.descriptiveName in src/i18n
const languageConfig = {
	enabled: true,
	icon: 'languages',
	showName: false,
	availableLocales: ['en', 'de', 'es', 'fr', 'it', 'pt-br', 'sk', 'vi', 'ja', 'ru', 'th', 'zh-cn'],
	defaultLocale: 'en',
	autoDetect: true
};

const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:5173'; // Site domain

// ─── Client config (no server-only keys; used in define and client bundles) ───
const siteConfigClient: Config = {
	title: 'Catch That Rabbit | Core mining pool',
	url: siteUrl,
	organizationName: 'catchthatrabbit',
	projectName: 'ctr-web-new',
	favicon: '/img/favicon.ico',
	language: languageConfig,
	themeConfig: {
		navbar: {
			logo: {
				src: '/img/rabbit-black.svg',
					srcDark: '/img/rabbit-white.svg',
				alt: 'Catch That Rabbit' // Logo alt attribute
			},
			style: 'blur', // Navbar style (auto, blur, transparent)
			orientation: 'horizontal', // Navbar orientation (horizontal, vertical)
			hideOnScroll: false, // Hide navbar on scroll down
			iconExternal: true, // Icon for external links
			items: [
				{ label: 'Blocks', to: '/blocks', position: 'right' },
				{ label: 'Payments', to: '/payments', position: 'right' },
				{ label: 'Miners', to: '/miners', position: 'right' },
				{ label: 'Launch Miner', to: '/go-live', position: 'right' },
				{ label: 'Contact', to: '/contact', position: 'right' },
				{ label: 'Start mining', to: '/start-mining', position: 'right', className: 'button' }
			]
		},
		footer: {
			style: 'transparent',
			logo: {
				src: '/img/rabbit-black.svg',
				alt: 'Catch That Rabbit' // Logo alt attribute
			},
			iconExternal: true, // Icon for external links
			links: [
				{
					title: 'Mining',
					items: [
						{ label: 'Start mining', to: '/start-mining' },
						{ label: 'Launch Miner', to: '/go-live' },
						{ label: 'Profit Calculator', to: '/calculator' },
						{ label: 'Pool fee', to: '/fee' },
						{ label: 'Miners', to: '/miners' },
						{ label: 'Payments', to: '/payments' },
						{ label: 'Blocks', to: '/blocks' }
					]
				},
				{
					title: 'Developers',
					items: [
						{ label: 'API Postman' },
						{ label: 'GitHub', href: 'https://github.com/catchthatrabbit/pool', target: '_blank', rel: 'noopener noreferrer' },
						{ label: 'LLMS', href: '/llms.txt', target: '_blank', rel: 'noopener noreferrer' }
					]
				},
				{
					title: 'Ecosystem',
					items: [
						{ label: 'Mobile app', to: '/mobile-app' },
						{ label: 'Core Talk', href: 'https://coretalk.space/@catchthatrabbit', target: '_blank' },
						{ label: 'Core Blockchain', href: 'https://coreblockchain.net', target: '_blank' },
						{ label: 'Mining Software', href: 'https://github.com/catchthatrabbit/coreminer', target: '_blank' }
					]
				},
				{
					title: 'About',
					items: [
						{ label: 'Contact', to: '/contact' },
						{ label: 'GPG key', href: 'https://keys.openpgp.org/vks/v1/by-fingerprint/AF5A75BDC5748490B63A4FE2F0E61C2B76529B62', target: '_blank' }
					]
				}
			],
			liner: [],
			copyright: `© 2022–${new Date().getFullYear()} Catch That Rabbit`
		},
		metadata: [
			{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, // Viewport meta tag
			{ name: 'theme-color', content: '#238b67' },
			{ name: 'description', content: 'Catch That Rabbit Core Blockchain mining pool' },
			{ name: 'keywords', content: 'Core Blockchain, XCB, mining pool, Catch That Rabbit' },
			{ property: 'og:type', content: 'website' }, // Open Graph type meta tag
		],
		colorMode: {
			defaultMode: 'dark', // Default color mode
			disableSwitch: false, // Disable color mode switch
			respectPrefersColorScheme: true // Respect browser color scheme preference
		}
	},
	api: {
		enabled: true
	},
	modules: {}
};

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter()
		}),
		VitePWA({
			registerType: 'autoUpdate',
			outDir: '.svelte-kit/output/client',
			injectRegister: false,
			includeAssets: ['img/icons/favicon.svg', 'robots.txt', 'img/icons/apple-touch-icon.png'],
			workbox: {
				globPatterns: ['_app/immutable/**/*.{js,css,wasm}'],
				cleanupOutdatedCaches: true,
				skipWaiting: true,
				clientsClaim: true,
				// SvelteKit does not output index.html in precache; disable default fallback to avoid "non-precached-url" error.
				navigateFallback: null
			},
			manifest: {
				name: 'Catch That Rabbit',
				short_name: 'CTR',
				description: 'Core Blockchain mining pool',
				theme_color: '#238b67',
				icons: [
					{
						src: '/img/icons/ctr-256.png',
						sizes: '256x256',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		}).map((plugin) => {
			// SvelteKit renders app.html itself; manifest and registration are handled
			// by app.html and +layout.svelte rather than Vite's HTML pipeline.
			delete plugin.transformIndexHtml;
			if (plugin.name === 'vite-plugin-pwa:build') {
				// Kit 3 builds server and client environments separately. Generate the
				// service worker only after the client assets have been written.
				plugin.applyToEnvironment = (environment) => environment.name === 'client';
			}
			return plugin;
		})
	],
	define: {
		__SITE_CONFIG__: JSON.stringify(siteConfigClient),
		__DEV_MODE__: process.env.DEV_MODE === '1'
	},
	ssr: {
		noExternal: ['@lucide/svelte']
	}
});
