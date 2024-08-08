import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";
import {useAuthStore} from "~/store/auth_store";

export default defineNuxtPlugin
(() => {
    const toast = useToast()
    const authStore = useAuthStore()

    const handleError = async (error: AxiosResponse) => {
        if(error.status === 401){
            await authStore.logout()
            await navigateTo({name: 'Connexion'})
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
            await navigateTo({name: 'Connexion'})
        }
        return config;
    })

    return {
        provide: {
            api: {
                async get<T>(url: string, config?: AxiosRequestConfig) {
                    try {
                        return await axios.get<T>(url, config);
                    } catch (error: any) {
                        await handleError(error.response)
                    }
                },
                async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
                    try {
                        return await axios.post<T>(url, data, config);
                    } catch (error: any) {
                        await handleError(error.response)
                    }
                },
                async put<T>(url: string, data: any, config?: AxiosRequestConfig) {
                    try {
                        return await axios.put<T>(url, data, config);
                    } catch (error: any) {
                        await handleError(error.response)
                    }
                },
                async patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
                    try {
                        return await axios.patch<T>(url, data, config);
                    } catch (error: any) {
                        await handleError(error.response)
                    }
                },
                async delete<T>(url: string, config?: AxiosRequestConfig) {
                    try {
                        return await axios.delete<T>(url, config);
                    } catch (error: any) {
                        await handleError(error.response)
                    }
                },
            }
        }
    }
})