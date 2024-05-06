export default defineNuxtPlugin
(() => {
    const $fetchApi = (url: string, params: any) => {
        return $fetch(url, {...params, baseURL: useRuntimeConfig().public.BASE_URL})
    }
    return {
        provide: {
            api: {
                async get<T>(url: string, config?: any): Promise<T> {
                    try {
                        const response = await $fetchApi(url, {method: 'GET', ...config});
                        return response.data;
                    } catch (error) {
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async post<T>(url: string, data: any, config?: any): Promise<T> {
                    try {
                        const response = await $fetchApi(url, {method: 'POST', body: JSON.stringify(data), ...config});
                        return response.data;
                    } catch (error) {
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async put<T>(url: string, data: any, config?: any): Promise<T> {
                    try {
                        const response = await $fetchApi(url, {method: 'PUT', body: JSON.stringify(data), ...config});
                        return response.data;
                    } catch (error) {
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
                async delete<T>(url: string, config?: any): Promise<T> {
                    try {
                        const response = await $fetchApi(url, {method: 'DELETE', ...config});
                        return response.data;
                    } catch (error) {
                        throw new Error(error.response?.data?.message || error.message);
                    }
                },
            }
        }
    }
})