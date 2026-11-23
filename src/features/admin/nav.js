import {
  Armchair,
  CalendarCheck,
  ChartColumn,
  CircleHelp,
  ClipboardList,
  LayoutGrid,
  Settings,
  UtensilsCrossed,
  Users,
  ConciergeBell,
} from "lucide-react"


export const ADMIN_NAV = [
  { label: "Tổng quan", icon: LayoutGrid, to: "/admin", end: true },
  { label: "Đơn hàng", icon: ClipboardList, to: "/admin/orders" },
  { label: "Bàn & đặt chỗ", icon: Armchair, to: "/admin/tables" },
  { label: "Thực đơn", icon: UtensilsCrossed, to: "/admin/products" },
   {label: "Gọi món", icon: ConciergeBell, to: "/admin/order"},
  
  { label: "Nhân sự", icon: Users, to: "/admin/employees" },
  { label: "Báo cáo", icon: ChartColumn, to: "/admin/reports" },
]

export const STAFF_NAV = [
  {label: "Gọi món", icon: ConciergeBell, to: "/admin/order"},
  { label: "Bàn của tôi", icon: Armchair, to: "/admin/my-tables" },
  { label: "Đơn đang phục vụ", icon: ClipboardList,to: "/admin/orders" },
  { label: "Lịch đặt bàn", icon: CalendarCheck, to: "/admin/reservations" },
]


export const UTILITY_NAV = [
  { label: "Cài đặt hệ thống", icon: Settings },
  { label: "Trợ giúp & hỗ trợ", icon: CircleHelp },
]