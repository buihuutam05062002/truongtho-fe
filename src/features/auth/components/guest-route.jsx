import { Navigate, Outlet } from "react-router-dom"
import {useMe} from "../hooks"
import { homePathFor } from "@/lib/home-path"

export function GuestRoute(){
    const {data: user, isLoading} = useMe()

    if(isLoading) return null
    if(user) return <Navigate to={homePathFor(user)} replace />
    return <Outlet/>
}