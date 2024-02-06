// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/kinde',
    'radix-vue/nuxt',
    '@nuxtjs/i18n',
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

  colorMode: {
    classSuffix: '',
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
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    langDir: './i18n',
  },
})
