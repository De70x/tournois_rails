import {useRouter} from 'vue-router'
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin(() => {
    const {$api} = useNuxtApp()
    const authStore = useAuthStore($api)
    const router = useRouter()

    const checkSessionExpiration = () => {
        const authToken = useCookie('auth-token').value
        if (authToken) {
            const tokenPayload = JSON.parse(atob(authToken.split('.')[1]))
            const expirationTime = tokenPayload.exp * 1000
            if (expirationTime < Date.now()) {
                authStore.logout().then(
                    () => router.push('/connexion')
                )
            }
        }
    }

    onNuxtReady(() => {
        setInterval(checkSessionExpiration, 1800000) // Check every 30 minutes
    })
})