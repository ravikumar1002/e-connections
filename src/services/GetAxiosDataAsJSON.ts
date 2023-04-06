import { AxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

axiosInstance.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
    }
    return config
})

export const GetAxiosDataAsJSON = async<TResult = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<TResult> => {
    const response = await axiosInstance.get<TResult>(url, {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    });
    return response.data;
}
