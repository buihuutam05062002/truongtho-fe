import {api} from "@/lib/axios"

export const authApi = {
    login: (body) => api.post('/auth/login',body),
    register: (body) => api.post('/auth/register',body),
    me: () => api.get('/auth/me'),
    changePassword: (body) => api.post('/auth/change-password', body),
    logout: () => api.post('/auth/logout'),
}
