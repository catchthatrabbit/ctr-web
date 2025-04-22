import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkCorepass from "remark-corepass";
import remarkCorebc from "remark-corebc";
import remarkCurrencyFormatter from "remark-currency-formatter";
import remarkFediverseUser from "remark-fediverse-user";
import path from "path";

const config: Config = {
  title: "Catch that Rabbit",
  tagline: "Catch that Rabbit — ₡ORE mining pool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "http://catchthatrabbit.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "catchthatrabbit", // Usually your GitHub org/user name.
  projectName: "frontend", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
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
      DE_API_ENDPOINT: "https://eu-api.catchthatrabbit.com/",
      NEXT_PUBLIC_DE_API_ENDPOINT: "",
      FI_API_ENDPOINT: "https://eu1-api.catchthatrabbit.com/",
      NEXT_PUBLIC_FI_API_ENDPOINT: "",
      SG_API_ENDPOINT: "https://as1-api.catchthatrabbit.com/",
      NEXT_PUBLIC_SG_API_ENDPOINT: "",
      HK_API_ENDPOINT: "https://as-api.catchthatrabbit.com/",
      NEXT_PUBLIC_HK_API_ENDPOINT: "",
      BR_API_ENDPOINT: "https://us-api.catchthatrabbit.com/",
      NEXT_PUBLIC_BR_API_ENDPOINT: "",
      JP_API_ENDPOINT: "https://us1-api.catchthatrabbit.com/",
      NEXT_PUBLIC_JP_API_ENDPOINT: "",
    },
    API_PATH: "v2/api/",
    URLS: {
      TRANSACTION_DETAILS_URL: "https://blockindex.net/tx",
      BLOCK_DETAILS_URL: "https://blockindex.net/block",
      CORE_CLIENT_URL: "https://github.com/core-coin/go-core/releases",
      CORE_TALK_SPACE_URL: "https://coretalk.space",
      ICAN_WALLET_URL: "https://github.com/core-coin/wallet-generator/releases",
      GITHUB_RELEASE_DOWNLOAD_URL:
        "https://github.com/catchthatrabbit/coreminer/releases",
      GITHUB_RAW_MINE_SH:
        "bash <(curl -s https://raw.githubusercontent.com/catchthatrabbit/coreminer/master/mine.sh)",
    },
    START_MINING_POOL_CONFIGURATIONS: {
      DE: {
        NAME: "Central Europe",
        DESCRIPTION: "DACH Pool 🇩🇪🇦🇹🇨🇭",
        SERVER: "de.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb11ca5aa7cf5ffa5ed333e962310b3922b48af68698",
      },
      FI: {
        NAME: "Backup European Pool",
        DESCRIPTION: "Northeast EU Pool 🇫🇮🇪🇺",
        SERVER: "fi.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb806ca47e07b803e598ea9bf7413355486723270f71",
      },
      SG: {
        NAME: "Asian Pool",
        DESCRIPTION: "ASEAN Pool 🇸🇬🇹🇭🇵🇭",
        SERVER: "sg.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb060ea54cce80fcb689f8824b238118cb5005572a36",
      },
      HK: {
        NAME: "Backup Asian Pool",
        DESCRIPTION: "East Asian Pool 🇭🇰🇰🇷",
        SERVER: "hk.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb6242d8b1903db52f99813f79fe4dff2b85fd7c1fdd",
      },
      BR: {
        NAME: "US Pool",
        DESCRIPTION: "American Pool 🇧🇷🇲🇽🇺🇸",
        SERVER: "br.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb532b4658c0077fe257c44fbd3ee89f8c85ce5c68e3",
      },
      JP: {
        NAME: "Backup US Pool",
        DESCRIPTION: "Japanese Pool 🇯🇵",
        SERVER: "jp.catchthatrabbit.com",
        PORT: "8008",
        WORKER_NAME:
          "Regular name (alphanumeric and underscores/hyphens) or Fediverse user (e.g., _usernameInstanceTld-id)",
        USERNAME: "<your wallet address>.<worker name>",
        PASSWORD: "<empty>",
        PAYOUT: "cb51bee89e80d6586642f29748054c1566df056472ec",
      },
    },

    MAINTAINERS_SUPPORT_EMAIL: "support@catchthatrabbit.com",
    MAINTAINERS_SUPPORT_DESCRIPTION:
      "If you have any questions about our pool, you can contact us freely through this email.",
    MAINTAINERS_SECURITY_EMAIL: [
      "security@catchthatrabbit.com",
      {
        "ctr@onion.email": "https://keys.openpgp.org/vks/v1/by-fingerprint/ABC",
      },
    ], // TODO: Replace
    MAINTAINERS_SECURITY_DESCRIPTION:
      "Any bug or any other security issue reports are highly and greatly appreciated.",
    MAINTAINERS_COMMERCIAL_EMAIL: "contact@catchthatrabbit.com",
    MAINTAINERS_COMMERCIAL_DESCRIPTION:
      "Please, feel free to email us with any legal and commercial questions.",

    ESTD: "2022",

    EFFECTS_SHOW_LOCATIONS: true,
    EFFECTS_SHOW_ACTION_ICONS: false,
    SLOGAN_PRIMARY: "Mining pool for Core Blockchain",
    SLOGAN_SECONDARY: "A mining pool in the lotusland of Ores",
    EFFECTS_EMOJI_OK: "Running",
    EFFECTS_EMOJI_BRB: "Inactive",
    APP_STORE_URL: "https://apps.apple.com/app/corepass-id/id1644928641",
    GOOGLE_PLAY_URL:
      "https://play.google.com/store/apps/details?id=net.corepass.app",
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: `https://github.com/catchthatrabbit/ctr-web/edit/master/docs`,
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
            "https://github.com/catchthatrabbit/ctr-web/edit/master/blog",
          path: "blog",
          routeBasePath: "/blog",
          blogSidebarCount: 0,
          blogTitle: "Blog news",
          postsPerPage: 10,
          feedOptions: {
            type: "all",
            copyright: `⊛ CORE 2022 - ${new Date().getFullYear()} Catch that Rabbit.`,
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
    image: "img/ctr-og.jpg",
    metadata: [
      {
        name: "description",
        content: "Catch that Rabbit — ₡ORE mining pool",
      },
      { property: "og:title", content: "Catch that Rabbit" },
      {
        property: "og:description",
        content: "Catch that Rabbit — ₡ORE mining pool",
      },
      { property: "og:type", content: "website" },
      {
        name: "keywords",
        content:
          "catch,that,rabbit,mining,pool,core,ore,₡ORE,blockchain,xcb,xce,xab,network,open-source,open,source,mainnet,devin",
      },
    ],
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "CTR LOGO",
        src: "img/newLogo.svg",
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
          label: "Start mining",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      links: [
        {
          title: "Mining",
          items: [
            {
              label: "Start mining",
              to: "/start-mining",
            },
            {
              label: "Pool statistics",
              to: "/",
            },
            {
              label: "Miners",
              href: "/miners",
            },
            {
              label: "Payments",
              href: "/payments",
            },
            {
              label: "Blocks",
              href: "/blocks",
            },
            // {
            //   label: "Mining software",
            //   href: "/docs/intro",
            // },
            // {
            //   label: "Download mining config",
            //   href: "/docs/intro",
            // },
            // {
            //   label: "Mobile App",
            //   href: "/docs/intro",
            // },
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
              label: "GPG key",
              href: "/",
            },
            {
              label: "Coreblockchain",
              href: "/docs/intro",
            },
            {
              label: "Corecoin",
              href: "/docs/intro",
            },
            {
              label: "Coretoken",
              href: "/docs/intro",
            },
          ],
        },
      ],
      copyright: `<a href="https://github.com/bchainhub/core-license" target="_blank" rel="noopener noreferrer"><span style="font-size:1.3rem">⊛</span> CORE</a> 2022 - ${new Date().getFullYear()} Catch that Rabbit.`,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    // [
    //   "@docusaurus/plugin-google-gtag",
    //   {
    //     trackingID: "G-K79ZXPBSHD",
    //     anonymizeIP: true,
    //   },
    // ]
    path.resolve(__dirname, "./src/plugins/dynamic-router-plugin.ts"),
    path.resolve(__dirname, "./src/plugins/custom-post-css-plugin.ts"),
  ],
};

export default config;
