import { useState } from "react"
import { Navigate } from "react-router-dom"
import dayjs from "dayjs"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { PageFooter } from "@/components/dashboard/page-footer"
import { useMe } from "@/features/auth/hooks"
import { useDashboard } from "../hooks"

const INVOICE_STATUS = {
    PENDING: { label: "Chờ thanh toán", tone: "warning" },
    PAID: { label: "Đã thanh toán", tone: "success" },
    CANCELLED: { label: "Đã hủy", tone: "danger" },
}

const money = (n) => `${new Intl.NumberFormat("vi-VN").format(Math.round(Number(n) || 0))} ₫`
const shortId = (id = "") => `#${id.slice(0, 6).toUpperCase()}`

const chartConfig = {
    today: { label: "Hôm nay", color: "var(--rose)" },
    yesterday: { label: "Hôm qua", color: "var(--muted-foreground)" },
    revenue: { label: "Doanh thu", color: "var(--rose)" },
}

function buildHourly(hourly = [], isToday) {
    const nowHour = dayjs().hour()
    const active = hourly.filter((p) => Number(p.today) > 0 || Number(p.yesterday) > 0).map((p) => p.hour)
    const from = active.length ? Math.min(...active) : 10
    const to = active.length ? Math.max(...active, isToday ? nowHour : 0) : 22
    return hourly
        .filter((p) => p.hour >= from && p.hour <= to)
        .map((p) => ({
            label: `${String(p.hour).padStart(2, "0")}:00`,
            today: isToday && p.hour > nowHour ? null : Number(p.today) / 1e6,
            yesterday: Number(p.yesterday) / 1e6,
        }))
}

const buildDaily = (daily = []) =>
    daily.map((p) => ({ label: dayjs(p.date).format("DD/MM"), revenue: Number(p.revenue) / 1e6 }))

function RevenueChart({ data, series }) {
    return (
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
            <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                {series.map((key) => (
                    <Area
                        key={key}
                        dataKey={key}
                        type="monotone"
                        stroke={`var(--color-${key})`}
                        fill={`var(--color-${key})`}
                        fillOpacity={key === "yesterday" ? 0 : 0.12}
                        strokeDasharray={key === "yesterday" ? "4 4" : undefined}
                        strokeWidth={2}
                        connectNulls={false}
                    />
                ))}
            </AreaChart>
        </ChartContainer>
    )
}

function OccupancyRing({ percent }) {
    const r = 44
    const c = 2 * Math.PI * r
    return (
        <div className="relative size-[104px] shrink-0">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label={`Công suất ${percent}%`}>
                <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className="stroke-secondary" />
                <circle
                    cx="50" cy="50" r={r} fill="none" strokeWidth="9" strokeLinecap="round"
                    className="stroke-rose"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - Math.min(percent, 100) / 100)}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-semibold text-foreground">{percent}%</span>
                <span className="text-[9px] text-subtle">công suất bàn</span>
            </div>
        </div>
    )
}

const tab = (active) =>
    cn(
        "rounded px-2.5 py-1 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        active ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
    )

