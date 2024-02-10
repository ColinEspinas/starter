// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/kinde',
    'radix-vue/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/fontaine',
  ],

  extends: ['nuxt-umami'],

  css: [
    '~/assets/css/main.css',
  ],

  googleFonts: {
    families: {
      'Hanken Grotesk': true,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    // Private keys which are only available within server-side
    dbUrl: '',
    passwordPepper: '',
    stripeSecret: '',
    kinde: {
      defaultOrg: '',
    },
    public: {
      // Keys within public, will be also exposed to the client-side
      stripeKey: '',
      appDomain: '',
    },
  },

  imports: {
    dirs: [
      'composables/**',
    ],
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', files: ['en.json'] },
      { code: 'fr', iso: 'fr-FR', files: ['fr.json'] },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: './i18n',
  },
})
