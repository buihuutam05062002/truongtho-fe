import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
const NAV = [
    {
        to: "/admin/reservations",label: "Đặt bàn"
    }
]

export default function AdminLayout(){
    return (
        <div className="flex min-h-screen">
            <aside className="w-60 shrink-0 space-y-1 border-r p-4">
                {
                    NAV.map((item) => (
                        <NavLink key={item.to} to={item.to} className={({isActive}) => cn("block rounded-lg px-3 py-2 text-sm", isActive && "bg-muted font-medium") }>
                            {item.label}
                        </NavLink>
                    ))
                }
            </aside>
            <div className="min-w-0 flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    )
}