export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: null as string | null,
        user: null as object | null,
    }),
    actions: {
        async login(credentials: { email: string; password: string }) {
            const {$api} = useNuxtApp()
            try {
                const response = await $api.post('/users/sign_in', {user: credentials})
                this.authToken = response?.headers['authorization'].replace('Bearer ', '')
                this.user = response?.data.user
                const authCookie = useCookie('authToken', {maxAge: 1000 * 60 * 1000, sameSite: 'strict'})
                authCookie.value = this.authToken
            } catch (error) {
                throw new Error('Failed to log in')
            }
        },
        async logout() {
            const {$api} = useNuxtApp()
            try {
                await $api.delete('/users/sign_out')
                this.authToken = null
                this.user = null
                useCookie('authToken').value = null
            } catch (error) {
                throw new Error('Failed to log out')
            }
        },
        async signup(credentials: { email: string; password: string }) {
            const {$api} = useNuxtApp()
            try {
                await $api.post('/users', {user: credentials})
            } catch (error) {
                this.authToken = null
                this.user = null
            }
        }
    },
})