import { description } from '../../package.json'

module.exports = {
  title: "Tibilius' Blog",
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'stylesheet', href: `/assets/fontawesome/css/all.min.css` }],
  ],
  lang: 'en-US',
  theme: 'meteorlxy',
  themeConfig: {
    personalInfo: {
      nickname: 'Tibilius',
      avatar: '/img/avatar.png',
      description: description,
      sns: {
        github: {
          account: 'TibiIius',
          link: 'https://github.com/TibiIius',
        },
      },
    },
    header: {
      background: {
        // URL of the background image. If you set the URL, the random pattern will not be generated, and the `useGeo` will be ignored.
        url: undefined,
        // Use random pattern. If you set it to `false`, and you don't set the image URL, the background will be blank.
        useGeo: true,
      },
      // show title in the header or not
      showTitle: true,
    },
    // Info Card Config (Optional)
    infoCard: {
      // The background of the info card's header. You can choose to use an image, or to use random pattern (geopattern)
      headerBackground: {
        // URL of the background image. If you set the URL, the random pattern will not be generated, and the `useGeo` will be ignored.
        url: undefined,

        // Use random pattern. If you set it to `false`, and you don't set the image URL, the background will be blank.
        useGeo: false,
      },
    },
    // We disable comments for now
    // Using a GitHub OAuth App, you will leak your client secret if you handle this client-side (see https://github.com/meteorlxy/vssue/issues/16)
    // Either we should use gatekeeper as a server-side solution, or we should use GitLab as a provider, as their Implicit Grant flow does not require a client secret
    comments: false,
    lastUpdated: true,
    smoothScroll: true,
    defaultPages: {
      // Allow theme to add Home page (url: /)
      home: true,
      // Allow theme to add Posts page (url: /posts/)
      posts: true,
    },
    nav: [{ text: 'Posts', link: '/posts/', exact: false }],
    footer: {
      poweredBy: true,
      poweredByTheme: true,
      custom: '<a href=/rss.xml target=_blank>RSS <i class="fa-regular fa-rss"></i></a>',
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-active-header-links',
    'vuepress-plugin-reading-time',
    'reading-progress',
    [
      '@vuepress/plugin-blog',
      {
        feed: {
          canonical_base: 'https://blog.timfb.dev',
          feeds: {
            atom1: {
              enable: false,
            },
            json1: {
              enable: false,
            },
          },
        },
      },
    ],
  ],
}
