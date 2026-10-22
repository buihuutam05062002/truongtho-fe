import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})


api.interceptors.response.use(
    (res) => res.data,
    (err) =>
        Promise.reject(
            err.response?.data?.error ?? {
                code: "NETWORK_ERROR",
                message: "Không kết nối được máy chủ"
            }
        )
)