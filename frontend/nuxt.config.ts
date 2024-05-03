// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    serverMiddleware: [
        '~/middleware/cors'
    ],
    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
        }
    },
    plugins: [
        '~/plugins/api.ts',
    ],
})
