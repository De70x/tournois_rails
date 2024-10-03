import type {User} from "~/types/User";
import type {Api} from "~/plugins/api";
import {usePermissionsStore} from "~/stores/usePermissionsStore";
import {useTournoisStore} from "~/stores/useTournoisStore";

export const useAuthStore = (api: Api) => {
  const authToken = useState<string | null>('authToken', () => null)
  const user = useState<User | null>('user', () => null)

  const {fetchPermissions, clearPermissions} = usePermissionsStore(api)
  const {tournoiActif} = useTournoisStore(api)

  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post<any>('/users/sign_in', {user: credentials})
    authToken.value = response?.headers['authorization'].replace('Bearer ', '')
    user.value = response?.data.user
    const authCookie = useCookie('auth-token', {sameSite: 'strict'})
    authCookie.value = authToken.value
    await fetchPermissions()
  }
  const logout = async () => {
    await api.delete<any>('/users/sign_out')
    authToken.value = null
    user.value = null
    clearPermissions()
    tournoiActif.value = null
    useCookie('auth-token', {sameSite: 'strict'}).value = null
    await navigateTo({name: 'Connexion'})
  }

  const signup = async (credentials: { email: string; password: string }) => {
    await api.post<any>('/users', {user: credentials})
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