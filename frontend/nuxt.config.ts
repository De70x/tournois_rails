// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  debug: false,
  typescript: {
    typeCheck: true,
    strict: true
  },
  vite: {
    clearScreen: false,
    logLevel: 'error'
  },

  runtimeConfig: {
      public: {
          BASE_URL: process.env.API_URL,
      }
  },

  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/tailwindcss'],

  tailwindcss: {
      // Your Tailwind CSS configuration options (if any)
  },

  compatibilityDate: '2024-09-10'
})