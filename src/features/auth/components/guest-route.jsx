import { Navigate, Outlet } from "react-router-dom"
import {useMe} from "../hooks"

export function GuestRoute(){
    const {data: user, isLoading} = useMe()

    if(isLoading) return null
    if(user) return <Navigate to="/home" replace></Navigate>
    return <Outlet/>
}