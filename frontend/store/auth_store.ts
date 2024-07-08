import type {User} from "~/types/User";
import {usePermissionsStore} from "~/store/permissions_store";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: null as string | null,
        user: null as User | null,
    }),
    actions: {
        async login(credentials: { email: string; password: string }) {
            const {$api} = useNuxtApp()
            const response = await $api.post('/users/sign_in', {user: credentials})
            this.authToken = response?.headers['authorization'].replace('Bearer ', '')
            this.user = response?.data.user
            const authCookie = useCookie('auth-token', {sameSite: 'strict'})
            authCookie.value = this.authToken
            await usePermissionsStore().fetchPermissions()
        },
        async logout() {
            const {$api} = useNuxtApp()
            await $api.delete('/users/sign_out')
            this.authToken = null
            this.user = null
            usePermissionsStore().clearPermissions()
            useCookie('auth-token', {sameSite: 'strict'}).value = null
        },
        async signup(credentials: { email: string; password: string }) {
            const {$api} = useNuxtApp()
            await $api.post('/users', {user: credentials})
        }
    }
})