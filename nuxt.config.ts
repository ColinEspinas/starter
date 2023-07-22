// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  googleFonts: {
    families: {
      Inter: true,
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

    public: {
      // Keys within public, will be also exposed to the client-side
    },
  },
})
