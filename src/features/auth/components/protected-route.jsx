import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useMe } from "../hooks";

export function ProtectedRoute(){
    const {data: user, isLoading}  = useMe()
    const location = useLocation()

    if(isLoading) return <p className="p-6">Đang tải</p>
    if(!user) return <Navigate to="/login" replace state ={{from: location}}></Navigate>
    return <Outlet/>
}