function DashboardPage() {
    const todayIso = dayjs().format("YYYY-MM-DD")
    const [date, setDate] = useState(todayIso)
    const [mode, setMode] = useState("hour")

    const { data, isLoading, isError, error } = useDashboard(date)
    const isToday = date === todayIso

    const columns = [
        { key: "id", header: "Mã đơn", className: "w-[84px] font-medium", cell: (o) => shortId(o.id) },
        { key: "tableName", header: "Bàn", className: "w-[72px] text-gold", cell: (o) => o.tableName ?? "—" },
        { key: "employeeName", header: "Phụ trách", className: "text-muted-foreground", cell: (o) => o.employeeName ?? "—" },
        { key: "totalAmount", header: "Giá trị", align: "right", cell: (o) => money(o.totalAmount) },
        {
            key: "invoiceStatus",
            header: "Trạng thái",
            className: "w-[130px]",
            cell: (o) => {
                const s = INVOICE_STATUS[o.invoiceStatus]
                return <StatusBadge tone={s?.tone}>{s?.label ?? o.invoiceStatus}</StatusBadge>
            },
        },
        { key: "issuedAt", header: "Giờ tạo", align: "right", className: "w-[72px] text-muted-foreground", cell: (o) => dayjs(o.issuedAt).format("HH:mm") },
    ]

    const kpi = data?.kpi
    const tables = data?.tables
    const change = kpi?.revenueChangePercent

    const revenueNote =
        change == null
            ? "Chưa có dữ liệu hôm qua để so sánh"
            : `${change > 0 ? "↗" : change < 0 ? "↘" : "•"} ${Math.abs(change)}% so với cùng giờ hôm qua`

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Tổng quan nhà hàng"
                description="Một góc nhìn toàn diện để mỗi ca phục vụ luôn trọn vẹn."
                actions={
                    <Input
                        type="date"
                        value={date}
                        max={todayIso}
                        onChange={(e) => e.target.value && setDate(e.target.value)}
                        aria-label="Chọn ngày xem"
                        className="h-[38px] w-[160px] bg-background text-xs md:text-xs dark:bg-background"
                    />
                }
            />

            {isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>}
            {isError && (
                <p role="alert" className="py-6 text-center text-xs text-destructive">
                    {error.message}
                </p>
            )}

            {data && (
                <>
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                        <KpiCard label={isToday ? "Doanh thu hôm nay" : "Doanh thu trong ngày"} value={money(kpi.revenue)} note={revenueNote} />
                        <KpiCard
                            label="Tổng đơn hàng"
                            value={`${kpi.totalOrders} đơn`}
                            note={`${kpi.paidOrders} đã thanh toán · ${kpi.openOrders} đang mở`}
                        />
                        <KpiCard label="Khách đã đón" value={`${kpi.guests} khách`} note="Tính theo lượt đặt bàn đã đến" />
                        <KpiCard
                            label="Giá trị đơn trung bình"
                            value={money(kpi.averageOrderValue)}
                            note={`Tính trên ${kpi.paidOrders} đơn đã thanh toán`}
                        />
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                        <Panel
                            title="Doanh thu"
                            description={mode === "hour" ? "Triệu đồng · Đơn đã thanh toán" : "Triệu đồng · 7 ngày gần nhất"}
                            action={
                                <div className="flex gap-1" role="group" aria-label="Chế độ xem biểu đồ">
                                    <button type="button" className={tab(mode === "hour")} onClick={() => setMode("hour")}>
                                        Theo giờ
                                    </button>
                                    <button type="button" className={tab(mode === "day")} onClick={() => setMode("day")}>
                                        Theo ngày
                                    </button>
                                </div>
                            }
                            className="min-w-0"
                        >
                            {mode === "hour" ? (
                                <RevenueChart data={buildHourly(data.hourly, isToday)} series={["yesterday", "today"]} />
                            ) : (
                                <RevenueChart data={buildDaily(data.daily)} series={["revenue"]} />
                            )}
                        </Panel>

                        <Panel title="Tình trạng bàn" description="Theo trạng thái hiện tại">
                            <div className="flex items-center gap-5">
                                <OccupancyRing percent={tables.occupancyPercent} />
                                <div className="min-w-0 space-y-2">
                                    <p className="text-xl font-semibold text-foreground">
                                        {tables.occupied} / {tables.total} bàn
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        <StatusBadge tone="success">{tables.available} trống</StatusBadge>
                                        <StatusBadge tone="info">{tables.reserved} đã đặt</StatusBadge>
                                        {tables.maintenance > 0 && (
                                            <StatusBadge tone="neutral">{tables.maintenance} bảo trì</StatusBadge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 border-t border-border pt-3 text-[11px] text-subtle">
                                {tables.upcomingReservations} lượt đặt còn lại {isToday ? "trong hôm nay" : "trong ngày"} ·{" "}
                                {tables.upcomingGuests} khách
                            </p>
                        </Panel>
                    </div>

                    <div className="grid gap-6">
                        <Panel title="Đơn hàng gần đây" description="5 đơn mới nhất trong ngày" className="min-w-0">
                            <DataTable
                                columns={columns}
                                rows={data.recentOrders}
                                getRowKey={(o) => o.id}
                                empty="Chưa có đơn hàng nào trong ngày"
                            />
                        </Panel>
                    </div>

                    <PageFooter
                        note={`Dữ liệu ${dayjs(data.date).format("DD/MM/YYYY")} · Cập nhật đến ${dayjs(data.generatedAt).format("HH:mm")}`}
                    />
                </>
            )}
        </main>
    )
}

export default function AdminHome() {
    const { data: user } = useMe()
    const isAdmin = !!user?.roles?.includes("ROLE_ADMIN")
    if (!isAdmin) return <Navigate to="/admin/reservations" replace />
    return <DashboardPage />
}