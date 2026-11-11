
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { Link } from "react-router-dom";

const MENU = [
  { label: "Trang chủ", to: "/home" },
  { label: "Câu chuyện", to: "/home#cau-chuyen" },
  { label: "Thực đơn", to: "/home#thuc-don" },
  { label: "Không gian", to: "/home#khong-gian" },
  { label: "Liên hệ", to: "/home#lien-he" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            className="hidden h-9 px-4 sm:inline-flex"
            nativeButton={false}
            render={<Link to="/dat-ban" />}
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
                  className="block py-3 text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3 sm:hidden">
              <Button
                className="w-full"
                nativeButton={false}
                render={<Link to="/dat-ban" onClick={close} />}
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
