import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import remarkCorepass from "remark-corepass";
import remarkCorebc from "remark-corebc";
import remarkCurrencyFormatter from 'remark-currency-formatter';
import remarkFediverseUser from "remark-fediverse-user";

const config: Config = {
  title: 'Catch that Rabbit',
  tagline: 'Catch that Rabbit — ₡ORE mining pool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://catchthatrabbit.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'catchthatrabbit', // Usually your GitHub org/user name.
  projectName: 'frontend', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: "throw",
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  customFields: {
    EU_PRIMARY_API_ENDPOINT : null,
    NEXT_PUBLIC_EU_PRIMARY_API_ENDPOINT : null,
    EU_BACKUP_API_ENDPOINT:null,
    NEXT_PUBLIC_EU_BACKUP_API_ENDPOINT:null,
    AS_PRIMARY_API_ENDPOINT:null,
    NEXT_PUBLIC_AS_PRIMARY_API_ENDPOINT:null,
    AS_BACKUP_API_ENDPOINT:null,
    NEXT_PUBLIC_AS_BACKUP_API_ENDPOINT:null,
    US_PRIMARY_API_ENDPOINT:null,
    NEXT_PUBLIC_US_PRIMARY_API_ENDPOINT:null,
    US_BACKUP_API_ENDPOINT:null,
    NEXT_PUBLIC_US_BACKUP_API_ENDPOINT:null,
    // Mining locations links
    AM_START_MINING_POOL_LOCATION : null,
    EU_START_MINING_POOL_LOCATION : null,
    AS_START_MINING_POOL_LOCATION : null,
    // Established year
    ESTD: null,
    TRANSACTION_DETAILS_URL: null,
    BLOCK_DETAILS_URL:null,
    CORE_CLIENT_URL:null
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            `https://github.com/catchthatrabbit/frontend/edit/master/docs`,
          routeBasePath: "/docs",
          path: "docs",
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
            'https://github.com/catchthatrabbit/frontend/edit/master/blog',
          path: 'blog',
          routeBasePath: '/blog',
          blogSidebarCount: 0,
          blogTitle: 'Blog news',
          postsPerPage: 10,
          feedOptions: {
            type: 'all',
            copyright: `${process.env.org || 'CTR'} ⛬ Copyright CatchThatRabbit`,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
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
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/manifest.json",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "generator",
        content: "CTR Generator",
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
        name: "description",
        content:
          "Catch that Rabbit — ₡ORE mining pool",
      },
      { property: "og:title", content: "Catch that Rabbit" },
      {
        property: "og:description",
        content:
          "Catch that Rabbit — ₡ORE mining pool",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content: `catch,that,rabbit,mining,pool,core,ore,₡ORE,blockchain,xcb,xce,xab,network,open-source,open,source,mainnet,devin`,
      },
    ],
    navbar: {
      hideOnScroll:true,
      logo: {
        alt: 'CTR LOGO',
        src: 'img/logo.svg',
        width: '256px'
      },
      items: [
        {
          href: '/blocks',
          label: 'Blocks',
          position: 'right'
        },
        {
          href: '/payments',
          label: 'Payments',
          position: 'right'
        },
        {
          href: '/miners',
          label: 'Miners',
          position: 'right',
        },
        {
          href: '/contact',
          label: 'Contact',
          position: 'right',
        },
        {
          href: '/start-mining',
          label: 'Start Mining',
          position: 'right',
        }
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
          title: 'Start',
          items: [
            {
              label: 'Start mining',
              to: '/start-mining',
            },
            {
              label: 'DACH Pool',
              to: '/start-mining#de',
            },
            {
              label: 'ASEAN Pool',
              to: '/start-mining#sg',
            },
            {
              label: 'East Asian Pool',
              to: '/start-mining#hk',
            },
          ],
        },
        {
          title: 'Stats',
          items: [
            {
              label: 'Miners',
              href: '/miners',
            },
            {
              label: 'Latest blocks',
              href: '/blocks',
            },
            {
              label: 'Payments',
              href: '/payments',
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
              label: 'Pool details',
              href: '/start-mining#pool-details',
            },
            {
              label: 'Mining software',
              href: '/start-mining#software',
            },
            {
              label: 'Mobile App',
              href: '/start-mining#app',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Catch that Rabbit. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
