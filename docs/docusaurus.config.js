// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "New Patient Registration Demo",
  tagline: "New Patient Registration Azure AI Document Intelligence Workshop",

  url: "https://Azure-Samples.github.io/",
  baseUrl: "/azure-doc-intelligence-dynamic-models-patient/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  trailingSlash: true,

  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Azure-Samples", // Usually your GitHub org/user name.
  projectName: "azure-doc-intelligence-dynamic-models-patient", // Usually your repo name.

  deploymentBranch: "gh-pages", // Branch that GitHub pages will deploy from.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/azure-doc-intelligence-dynamic-models-patient/tree/main/docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Crafting Dynamic Document Models with Document Intelligence and Azure",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [],
      },
      footer: {
        style: "dark",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} New Patient Document Intelligence Workshop. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp"],
      },

      /* Clarity Config */
      clarity: {
        ID: "gxgduo9nnr", 
      }

    }),

    plugins: [
      [
        '@docusaurus/plugin-ideal-image',
        {
          quality: 96,
          max: 1000, // max resized image's size.
          min: 420, // min resized image's size. 
          steps: 4, // #images b/w min and max (inclusive)
          disableInDev: false,
        },
      ],
      [
        'docusaurus-plugin-clarity',
        {
        }
      ],
    ],
};

module.exports = config;
