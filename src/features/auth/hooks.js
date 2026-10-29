import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { authApi } from "./api"
import { tokenStore } from "@/lib/token"
import { refreshSession } from "@/lib/axios"
import {ERR} from "@/lib/errorCodes"
import toast from "react-hot-toast"

export const authKeys = { me: ['auth', 'me'] }


export const useRegister= () =>{
    const qc = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (res) =>{
            tokenStore.set(res.token)
            qc.setQueryData(authKeys.me,res.user)
            toast.success("tạo tài khoản thành công")
            navigate(location.state?.from?.pathname ?? '/home', {replace: true})
        },
    })
}



export const useLogout = () =>{
    const qc = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: authApi.logout,
        onSettled: () =>{
            tokenStore.clear()
            qc.clear()
            navigate('/login', {replace: true})
        }
    })
}
export const useMe = () =>{
    return useQuery({
        queryKey: authKeys.me,
        retry: false,
        staleTime : 5 * 60_000,
        queryFn: async () => {
            if(!tokenStore.get()){
                try{
                    return (await refreshSession()).user
                }catch{
                    return null
                }
            }
            try{
                return await authApi.me()
            }catch(e){
                if(e.code === ERR.UNAUTHORIZED) return null; 
                throw e 
            }
        },
    })
}
export const useLogin = () =>{
    const qc = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            toast.success("Đăng nhập thành công")
            tokenStore.set(res.token)
            qc.setQueryData(authKeys.me, res.user)
            navigate(location.state?.from?.pathname ?? '/home', { replace: true })
        },
    })
}

