import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "A collection of notes for your computer science degree",
  tagline: "Because we all know you're behind on lectures",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://cs-pocketbook.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "cs-pocketbook", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/emmanuel-bob-ma-joey/entire-computer-science-degree/tree/main",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/emmanuel-bob-ma-joey/entire-computer-science-degree/tree/main",
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
        // sitemap: {
        //   lastmod: "date",
        //   changefreq: "weekly",
        //   priority: 0.5,
        //   ignorePatterns: ["/tags/**"],
        //   filename: "sitemap.xml",
        // },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-live-codeblock", "@docusaurus/theme-mermaid"],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "CS PocketBook",
      logo: {
        alt: "CS BocketBook Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Notes",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/emmanuel-bob-ma-joey/entire-computer-science-degree",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Notes",
        //       to: "/docs/intro",
        //     },
        //   ],
        // },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "#",
        //     },
        //     {
        //       label: "Discord",
        //       href: "#",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "#",
        //     },
        //   ],
        // },
        // {
        //   title: "More",
        //   items: [
        //     {
        //       label: "Blog",
        //       to: "/blog",
        //     },
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/emmanuel-bob-ma-joey/entire-computer-science-degree",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Emmanuel Bob Ma Joey`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  plugins: [
    [
      "vercel-analytics",
      {
        debug: true,
        mode: "auto",
      },
    ],
  ],
};

export default config;
