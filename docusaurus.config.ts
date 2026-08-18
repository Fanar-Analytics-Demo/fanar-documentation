import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Fanar Documentation',
  tagline: 'Connect to your data, visualize, and share insights',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://docs.fanar.tech',
  baseUrl: '/',
  organizationName: 'Fanar-Analytics-Demo',
  projectName: 'fanar-documentation',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // The docs were reorganised around what people are doing rather than
        // Redash's original KB taxonomy. Keep the old URLs alive.
        redirects: [
          {from: '/user-guide/getting-started', to: '/start/first-steps'},
          {from: '/self-hosted/setup', to: '/administer/self-hosted-setup'},
          {from: '/self-hosted/admin-guide', to: '/administer'},
          {from: '/self-hosted/dev-guide', to: '/develop'},
          {from: '/data-sources/supported-data-sources', to: '/connect'},
          {from: '/fanar', to: '/ask'},
          {from: '/fanar/agent', to: '/ask/chat'},
          {from: '/fanar/agent-memory', to: '/ask/conversations'},
          {from: '/fanar/development', to: '/develop/local-setup'},
          {from: '/fanar/langsmith', to: '/develop/langfuse'},
          {from: '/fanar/multi-org', to: '/administer/multi-org'},
          {from: '/user-guide/semantic-layer', to: '/ask/semantic-layer'},
        ],
        createRedirects(existingPath: string) {
          // Whole subtrees that moved without changing their leaf paths.
          const moves: Array<[string, string[]]> = [
            ['/build/', ['/user-guide/']],
            ['/administer/users/', ['/user-guide/users/']],
            ['/ask/semantic-layer/', ['/user-guide/semantic-layer/']],
            ['/connect/', ['/data-sources/']],
            ['/administer/', ['/self-hosted/admin-guide/']],
            ['/develop/', ['/self-hosted/dev-guide/', '/user-guide/integrations-and-api/']],
          ];
          for (const [prefix, olds] of moves) {
            if (existingPath.startsWith(prefix)) {
              return olds.map((old) => old + existingPath.slice(prefix.length));
            }
          }
          return undefined;
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Fanar-Analytics-Demo/fanar-documentation/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Fanar',
      logo: {
        alt: 'Fanar',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Fanar-Analytics-Demo/fanar',
          label: 'Fanar App',
          position: 'right',
        },
        {
          href: 'https://github.com/Fanar-Analytics-Demo/fanar-documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get started',
          items: [
            {label: 'Your first 10 minutes', to: '/start/first-steps'},
            {label: 'Core concepts', to: '/start/concepts'},
            {label: 'Connect your data', to: '/connect'},
          ],
        },
        {
          title: 'Ask Fanar',
          items: [
            {label: 'Chat', to: '/ask/chat'},
            {label: 'Teaching Fanar your business', to: '/ask/teaching-fanar'},
            {label: 'Semantic layer', to: '/ask/semantic-layer'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Administer', to: '/administer'},
            {label: 'Develop', to: '/develop'},
            {label: 'Attribution', to: '/reference/attribution'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fanar. Built on Redash (BSD-2-Clause).`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
