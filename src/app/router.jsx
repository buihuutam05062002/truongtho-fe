import { createBrowserRouter,Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import Dashboard from "@/features/auth/pages/dashboard";


export const router =createBrowserRouter([
    {path: "/", element: <Navigate to="/login" replace></Navigate>},
    {
        element: <AuthLayout></AuthLayout>,
        children: [
            {path: "/login", element: <LoginPage></LoginPage>},
            {path:"/register", element: <RegisterPage></RegisterPage>},
        ]
    },
    {path:"/home", element: <Dashboard></Dashboard>}
])