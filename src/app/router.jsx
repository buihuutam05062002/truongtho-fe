import { createBrowserRouter,Navigate } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../features/auth/pages/login-page";
import RegisterPage from "../features/auth/pages/register-page";
import Dashboard from "@/features/auth/pages/dashboard";
import ErrorPage from "@/features/auth/pages/ErrorPage/ErrorPage";
import { QuestRoute } from "@/features/auth/components/guest-route";
import { ProtectedRoute } from "@/features/auth/components/protected-route";


export const router =createBrowserRouter([
    {path:"*", element: <ErrorPage></ErrorPage>},
    {path: "/", element: <Navigate to="/home" replace></Navigate>},
    {path:"/home", element: <Dashboard></Dashboard>,errorElement: <ErrorPage></ErrorPage>, },
    {element: <QuestRoute/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                element: <AuthLayout/>,
                children: [
                    {path: '/login', element: <LoginPage/>},
                    {path: 'register', element: <RegisterPage/>}
                ]
            }
        ]
    },
    {element: <ProtectedRoute/>, errorElement: <ErrorPage/>, children:[],}

])