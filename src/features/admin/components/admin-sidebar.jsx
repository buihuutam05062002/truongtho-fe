import { NavLink } from "react-router-dom"
import { LogOut, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { ADMIN_NAV, STAFF_NAV, UTILITY_NAV } from "../nav"

const itemBase = "flex h-[43px] items-center gap-2.5 rounded-md border-l-2 px-3 text-xs"

function NavItem({ item, onNavigate }) {
  const Icon = item.icon

  if (!item.to) {
    return (
      <div
        aria-disabled="true"
        title="Sắp ra mắt"
        className={cn(itemBase, "cursor-not-allowed border-transparent text-subtle opacity-60")}
      >
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 truncate">{item.label}</span>
      </div>
    )
  }

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          itemBase,
          "transition-colors",
          isActive
            ? "border-primary bg-accent font-semibold text-foreground"
            : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
        )
      }
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 truncate">{item.label}</span>
    </NavLink>
  )
}


export function AdminSidebar({ user, isAdmin, onNavigate, onLogout, className }) {
  const nav = isAdmin ? ADMIN_NAV : STAFF_NAV
  const name = user?.fullName ?? user?.name ?? user?.email ?? "Tài khoản"
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <aside
      className={cn(
        "flex h-svh w-56 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-sidebar px-4 pb-5 pt-7",
        className
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2">
        <span className="h-10 w-9">
            <img src="/logo.webp" alt="" className="rounded-full" />
        </span>
        <span className="leading-tight">
          <span className="block font-serif text-xl text-foreground">Trường Thọ</span>
          <span className="block text-[8px] uppercase tracking-[0.15em] text-gold">
            Ẩm thực Á Đông
          </span>
        </span>
      </div>

      {/* Role badge */}
      <div className="flex items-center gap-2 rounded-md bg-secondary p-2.5">
        <ShieldCheck className="size-3.5 shrink-0 text-gold" />
        <p className="text-[10px] uppercase text-gold">
          {isAdmin ? "Không gian quản trị" : "Không gian nhân viên"}
        </p>
      </div>

      {/* Main menu */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[9px] uppercase text-subtle">Vận hành nhà hàng</p>
        <nav aria-label="Điều hướng chính" className="flex flex-col gap-1.5">
          {nav.map((item) => (
            <NavItem key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>

      <div className="flex-1" />

      {/* Utilities */}
      <nav aria-label="Tiện ích" className="flex flex-col gap-1.5">
        {UTILITY_NAV.map((item) => (
          <NavItem key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      {/* User */}
      <div className="flex items-center gap-2.5 border-t border-border px-1 pt-4">
        <span className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-rose">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] text-foreground">{name}</p>
          <p className="text-[10px] text-subtle">{isAdmin ? "Quản trị viên" : "Nhân viên"}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Đăng xuất"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="size-[15px]" />
        </button>
      </div>
    </aside>
  )
}