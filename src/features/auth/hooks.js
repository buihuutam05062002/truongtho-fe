import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { authApi } from "./api"

export const authKeys = { me: ['auth', 'me'] }


export const useRegister= () =>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn: authApi.register,
        onSuccess: () =>{
            toast.success("Đăng ký thành công, hãy đăng nhập")
            navigate('/login')
        },
        onError: (err) => toast.error(err.message)
    })
}
export const useLogout = () =>{
    const qc = useQueryClient()
    const navigate = useNavigate()
    return useMutation({
        mutationFn: authApi.logout,
        onSettled: () =>{
            qc.setQueryData(authKeys.me,null)
            navigate('/login')
        }
    })
}
export const useMe = () =>{
    return useQuery({
        queryKey: authKeys.me,
        queryFn: async () => {
            try{
                const res = await authApi.me()
                return res.data
            }catch(err){
                if(err.code === "UNAUTHORIZED") 
                    return null
                throw err
            }
        },
        retry: false,
        staleTime : 5 * 60_000
    })
}
export const useLogin = () =>{
    const qc = useQueryClient()
    const navigate = useNavigate()
    const location = useLocation()
    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (res) => {
            qc.setQueryData(authKeys.me, res.data.user)
            navigate(location.state?.from?.pathname ?? '/home', { replace: true })
        },
        onError: (err) => toast.error(err.message)
    })
}

