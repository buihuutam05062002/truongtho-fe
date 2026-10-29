import {api} from '@/lib/axios'


export const authApi = {
    login:(body) =>api.post('/auth/login',body),
    register: (body) => api.post('/auth/register',body),
    google: (credential) => api.post('/auth/oauth2/google', {credential}),
    me: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout')
}