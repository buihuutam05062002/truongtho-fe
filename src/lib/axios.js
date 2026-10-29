import axios from 'axios'
import { tokenStore } from './token'


const baseURL = import.meta.env.VITE_API_URL


export const api = axios.create({ baseURL, withCredentials: true })

const raw = axios.create({ baseURL, withCredentials: true }) 
const SKIP_REFRESH = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout', '/auth/oauth2']


let refreshing = null
export function refreshSession() {
      refreshing ??= raw.post('/auth/refresh')
    .then(({ data }) => { tokenStore.set(data.token); return data }) // data = { token, user }
    .catch((e) => { tokenStore.clear(); throw e })
    .finally(() => { refreshing = null })
  return refreshing
}


api.interceptors.request.use((config) => {
    const t = tokenStore.get()
    if(t){
        config.headers.Authorization = `Bearer ${t}`
    }
    return config
})

const normalize = (err) =>
    err.response?.data?.error ?? {
        code: err.response ? 'UNKNOWN' : 'NETWORK_ERROR',
        message: err.response ? 'có lỗi xảy ra' : "không kết nối được với máy chủ"
    }

api.interceptors.response.use(
    (res) => res.data,
    async(err) =>{
        const req = err.config
        const skip = SKIP_REFRESH.some((p) => req?.url?.startsWith(p))
        
        if(err.response?.status === 401 && !req._retry && !skip ){
            req._retry = true
            try{
                await refreshSession()
                return api(req)
            }catch{
                /* */
            }
        }
        return Promise.reject(normalize(err))
    }
)