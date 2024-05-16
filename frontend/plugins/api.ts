import axios from "axios";

export default defineNuxtPlugin
(() => {
    axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL
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