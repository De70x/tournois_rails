import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";
import {useAuthStore} from "~/store/auth_store";
import {isTokenExpired} from "~/utils/auth";
import type {ApiError} from "~/types/ApiError";

type ApiResponse<T> = AxiosResponse<T> | undefined;

interface Api {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

  patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
}

export default defineNuxtPlugin
(() => {
  const toast = useToast()
  const authStore = useAuthStore()

  const handleError = async (error: ApiError) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          await authStore.logout()
          await navigateTo({name: 'Connexion'})
          return
        }
        const description = formatResponse(error)
        toast.add({
          title: error.response.statusText,
          description: `${error.response.status}: ${description}`,
          timeout: 5000,
          icon: 'i-heroicons-exclamation-circle',
          color: 'red'
        })
      } else if (error.request) {
        toast.add({
          title: 'Network Error',
          description: 'Unable to reach the server. Please check your internet connection.',
          timeout: 5000,
          icon: 'i-heroicons-exclamation-circle',
          color: 'red'
        })
      }
    } else {
      console.error('Unexpected error:', error)
      toast.add({
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again later.',
        timeout: 5000,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      })
    }
  }

  const formatResponse = (apiError: ApiError) => {
    if (apiError?.response?.data.message)
      return apiError.response.data.message
    else if (apiError?.response?.data.error)
      return apiError?.response?.data.error
    else if (apiError?.response?.data) {
      return JSON.stringify(apiError?.response?.data)
    }
    else{
      return 'Unknown error'
    }
  }

  axios.defaults.baseURL = useRuntimeConfig().public.BASE_URL

  axios.interceptors.request.use(async (config) => {
    const token = useCookie('auth-token').value;
    if (token) {
      if (isTokenExpired(token)) {
        await authStore.checkAndRefreshToken() // Implement this method in your auth store
      }
      config.headers.Authorization = `Bearer ${useCookie('auth-token').value}`;
    } else {
      await navigateTo({name: 'Connexion'})
    }
    return config;
  })

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && error.config && !error.config.__isRetryRequest) {
        error.config.__isRetryRequest = true;
        try {
          await authStore.checkAndRefreshToken();
          return axios(error.config);
        } catch (e) {
          await authStore.logout();
          await navigateTo({name: 'Connexion'});
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api: {
        async get<T>(url: string, config?: AxiosRequestConfig) {
          try {
            return await axios.get<T>(url, config);
          } catch (error: any) {
            await handleError(error)
          }
        },
        async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
          try {
            return await axios.post<T>(url, data, config);
          } catch (error: any) {
            await handleError(error)
          }
        },
        async put<T>(url: string, data: any, config?: AxiosRequestConfig) {
          try {
            return await axios.put<T>(url, data, config);
          } catch (error: any) {
            await handleError(error)
          }
        },
        async patch<T>(url: string, data: any, config?: AxiosRequestConfig) {
          try {
            return await axios.patch<T>(url, data, config);
          } catch (error: any) {
            await handleError(error)
          }
        },
        async delete<T>(url: string, config?: AxiosRequestConfig) {
          try {
            return await axios.delete<T>(url, config);
          } catch (error: any) {
            await handleError(error)
          }
        },
      } as Api
    }
  }
})