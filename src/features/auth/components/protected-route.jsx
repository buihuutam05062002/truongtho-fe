import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useMe } from "../hooks";

export function ProtectedRoute({roles}){
    const {data: user, isLoading}  = useMe()
    const location = useLocation()

    if(isLoading) return <p className="p-6">Đang tải</p>
    if(!user) return <Navigate to="/login" replace state ={{from: location}}></Navigate>
  
    if(roles?.length && !roles.some((r) => user.roles?.includes(r))){
        return <Navigate to="/home" replace/>
    }
  
    return <Outlet/>
}