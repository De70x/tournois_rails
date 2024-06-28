import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin
(() => {
    const toast = useToast()
    const router = useRouter()
    const authStore = useAuthStore()

    const handleError = (error: AxiosResponse) => {
        if(error.status === 401){
            authStore.logout()
        }
        const description = error.data.message ? error.data.message : error.data.error ? error.data.error : error.data
        toast.add({
            title: error.statusText,
            description: `${error.status} : ${description}`,
            timeout: 5000,
            icon: 'i-heroicons-exclamation-circle',
            color: 'red'
        })
    }

    axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL

    axios.interceptors.request.use(async (config) => {
        if (useCookie('auth-token').value) {
            config.headers.Authorization = `Bearer ${useCookie('auth-token').value}`;
        } else {
            await router.push('/connexion')
        }
        return config;
    })

    return {
        provide: {
            api: {
                async get(url: string, config?: AxiosRequestConfig) {
                    try {
                        return await axios.get(url, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async post(url: string, data: any, config?: AxiosRequestConfig) {
                    try {
                        return await axios.post(url, data, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async put(url: string, data: any, config?: AxiosRequestConfig) {
                    try {
                        return await axios.put(url, data, config);
                    } catch (error: any) {
                        handleError(error.response)
                    }
                },
                async delete(url: string, config?: AxiosRequestConfig) {
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