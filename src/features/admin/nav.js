import {
  Armchair,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  CircleHelp,
  ClipboardList,
  LayoutGrid,
  ListChecks,
  Settings,
  UtensilsCrossed,
  Users,
} from "lucide-react"


export const ADMIN_NAV = [
  { label: "Tổng quan", icon: LayoutGrid },
  { label: "Đơn hàng", icon: ClipboardList },
  { label: "Đặt bàn", icon: CalendarCheck, to: "/admin/reservations" },
  { label: "Bàn", icon: Armchair, to: "/admin/tables" },
  { label: "Thực đơn", icon: UtensilsCrossed },
  { label: "Nhân sự & ca làm", icon: Users },
  { label: "Báo cáo", icon: ChartColumn },
]

export const STAFF_NAV = [
  { label: "Bàn của tôi", icon: Armchair },
  { label: "Đơn đang phục vụ", icon: ClipboardList },
  { label: "Lịch đặt bàn", icon: CalendarCheck, to: "/admin/reservations" },
  { label: "Công việc trong ca", icon: ListChecks },
  { label: "Lịch làm việc", icon: CalendarDays },
]


export const UTILITY_NAV = [
  { label: "Cài đặt hệ thống", icon: Settings },
  { label: "Trợ giúp & hỗ trợ", icon: CircleHelp },
]