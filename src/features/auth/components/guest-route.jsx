import { Navigate, Outlet } from "react-router-dom"
import {useMe} from "../hooks"

export function QuestRoute(){
    const {data: user, isLoading} = useMe()

    if(isLoading) return null
    if(user) return <Navigate to="/home"></Navigate>
    return <Outlet/>
}