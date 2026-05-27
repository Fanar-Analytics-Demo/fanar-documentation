import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Fanar Documentation',
  tagline: 'Connect to your data, visualize, and share insights',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://lionjashari.github.io',
  baseUrl: '/fanar-documentation/',
  organizationName: 'lionjashari',
  projectName: 'fanar-documentation',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    format: 'detect',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/lionjashari/fanar-documentation/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
          href: 'https://github.com/lionjashari/fanar',
          label: 'Fanar App',
          position: 'right',
        },
        {
          href: 'https://github.com/lionjashari/fanar-documentation',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/'},
            {label: 'User Guide', to: '/user-guide/getting-started'},
            {label: 'Self-Hosted', to: '/self-hosted/setup'},
          ],
        },
        {
          title: 'Fanar',
          items: [
            {label: 'Application', href: 'https://github.com/lionjashari/fanar'},
            {label: 'AI Agent', to: '/fanar/agent'},
          ],
        },
        {
          title: 'Attribution',
          items: [
            {
              label: 'Redash (source docs)',
              href: 'https://github.com/getredash/website',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fanar. Documentation adapted from Redash (BSD-2-Clause). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
