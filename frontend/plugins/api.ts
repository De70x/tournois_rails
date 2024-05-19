import axios from "axios";
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin
(() => {
    const authStore = useAuthStore()
    const router = useRouter()
    axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL
    axios.interceptors.request.use((config) => {
        const authToken = useCookie('authToken')
        if (authToken.value) {
            config.headers.Authorization = `Bearer ${authToken.value}`;
        }
        else{
            router.push('/connexion')
        }
        return config;
    })

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                const authStore = useAuthStore()
                console.log('intercept response error and logout')
                authStore.logout()
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
                    } catch (error : any) {
                        console.error(error.response)
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async post(url: string, data: any, config?: any){
                    try {
                        return await axios.post(url, data, config);
                    } catch (error: any) {
                        console.error(error.response)
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async put(url: string, data: any, config?: any) {
                    try {
                        return await axios.put(url, data, config);
                    } catch (error: any) {
                        console.error(error.response)
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async delete(url: string, config?: any) {
                    try {
                        return await axios.delete(url, config);
                    } catch (error: any) {
                        console.error(error.response)
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
            }
        }
    }
})