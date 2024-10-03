import type {User} from "~/types/User";
import {usePermissionsStore} from "~/store/permissions_store";
import {useTournoisStore} from "~/store/tournois_store";
import type {Api} from "~/plugins/api";

export const useAuthStore = (api: Api) => {
  const authToken = useState<string | null>('authToken', () => null)
  const user = useState<User | null>('user', () => null)

  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post<any>('/users/sign_in', {user: credentials})
    authToken.value = response?.headers['authorization'].replace('Bearer ', '')
    user.value = response?.data.user
    const authCookie = useCookie('auth-token', {sameSite: 'strict'})
    authCookie.value = authToken.value
    const permissionsStore = usePermissionsStore(api)
    await permissionsStore.fetchPermissions()
  }
  const logout = async () => {
    await api.delete<any>('/users/sign_out')
    authToken.value = null
    user.value = null
    usePermissionsStore(api).clearPermissions()
    useTournoisStore(api).tournoiActif.value = null
    useCookie('auth-token', {sameSite: 'strict'}).value = null
    navigateTo({name: 'Connexion'})
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