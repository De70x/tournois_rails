import axios from "axios";
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin
(() => {
    const router = useRouter()
    axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL
    axios.interceptors.request.use(async (config) => {
        const authToken = useCookie('authToken', {sameSite: 'strict'})
        if (authToken.value) {
            config.headers.Authorization = `Bearer ${authToken.value}`;
        } else {
            await router.push('/connexion')
        }
        return config;
    })

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                const authStore = useAuthStore()
                await authStore.logout()
            }
            return Promise.reject(error)
        }
    )

    return {
        provide: {
            api: {
                async get(url: string, config?: any) {
                    try {
                        return await axios.get(url, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async post(url: string, data: any, config?: any) {
                    try {
                        return await axios.post(url, data, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async put(url: string, data: any, config?: any) {
                    try {
                        return await axios.put(url, data, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async delete(url: string, config?: any) {
                    try {
                        return await axios.delete(url, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
            }
        }
    }
})

const handleError = (error: any) => {
    const toast = useToast()
    toast.add({
        title: error.statusText,
        description: `${error.status} : ${error.data}`,
        timeout: 5000,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
    })
}