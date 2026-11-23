import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/main-layout"
import AuthLayout from "@/layouts/auth-layout"
import HomePage from "@/features/home/pages/home-page"
import ErrorPage from "@/components/feedback/error-page"
import PageLoader from "@/components/feedback/page-loader"
import { GuestRoute } from "@/features/auth/components/guest-route"
import { ProtectedRoute } from "@/features/auth/components/protected-route"
import AdminLayout from "@/layouts/admin-layout"
import { RootRedirect } from "@/features/auth/components/root-redirect"


const page = (loader) => async () => ({ Component: (await loader()).default })

export const router = createBrowserRouter([
    { path: "/", element: <RootRedirect /> },

    {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <PageLoader />,
        children: [
            { path: "/home", element: <HomePage /> },  
            {path: "/menu", lazy: page(() => import("@/features/menu/pages/menu-page"))},   
            {path: "/story",  lazy: page(() => import("@/features/story/pages/story-page"))},
            {path:"/space", lazy:   page(() => import("@/features/space/pages/space-page"))},
            { path: "/contact", lazy: page(() => import("@/features/contact/pages/contact-page")) },  
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/reserve", lazy: page(() => import("@/features/reservation/pages/reservation-page")) },
                    { path: "/my-reservations", lazy: page(() => import("@/features/reservation/pages/my-reservations-page")) },
                ],
            },
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
                    {index: true, lazy: page(() => import("@/features/dashboard/pages/dashboard-page"))},
                    {path: "reservations/new", lazy: page(() => import("@/features/reservation/pages/reservation-page"))},
                    {path: "orders", lazy: page(() => import("@/features/invoice/pages/orders-page")) },
                    {path: "order", lazy: page(() => import("@/features/ordering/pages/order-page")) },
                    {path: "my-tables", lazy: page(() => import("@/features/staff/pages/my-tables-page"))},
                    {path: "reservations", lazy: page(() => import("@/features/admin/pages/reservations-page"))},
                    {path: "tables", lazy: page(() => import("@/features/floor/pages/floor-page")) },
                    {path: "products", lazy: page(() => import("@/features/product/pages/products-page"))},
                    {path: "employees", lazy: page(() => import("@/features/employee/pages/employees-page"))},
                    {path: "reports", lazy: page(() => import("@/features/report/pages/report-page"))}
                ]
            
            },
        ],
    },


        {
        element: <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_STAFF"]} />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <PageLoader />,
        children: [
            { path: "/print/invoice/:id", lazy: page(() => import("@/features/invoice/pages/receipt-page")) },
        ],
    },

    { path: "*", element: <ErrorPage /> },
])