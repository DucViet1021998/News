import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// axiosClient.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_TOKEN;

axiosClient.interceptors.request.use(function (config) {
    config.headers.Authorization = process.env.NEXT_PUBLIC_TOKEN;
    return config;
});

axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default axiosClient;
