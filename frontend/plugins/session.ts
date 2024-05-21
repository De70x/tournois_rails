import {useRouter} from 'vue-router'
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore()
    const router = useRouter()

    const checkSessionExpiration = () => {
        console.log('checkig session')
        const authToken = useCookie('auth-token', {sameSite:'strict'}).value
        if (authToken) {
            const tokenPayload = JSON.parse(atob(authToken.split('.')[1]))
            const expirationTime = tokenPayload.exp * 1000 // Convert to milliseconds
            if (expirationTime < Date.now()) {
                authStore.logout().then(
                    () => router.push('/connexion')
                )
            }
        }
    }

    onNuxtReady(() => {
        setInterval(checkSessionExpiration, 60000) // Check every minute
    })
})