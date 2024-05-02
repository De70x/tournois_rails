import { Plugin } from '@nuxt/types';
import { AxiosInstance } from 'axios';

const axiosPlugin: Plugin = ({ $axios }: { $axios: AxiosInstance }) => {
    // Set the base URL for API requests
    $axios.defaults.baseURL = 'http://localhost:3000'; // Replace with your actual API URL

    // Optionally, you can set up default headers
    // $axios.defaults.headers.common['Authorization'] = 'Bearer token';
};