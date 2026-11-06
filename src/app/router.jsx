import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import AuthLayout from "@/layouts/auth-layout"
import HomePage from "@/features/home/pages/home-page"
import ErrorPage from "@/components/feedback/error-page"
import PageLoader from "@/components/feedback/page-loader"
import { GuestRoute } from "@/features/auth/components/guest-route"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import AdminLayout from "@/layouts/admin-layout"



const page = (loader) => async () => ({ Component: (await loader()).default })

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },

    {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <PageLoader />,
        children: [
            { path: "/home", element: <HomePage /> },     
            { path: "/dat-ban", lazy: page(() => import("@/features/reservation/pages/reservation-page")) },
        ],
    },

    {
        element: <GuestRoute />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <PageLoader />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "/login", lazy: page(() => import("@/features/auth/pages/login-page")) },
                    { path: "/register", lazy: page(() => import("@/features/auth/pages/register-page")) },
                ],
            },
        ],
    },

    {
        element: <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_STAFF"]} />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <PageLoader />,
        children: [
            { 
                path: "/admin",
                element: <AdminLayout/>,
                children:[
                    {index:true, element: <Navigate to="/admin/reservations" replace/>},
                    {path: "reservations", lazy: page(() => import("@/features/admin/pages/reservations-page"))},
                    {path: "tables", lazy: page(() => import("@/features/table/pages/tables-page"))}
                ]
            
            },
        ],
    },

    { path: "*", element: <ErrorPage /> },
])