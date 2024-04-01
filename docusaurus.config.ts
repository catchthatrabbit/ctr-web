import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
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
    US_START_MINING_POOL_LOCATION : null,
    EU_START_MINING_POOL_LOCATION : null,
    AS_START_MINING_POOL_LOCATION : null,
    ESTD: null,
    TRANSACTION_DETAILS_URL: null,
    BLOCK_DETAILS_URL:null,
    GO_CORE_CLIENT_URL:null
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
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
              to: '/docs/intro',
            },
            {
              label: 'EU pool',
              to: '/docs/intro',
            },
            {
              label: 'AS pool',
              to: '/docs/intro',
            },
            {
              label: 'US pool',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Stats',
          items: [
            {
              label: 'Miners',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Latest blocks',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Payments',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Contact',
              to: '/blog',
            },
            {
              label: 'Pool details',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Mining software',
              href: 'https://github.com/facebook/docusaurus',
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
