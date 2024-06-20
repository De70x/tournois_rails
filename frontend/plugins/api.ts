import axios from "axios";

export default defineNuxtPlugin
(() => {
    const handleError = (error: any) => {
        const toast = useToast()
        const description = error.data.message ? error.data.message : error.data.error ? error.data.error : error.data
        toast.add({
            title: error.statusText,
            description: `${error.status} : ${description}`,
            timeout: 5000,
            icon: 'i-heroicons-exclamation-circle',
            color: 'red'
        })
    }
    const router = useRouter()
    axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL
    axios.interceptors.request.use(async (config) => {
        const authToken = useCookie('auth-token')
        if (authToken.value) {
            config.headers.Authorization = `Bearer ${authToken.value}`;
        } else {
            await router.push('/connexion')
        }
        return config;
    })

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