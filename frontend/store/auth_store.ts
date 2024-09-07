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
            const permissionsStore = usePermissionsStore()
            const response = await $api.post<any>('/users/sign_in', {user: credentials})
            this.authToken = response?.headers['authorization'].replace('Bearer ', '')
            this.user = response?.data.user
            const authCookie = useCookie('auth-token', {sameSite: 'strict'})
            authCookie.value = this.authToken
            await permissionsStore.fetchPermissions()
        },
        async logout() {
            const {$api} = useNuxtApp()
            await $api.delete<any>('/users/sign_out')
            this.authToken = null
            this.user = null
            usePermissionsStore().clearPermissions()
            useCookie('auth-token', {sameSite: 'strict'}).value = null
        },
        async signup(credentials: { email: string; password: string }) {
            const {$api} = useNuxtApp()
            await $api.post<any>('/users', {user: credentials})
        },
        async checkAndRefreshToken() {
            if (this.authToken && isTokenExpired(this.authToken)) {
                try {
                    this.authToken = await refreshToken();
                } catch (error) {
                    // If refresh fails, log out the user
                    await this.logout();
                    throw error;
                }
            }
        },
    }
})