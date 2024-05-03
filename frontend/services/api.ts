import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default function createAPI($axios: NuxtAxiosInstance) {
    return {
        async get(url: string, params?: Record<string, any>) {
            return $axios.$get(url, { params });
        },

        async post(url: string, data?: any) {
            return $axios.$post(url, data);
        },

        async put(url: string, data?: any) {
            return $axios.$put(url, data);
        },

        async delete(url: string) {
            return $axios.$delete(url);
        },

        // Add more methods for other HTTP verbs as needed
    };
}