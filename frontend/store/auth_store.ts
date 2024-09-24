import type {User} from "~/types/User";
import {usePermissionsStore} from "~/store/permissions_store";
import {useTournoisStore} from "~/store/tournois_store";

export const useAuthStore = () => {
    const authToken = useState<string | null>('authToken', () => null)
    const user = useState<User | null>('user', () => null)

    const login = async (credentials: { email: string; password: string }) => {
        const {$api} = useNuxtApp()
        const permissionsStore = usePermissionsStore()
        const response = await $api.post<any>('/users/sign_in', {user: credentials})
        authToken.value = response?.headers['authorization'].replace('Bearer ', '')
        user.value = response?.data.user
        const authCookie = useCookie('auth-token', {sameSite: 'strict'})
        authCookie.value = authToken.value
        await permissionsStore.fetchPermissions()
    }
    const logout = async () => {
        const {$api} = useNuxtApp()
        await $api.delete<any>('/users/sign_out')
        authToken.value = null
        user.value = null
        usePermissionsStore().clearPermissions()
        useTournoisStore().tournoiActif.value = null
        useCookie('auth-token', {sameSite: 'strict'}).value = null
        navigateTo({name: 'Connexion'})
    }

    const signup = async (credentials: { email: string; password: string }) => {
        const {$api} = useNuxtApp()
        await $api.post<any>('/users', {user: credentials})
    }

    const checkAndRefreshToken = async () => {
        if (authToken.value && isTokenExpired(authToken.value)) {
            try {
                authToken.value = await refreshToken();
            } catch (error) {
                // If refresh fails, log out the user
                await logout();
                console.error(error);
                navigateTo({name: 'Connexion'})
                throw error
            }
        }
    }

    return {
        authToken,
        user,
        login,
        logout,
        signup,
        checkAndRefreshToken
    }

}