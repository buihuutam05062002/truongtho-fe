import { useState } from "react"
import dayjs from "dayjs"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { useReport } from "../hooks"
import { exportReportCsv } from "../export-csv"

const money = (n) => `${new Intl.NumberFormat("vi-VN").format(Math.round(Number(n) || 0))} ₫`
const iso = (d) => d.format("YYYY-MM-DD")

const RESERVATION_LABEL = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    ARRIVED: "Đã đến",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy",
    NO_SHOW: "Không đến",
}

const chartConfig = { revenue: { label: "Doanh thu (triệu ₫)", color: "var(--rose)" } }

const PRESETS = [
    { label: "7 ngày", range: () => [dayjs().subtract(6, "day"), dayjs()] },
    { label: "30 ngày", range: () => [dayjs().subtract(29, "day"), dayjs()] },
    { label: "Tháng này", range: () => [dayjs().startOf("month"), dayjs()] },
    { label: "Tháng trước", range: () => [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")] },
]

const dateInput = "h-[38px] w-[150px] bg-background text-xs md:text-xs dark:bg-background"

export default function ReportPage() {
    const [from, setFrom] = useState(iso(dayjs().subtract(29, "day")))
    const [to, setTo] = useState(iso(dayjs()))

    const validRange = !!from && !!to && from <= to
    const { data, isLoading, isError, error } = useReport(validRange ? from : undefined, validRange ? to : undefined)

    const applyPreset = (p) => {
        const [a, b] = p.range()
        setFrom(iso(a))
        setTo(iso(b))
    }

    const chartData = (data?.daily ?? []).map((p) => ({
        label: dayjs(p.date).format("DD/MM"),
        revenue: Number(p.revenue) / 1e6,
    }))

    const productCols = [
        { key: "name", header: "Món", cell: (r) => <span className="text-foreground">{r.name}</span> },
        { key: "quantity", header: "Đã bán", className: "w-[72px]", align: "right", cell: (r) => r.quantity },
        { key: "revenue", header: "Doanh thu", className: "w-[120px]", align: "right", cell: (r) => money(r.revenue) },
    ]

    const employeeCols = [
        { key: "fullName", header: "Nhân viên", cell: (r) => <span className="text-foreground">{r.fullName}</span> },
        { key: "orders", header: "Số đơn", className: "w-[72px]", align: "right", cell: (r) => r.orders },
        { key: "revenue", header: "Doanh thu", className: "w-[120px]", align: "right", cell: (r) => money(r.revenue) },
    ]

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Báo cáo"
                description="Doanh thu, món bán chạy, hiệu quả nhân viên và đặt bàn theo khoảng thời gian"
                actions={
                    <>
                        <Input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} aria-label="Từ ngày" className={dateInput} />
                        <span className="text-xs text-muted-foreground">đến</span>
                        <Input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} aria-label="Đến ngày" className={dateInput} />
                        <Button
                            type="button"
                            variant="outline"
                            className="h-[38px] text-xs"
                            disabled={!data}
                            onClick={() => exportReportCsv(data)}
                        >
                            Xuất CSV
                        </Button>
   
   
   
                    </>
                }
            />

            <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                    <Button key={p.label} type="button" variant="outline" className="h-8 px-3 text-xs" onClick={() => applyPreset(p)}>
                        {p.label}
                    </Button>
                ))}
            </div>

            {!validRange && (
                <p role="alert" className="text-xs text-destructive">Khoảng ngày không hợp lệ: “Từ ngày” phải trước hoặc bằng “Đến ngày”.</p>
            )}
            {isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>}
            {isError && <p role="alert" className="py-6 text-center text-xs text-destructive">{error.message}</p>}

            {data && (
                <>
                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                        <KpiCard label="Doanh thu" value={money(data.summary.revenue)} note={`${dayjs(data.from).format("DD/MM/YYYY")} – ${dayjs(data.to).format("DD/MM/YYYY")}`} />
                        <KpiCard label="Đơn đã thanh toán" value={data.summary.paidOrders} note="Hóa đơn có thanh toán thành công" />
                        <KpiCard label="Giá trị trung bình / đơn" value={money(data.summary.averageOrderValue)} />
                        <KpiCard label="Lượt đặt bàn" value={data.summary.totalReservations} note="Theo giờ hẹn trong khoảng đã chọn" />
                    </div>

                    <Panel title="Doanh thu theo ngày" description="Đơn vị: triệu đồng">
                        <ChartContainer config={chartConfig} className="h-[260px] w-full">
                            <BarChart data={chartData} margin={{ left: 0, right: 8, top: 8 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={16} />
                                <YAxis tickLine={false} axisLine={false} width={32} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={3} />
                            </BarChart>
                        </ChartContainer>
                    </Panel>

                    <div className="grid gap-6 xl:grid-cols-2">
                        <Panel title="Món bán chạy" description="Top 10 theo doanh thu" className="min-w-0">
                            <DataTable columns={productCols} rows={data.topProducts} getRowKey={(r) => r.productId} empty="Chưa có món nào được bán trong khoảng này" />
                        </Panel>
                        <Panel title="Doanh thu theo nhân viên" description="Nhân viên phụ trách hóa đơn" className="min-w-0">
                            <DataTable columns={employeeCols} rows={data.byEmployee} getRowKey={(r) => r.employeeId ?? "none"} empty="Chưa có dữ liệu trong khoảng này" />
                        </Panel>
                    </div>

                    <Panel title="Đặt bàn theo trạng thái" description="Theo giờ hẹn trong khoảng đã chọn">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
                            {data.reservations.map((r) => (
                                <div key={r.status} className={cn("rounded-lg border border-border bg-background p-3")}>
                                    <p className="text-[11px] text-muted-foreground">{RESERVATION_LABEL[r.status] ?? r.status}</p>
                                    <p className="mt-1 text-xl font-semibold text-foreground">{r.count}</p>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    
                </>
            )}
        </main>
    )
}
