import { Navigate } from "react-router-dom"
import { useMe } from "../hooks"
import { homePathFor } from "@/lib/home-path"

export function RootRedirect() {
  const { data: user, isLoading } = useMe()
  if (isLoading) return null
  return <Navigate to={homePathFor(user)} replace />
}
