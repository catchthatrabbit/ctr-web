import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkCorepass from 'remark-corepass';
import remarkCorebc from 'remark-corebc';
import remarkCurrencyFormatter from 'remark-currency-formatter';
import remarkFediverseUser from 'remark-fediverse-user';

const config: Config = {
  title: 'Catch That Rabbit',
  tagline: 'Catch That Rabbit — ₡ORE mining pool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://catchthatrabbit.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'catchthatrabbit', // Usually your GitHub org/user name.
  projectName: 'ctr-web', // Repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    API_ENDPOINTS: {
      DE_API_ENDPOINT: 'https://de-api.catchthatrabbit.com',
      FI_API_ENDPOINT: 'https://fi-api.catchthatrabbit.com',
      SG_API_ENDPOINT: 'https://sg-api.catchthatrabbit.com',
      HK_API_ENDPOINT: 'https://hk-api.catchthatrabbit.com',
      US_API_ENDPOINT: 'https://us-api.catchthatrabbit.com',
    },
    API_PATH: '/v2/api/',
    URLS: {
      TRANSACTION_DETAILS: 'https://blockindex.net/tx',
      BLOCK_DETAILS: 'https://blockindex.net/block',
      BUY_LINK: 'https://app.ping.exchange?ref-code=kz3Xyxnn',
      EXCHANGE_RATES: 'https://temp-endpoint.coreport.net/api/v1',
    },
    POOLS_LIST: {
      DE: {
        NAME: 'DACH',
        DESCRIPTION: 'DACH Pool 🇩🇪🇦🇹🇨🇭',
        SERVER: 'de.catchthatrabbit.com',
        PORT: '8008',
        WORKER_NAME:
          'Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _username_domain_tld-workerPart)',
        USERNAME: '<your wallet address>.<worker name>',
        PASSWORD: '<empty>',
        PAYOUT: 'cb11ca5aa7cf5ffa5ed333e962310b3922b48af68698',
      },
      FI: {
        NAME: 'Nordic',
        DESCRIPTION: 'Nordic Pool 🇫🇮🇳🇴🇸🇪',
        SERVER: 'fi.catchthatrabbit.com',
        PORT: '8008',
        WORKER_NAME:
          'Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _username_domain_tld-workerPart)',
        USERNAME: '<your wallet address>.<worker name>',
        PASSWORD: '<empty>',
        PAYOUT: 'cb806ca47e07b803e598ea9bf7413355486723270f71',
      },
      SG: {
        NAME: 'ASEAN',
        DESCRIPTION: 'ASEAN Pool 🇸🇬🇹🇭🇵🇭',
        SERVER: 'sg.catchthatrabbit.com',
        PORT: '8008',
        WORKER_NAME:
          'Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _username_domain_tld-workerPart)',
        USERNAME: '<your wallet address>.<worker name>',
        PASSWORD: '<empty>',
        PAYOUT: 'cb060ea54cce80fcb689f8824b238118cb5005572a36',
      },
      HK: {
        NAME: 'Far-East',
        DESCRIPTION: 'Far-East Pool 🇭🇰🇨🇳🇯🇵',
        SERVER: 'hk.catchthatrabbit.com',
        PORT: '8008',
        WORKER_NAME:
          'Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _username_domain_tld-workerPart)',
        USERNAME: '<your wallet address>.<worker name>',
        PASSWORD: '<empty>',
        PAYOUT: 'cb6242d8b1903db52f99813f79fe4dff2b85fd7c1fdd',
      },
      US: {
        NAME: 'America',
        DESCRIPTION: 'American Pool 🇺🇸🇲🇽🇧🇷',
        SERVER: 'us.catchthatrabbit.com',
        PORT: '8008',
        WORKER_NAME:
          'Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _username_domain_tld-workerPart)',
        USERNAME: '<your wallet address>.<worker name>',
        PASSWORD: '<empty>',
        PAYOUT: 'cb71da3021af067f51a447f68aa59894cff7ca9cb109',
      },
    },
    DEFAULT_REGION: 'DE',
    EMAILS: {
      Support: [
        {
          email: 'support@catchthatrabbit.com',
          description:
            'For general inquiries, technical support, and assistance with mining operations. Our support team is available to help you with pool configuration, troubleshooting, and any questions about our services.',
        },
      ],
      Security: [
        {
          email: 'security@catchthatrabbit.com',
          description:
            'For reporting security vulnerabilities, incidents, or any security-related concerns. We take security seriously and appreciate responsible disclosure of any potential issues.',
        },
        {
          email: 'ctr@onion.email',
          description:
            'For reporting security vulnerabilities, incidents, or any security-related concerns. We take security seriously and appreciate responsible disclosure of any potential issues.',
          keyLink: 'https://keys.openpgp.org/vks/v1/by-fingerprint/AF5A75BDC5748490B63A4FE2F0E61C2B76529B62',
          keyId: 'F0E61C2B76529B62',
        },
      ],
      Commercial: [
        {
          email: 'contact@catchthatrabbit.com',
          description:
            'For business inquiries, partnership opportunities, and commercial discussions. The team is available to discuss mining devices, mining farm setup, hardware procurement, and other commercial arrangements.',
        },
      ],
      Rentals: [
        {
          email: 'rentals@catchthatrabbit.com',
          description:
            'For rental inquiries, partnership opportunities, and rental discussions. The team is available to discuss rented devices, mining farm setup, hardware procurement, and other rental arrangements.',
        },
      ],
    },

    ESTD: '2022',
    SLOGAN_PRIMARY: 'Mining pool for Core Blockchain',
    SLOGAN_SECONDARY: 'A mining pool in the lotusland of Ores',
    EFFECTS_EMOJI_ENABLED: false,
    EFFECTS_EMOJI_OK: '▶️',
    EFFECTS_EMOJI_BRB: '⏸️',
    APP_STORE_URL: 'https://apps.apple.com/app/corepass-id/id1644928641',
    GOOGLE_PLAY_URL:
      'https://play.google.com/store/apps/details?id=net.corepass.app',
    ENABLE_HOSTING: false,
    HOSTING: {
      URL: 'https://shop.catchthatrabbit.com',
      PROVIDER: 'shopify',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `https://github.com/catchthatrabbit/ctr-web/edit/master/docs`,
          routeBasePath: '/docs',
          path: 'docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            remarkCorepass,
            remarkCorebc,
            remarkFediverseUser,
            remarkCurrencyFormatter,
          ],
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/catchthatrabbit/ctr-web/edit/master/blog',
          path: 'blog',
          routeBasePath: '/blog',
          blogSidebarCount: 0,
          blogTitle: 'Blog news',
          postsPerPage: 10,
          feedOptions: {
            type: 'all',
            copyright: `⊛ CORE 2022 - ${new Date().getFullYear()} Catch That Rabbit.`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          remarkPlugins: [
            remarkCorepass,
            remarkCorebc,
            remarkFediverseUser,
            remarkCurrencyFormatter,
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'generator',
        content: 'CTR Generator',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'Organization',
        name: 'CatchThatRabbit',
        url: 'https://catchthatrabbit.com',
        logo: 'https://catchthatrabbit.com/img/logo.svg',
      }),
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/ctr-og.jpg',
    metadata: [
      {
        name: 'description',
        content: 'Catch that Rabbit — ₡ORE mining pool',
      },
      { property: 'og:title', content: 'Catch that Rabbit' },
      {
        property: 'og:description',
        content: 'Catch that Rabbit — ₡ORE mining pool',
      },
      { property: 'og:type', content: 'website' },
      {
        name: 'keywords',
        content:
          'catch,that,rabbit,mining,pool,core,ore,₡ORE,blockchain,xcb,xce,xab,network,open-source,open,source,mainnet,devin',
      },
    ],
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'Catch That Rabbit',
        src: 'img/ctr-logo.svg',
      },
      items: [
        {
          href: '/blocks',
          label: 'Blocks',
          position: 'right',
        },
        {
          href: '/payments',
          label: 'Payments',
          position: 'right',
        },
        {
          href: '/miners',
          label: 'Miners',
          position: 'right',
        },
        {
          href: '/go-live',
          label: 'Launch Miner',
          position: 'right',
        },
        {
          href: '/contact',
          label: 'Contact',
          position: 'right',
        },
        {
          href: '/start-mining',
          label: 'Start mining',
          position: 'right',
          className: 'button',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          title: 'Mining',
          items: [
            {
              label: 'Start mining',
              to: '/start-mining',
            },
            {
              label: 'Launch Miner',
              to: '/go-live',
            },
            {
              label: 'Profit Calculator',
              to: '/calculator',
            },
            {
              label: 'Miners',
              href: '/miners',
            },
            {
              label: 'Payments',
              href: '/payments',
            },
            {
              label: 'Blocks',
              href: '/blocks',
            },
          ],
        },

        {
          title: 'About',
          items: [
            {
              label: 'Contact',
              to: '/contact',
            },
            {
              label: 'GPG key',
              href: 'https://keys.openpgp.org/vks/v1/by-fingerprint/AF5A75BDC5748490B63A4FE2F0E61C2B76529B62',
            },
            {
              label: 'Core Talk',
              href: 'https://coretalk.space/@catchthatrabbit',
            },
            {
              label: 'Core Blockchain',
              href: 'https://coreblockchain.net',
            },
            {
              label: 'Mining Software',
              href: 'https://github.com/catchthatrabbit/coreminer',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/catchthatrabbit',
            },
          ],
        },
      ],
      copyright: `<a href="https://github.com/bchainhub/core-license" target="_blank" rel="noopener noreferrer"><span style="font-size:1.3rem">⊛</span> CORE</a> 2022 - ${new Date().getFullYear()} Catch That Rabbit.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    './src/plugins/dynamic-router-plugin.ts',
    './src/plugins/custom-post-css-plugin.ts',
  ],
};

export default config;
