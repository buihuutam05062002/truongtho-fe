import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLogout, useMe } from "@/features/auth/hooks";
import { isStaffUser } from "@/lib/home-path";

const MENU = [
  { label: "Trang chủ", to: "/home" },
  { label: "Câu chuyện", to: "/story" },
  { label: "Thực đơn", to: "/menu" },
  { label: "Không gian", to: "/space" },
  { label: "Liên hệ", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { pathname } = useLocation();
  const isActive = (to) => !to.includes("#") && pathname === to;
  const { data: user } = useMe();
  const logout = useLogout();
  const staff = isStaffUser(user);

  const account = user
    ? staff
      ? { label: "Trang quản trị", to: "/admin" }
      : { label: "Đặt bàn của tôi", to: "/my-reservations" }
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-10">
        <Link to="/home" className="flex items-center gap-3">
          <span className="h-10 w-9">
            <img src="/logo.webp" alt="" className="rounded-full" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-xl text-foreground">
              Trường Thọ
            </span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-gold">
              Ẩm thực Việt Nam
            </span>
          </span>
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MENU.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={cn(
                    "relative text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive(item.to) &&
                      "text-foreground after:absolute after:-bottom-2 after:left-0 after:h-px after:w-6 after:bg-gold",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {account && (
            <Button
              variant="ghost"
              className="hidden h-9 px-3 md:inline-flex"
              nativeButton={false}
              render={<Link to={account.to} />}
            >
              {account.label}
            </Button>
          )}
          {user ? (
            <Button
              variant="ghost"
              className="hidden h-9 px-3 md:inline-flex"
              onClick={() => logout.mutate()}
            >
              Đăng xuất
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hidden h-9 px-3 md:inline-flex"
              nativeButton={false}
              render={<Link to="/login" />}
            >
              Đăng nhập
            </Button>
          )}
          <Button
            className="hidden h-9 px-4 sm:inline-flex"
            nativeButton={false}
            render={<Link to="/reserve" />}
          >
            Đặt bàn ngay
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-6 py-2">
            {MENU.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  onClick={close}
                  className={cn(
                    "block py-3 text-muted-foreground hover:text-foreground",
                    isActive(item.to) && "text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {account ? (
                <Link
                  to={account.to}
                  onClick={close}
                  className="block py-3 text-muted-foreground hover:text-foreground"
                >
                  {account.label}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={close}
                  className="block py-3 text-muted-foreground hover:text-foreground"
                >
                  Đăng nhập
                </Link>
              )}
            </li>
            {user && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    logout.mutate();
                  }}
                  className="block w-full py-3 text-left text-muted-foreground hover:text-foreground"
                >
                  Đăng xuất
                </button>
              </li>
            )}
            <li className="py-3 sm:hidden">
              <Button
                className="w-full"
                nativeButton={false}
                render={<Link to="/reserve" onClick={close} />}
              >
                Đặt bàn ngay
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
