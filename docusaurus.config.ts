import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/.env.api` });
dotenv.config({ path: `${__dirname}/.env.common.site` });
dotenv.config({ path: `${__dirname}/.env.pools` });
dotenv.config({ path: `${__dirname}/.env.urls` });
dotenv.config({ path: `${__dirname}/.env.resources` });

import remarkCorepass from "remark-corepass";
import remarkCorebc from "remark-corebc";
import remarkCurrencyFormatter from "remark-currency-formatter";
import remarkFediverseUser from "remark-fediverse-user";

const config: Config = {
  title: process.env.NAME,
  tagline: process.env.DESCRIPTION,
  favicon: process.env.IMAGES_FAVICON,

  // Set the production url of your site here
  url: process.env.WEBSITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "catchthatrabbit", // Usually your GitHub org/user name.
  projectName: "catchthatrabbit-web", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    API_ENDPOINTS: {
      EU_PRIMARY_API_ENDPOINT: process.env.EU_PRIMARY_API_ENDPOINT,
      NEXT_PUBLIC_EU_PRIMARY_API_ENDPOINT:
        process.env.NEXT_PUBLIC_EU_PRIMARY_API_ENDPOINT,
      EU_BACKUP_API_ENDPOINT: process.env.EU_BACKUP_API_ENDPOINT,
      NEXT_PUBLIC_EU_BACKUP_API_ENDPOINT:
        process.env.NEXT_PUBLIC_EU_BACKUP_API_ENDPOINT,
      AS_PRIMARY_API_ENDPOINT: process.env.AS_PRIMARY_API_ENDPOINT,
      NEXT_PUBLIC_AS_PRIMARY_API_ENDPOINT:
        process.env.NEXT_PUBLIC_AS_PRIMARY_API_ENDPOINT,
      AS_BACKUP_API_ENDPOINT: process.env.AS_BACKUP_API_ENDPOINT,
      NEXT_PUBLIC_AS_BACKUP_API_ENDPOINT:
        process.env.NEXT_PUBLIC_AS_BACKUP_API_ENDPOINT,
      US_PRIMARY_API_ENDPOINT: process.env.US_PRIMARY_API_ENDPOINT,
      NEXT_PUBLIC_US_PRIMARY_API_ENDPOINT:
        process.env.NEXT_PUBLIC_US_PRIMARY_API_ENDPOINT,
      US_BACKUP_API_ENDPOINT: process.env.US_BACKUP_API_ENDPOINT,
      NEXT_PUBLIC_US_BACKUP_API_ENDPOINT:
        process.env.NEXT_PUBLIC_US_BACKUP_API_ENDPOINT,
    },
    API_PATH: process.env.API_PATH,
    URLS: {
      TRANSACTION_DETAILS_URL: process.env.TRANSACTION_DETAILS_URL,
      BLOCK_DETAILS_URL: process.env.BLOCK_DETAILS_URL,
      GO_CORE_CLIENT_URL: process.env.GO_CORE_CLIENT_URL,
      CORE_TALK_SPACE_URL: process.env.CORE_TALK_SPACE_URL,
      ICAN_WALLET_URL: process.env.ICAN_WALLET_URL,
      GITHUB_RELEASE_DOWNLOAD_URL: process.env.GITHUB_RELEASE_DOWNLOAD_URL,
      GITHUB_RAW_MINE_SH: process.env.GITHUB_RAW_MINE_SH,
    },
    START_MINING_POOL_CONFIGURATIONS: {
      EU_FULL_NAME: process.env.EU_FULL_NAME,
      EU_NAME: process.env.EU_NAME,
      EU_SERVER: process.env.EU_SERVER,
      EU_PORT: process.env.EU_PORT,
      EU_USERNAME: process.env.EU_USERNAME,
      EU_PASSWORD: process.env.EU_PASSWORD,
      EU_BACKUP_FULL_NAME: process.env.EU_BACKUP_FULL_NAME,
      EU_BACKUP_NAME: process.env.EU_BACKUP_NAME,
      EU_BACKUP_SERVER: process.env.EU_BACKUP_SERVER,
      EU_BACKUP_PORT: process.env.EU_BACKUP_PORT,
      EU_BACKUP_USERNAME: process.env.EU_BACKUP_USERNAME,
      EU_BACKUP_PASSWORD: process.env.EU_BACKUP_PASSWORD,
      AS_FULL_NAME: process.env.AS_FULL_NAME,
      AS_NAME: process.env.AS_NAME,
      AS_SERVER: process.env.AS_SERVER,
      AS_PORT: process.env.AS_PORT,
      AS_USERNAME: process.env.AS_USERNAME,
      AS_PASSWORD: process.env.AS_PASSWORD,
      AS_BACKUP_FULL_NAME: process.env.AS_BACKUP_FULL_NAME,
      AS_BACKUP_NAME: process.env.AS_BACKUP_NAME,
      AS_BACKUP_SERVER: process.env.AS_BACKUP_SERVER,
      AS_BACKUP_PORT: process.env.AS_BACKUP_PORT,
      AS_BACKUP_USERNAME: process.env.AS_BACKUP_USERNAME,
      AS_BACKUP_PASSWORD: process.env.AS_BACKUP_PASSWORD,
      US_FULL_NAME: process.env.US_FULL_NAME,
      US_NAME: process.env.US_NAME,
      US_SERVER: process.env.US_SERVER,
      US_PORT: process.env.US_PORT,
      US_USERNAME: process.env.US_USERNAME,
      US_PASSWORD: process.env.US_PASSWORD,
      US_BACKUP_FULL_NAME: process.env.US_BACKUP_FULL_NAME,
      US_BACKUP_NAME: process.env.US_BACKUP_NAME,
      US_BACKUP_SERVER: process.env.US_BACKUP_SERVER,
      US_BACKUP_PORT: process.env.US_BACKUP_PORT,
      US_BACKUP_USERNAME: process.env.US_BACKUP_USERNAME,
      US_BACKUP_PASSWORD: process.env.US_BACKUP_PASSWORD,
    },

    MAINTAINERS_SUPPORT_EMAIL: process.env.MAINTAINERS_SUPPORT_EMAIL,
    MAINTAINERS_SUPPORT_DESCRIPTION:
      process.env.MAINTAINERS_SUPPORT_DESCRIPTION,
    MAINTAINERS_SECURITY_EMAIL: process.env.MAINTAINERS_SECURITY_EMAIL,
    MAINTAINERS_SECURITY_DESCRIPTION:
      process.env.MAINTAINERS_SECURITY_DESCRIPTION,
    MAINTAINERS_COMMERCIAL_EMAIL: process.env.MAINTAINERS_COMMERCIAL_EMAIL,
    MAINTAINERS_COMMERCIAL_DESCRIPTION:
      process.env.MAINTAINERS_COMMERCIAL_DESCRIPTION,

    ESTD: process.env.ESTD,

    EFFECTS_SHOW_LOCATIONS: process.env.EFFECTS_SHOW_LOCATIONS,
    EFFECTS_SHOW_ACTION_ICONS: process.env.EFFECTS_SHOW_ACTION_ICONS,
    SLOGAN_PRIMARY: process.env.SLOGAN_PRIMARY,
    SLOGAN_SECONDARY: process.env.SLOGAN_SECONDARY,

    EFFECTS_OK_EMOJI: process.env.EFFECTS_OK_EMOJI,
    EFFECTS_BRB_EMOJI: process.env.EFFECTS_BRB_EMOJI,
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: `https://github.com/catchthatrabbit/frontend/edit/master/docs`,
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
            "https://github.com/catchthatrabbit/frontend/edit/master/blog",
          path: "blog",
          routeBasePath: "/blog",
          blogSidebarCount: 0,
          blogTitle: "Blog news",
          postsPerPage: 10,
          feedOptions: {
            type: "all",
            copyright: `${process.env.org || "CTR"} ⛬ Copyright CatchThatRabbit`,
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
          customCss: "./src/css/custom.css",
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
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Organization",
        name: "CatchThatRabbit",
        url: "https://catchthatrabbit.com",
        logo: "https://catchthatrabbit.com/img/logo.svg",
      }),
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: process.env.IMAGES_OG,
    metadata: [
      {
        name: "description",
        content: process.env.DESCRIPTION,
      },
      { property: "og:title", content: "Catch that Rabbit" },
      {
        property: "og:description",
        content: process.env.DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content: process.env.KEYWORDS,
      },
    ],
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "CTR LOGO",
        src: process.env.IMAGES_LOGO,
        width: "256px",
      },
      items: [
        {
          href: "/blocks",
          label: "Blocks",
          position: "right",
        },
        {
          href: "/payments",
          label: "Payments",
          position: "right",
        },
        {
          href: "/miners",
          label: "Miners",
          position: "right",
        },
        {
          href: "/contact",
          label: "Contact",
          position: "right",
        },
        {
          href: "/start-mining",
          label: "Start Mining",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "My Site Logo",
        src: process.env.IMAGES_LOGO,
      },
      links: [
        {
          title: "Start",
          items: [
            {
              label: "Start mining",
              to: "/start-mining",
            },
            {
              label: "DACH Pool",
              to: "/start-mining#de",
            },
            {
              label: "ASEAN Pool",
              to: "/start-mining#sg",
            },
            {
              label: "East Asian Pool",
              to: "/start-mining#hk",
            },
          ],
        },
        {
          title: "Stats",
          items: [
            {
              label: "Miners",
              href: "/miners",
            },
            {
              label: "Latest blocks",
              href: "/blocks",
            },
            {
              label: "Payments",
              href: "/payments",
            },
          ],
        },
        {
          title: "About",
          items: [
            {
              label: "Contact",
              to: "/contact",
            },
            {
              label: "Pool details",
              href: "/start-mining#pool-details",
            },
            {
              label: "Mining software",
              href: "/start-mining#software",
            },
            {
              label: "Mobile App",
              href: "/start-mining#app",
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
