import {api} from "@/lib/axios"

export const authApi = {
    login: (body) => api.post('/auth/login',body),
    register: (body) => api.post('/auth/register',body),
    me: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
}