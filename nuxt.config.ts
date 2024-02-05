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

    public: {
      // Keys within public, will be also exposed to the client-side
    },
  },
})
