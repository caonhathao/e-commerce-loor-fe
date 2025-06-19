import axios from 'axios'
import {getAccessToken, setAccessToken, removeAccessToken} from "./tokenStore.tsx";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT,
    withCredentials: true,
})

apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        console.log("Interceptor error:", error);
        const originalRequest = error.config;

        if (error.response.status === 404 || error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const url = import.meta.env.VITE_API_HOST + import.meta.env.VITE_SERVER_PORT + import.meta.env.VITE_API_TOKEN_REFRESH;
                const res = await axios.post(url, {},
                    {withCredentials: true})

                const newToken = res.data.access;
                setAccessToken(newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (e) {
                removeAccessToken();
                console.log('err')
                window.location.href = '/';
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    }
)

export default apiClient