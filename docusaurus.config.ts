import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const config: Config = {
  title: "INCLUSION AI",
  tagline:
    "InclusionAI (IAI) envisions AGI as humanity's shared milestone, not a privileged asset",
  favicon: "img/favicon.png",

  future: {
    v4: true,
  },

  url: "https://www.inclusion-ai.org",
  baseUrl: "/",

  organizationName: "inclusionAI",
  projectName: "inclusionai.github.io",

  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: { label: "English" },
      zh: { label: "简体中文" },
    },
  },

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Cqd8ihRLum0CCg8rz0hYKPoLZ3uw+gES2rXQXycqnL5pgVQIflxAUDS7ZSjIqLy",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarCount: "ALL",
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "ignore",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-NMEMBZ8R90",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/banner.png",
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "inclusionAI",
      logo: {
        alt: "inclusionAI Logo",
        src: "img/logo_head.png",
        style: { height: "36px" },
      },
      items: [
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/publication", label: "Publication", position: "left" },
        { to: "/about", label: "About", position: "left" },
        {
          href: "https://github.com/inclusionAI",
          label: "Try Ling & Ming",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Models",
          items: [
            {
              label: "HuggingFace",
              href: "https://huggingface.co/inclusionAI",
            },
            {
              label: "ModelScope",
              href: "https://modelscope.cn/organization/inclusionAI",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/inclusionAI",
            },
            {
              label: "X (Twitter)",
              href: "https://x.com/ant_oss",
            },
            {
              label: "Discord",
              href: "https://discord.gg/2X4zBSz9c6",
            },
          ],
        },
        {
          title: "Site",
          items: [
            { label: "Blog", to: "/blog" },
            { label: "Publication", to: "/publication" },
            { label: "About", to: "/about" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} inclusionAI, Ant Group. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.github,
      additionalLanguages: ["python", "bash", "json", "yaml"],
    },
  } satisfies Preset.ThemeConfig,

  plugins: ["./plugins/recent-blog-posts.js"],
};

export default config;
