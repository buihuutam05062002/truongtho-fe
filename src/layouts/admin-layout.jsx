import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import { Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { AdminSidebar } from "@/features/admin/components/admin-sidebar"
import { ADMIN_NAV, STAFF_NAV } from "@/features/admin/nav"
import { useLogout, useMe } from "@/features/auth/hooks"

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { data: user } = useMe()
  const logout = useLogout()
  const { pathname } = useLocation()

  const isAdmin = !!user?.roles?.includes("ROLE_ADMIN")
  const nav = isAdmin ? ADMIN_NAV : STAFF_NAV
  const current = nav.find((item) => item.to && pathname.startsWith(item.to))
  const today = dayjs().locale("vi").format("dddd, D [tháng] M, YYYY")

  return (
    <div className="flex min-h-svh bg-background text-foreground">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar
        user={user}
        isAdmin={isAdmin}
        onNavigate={() => setOpen(false)}
        onLogout={() => logout.mutate()}
        className={cn(
          "fixed inset-y-0 left-0 z-40 -translate-x-full transition-transform",
          "lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 lg:self-start",
          open && "translate-x-0"
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between gap-4 border-b border-border px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Mở menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
            <nav aria-label="Vị trí hiện tại" className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">
                {isAdmin ? "Quản trị" : "Nhân viên"}
              </span>
              {current && (
                <>
                  <span className="text-subtle">›</span>
                  <span className="text-foreground">{current.label}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="hidden sm:inline">{today}</span>
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Thông báo">
              <Bell />
            </Button>
          </div>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}