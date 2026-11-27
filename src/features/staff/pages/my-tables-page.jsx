import { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { InvoiceDetailDialog } from "@/features/invoice/components/invoice-detail-dialog"
import { formatVnd, shortInvoiceId } from "@/features/invoice/constants"
import { useMyInvoices } from "@/features/invoice/hooks"
import { STATUS_LABEL, STATUS_TONE } from "@/features/reservation/constants"
import { useReservations } from "@/features/reservation/hooks"

const RESERVATION_PARAMS = { page: 0, size: 100, sort: "reservationTime,desc" }

function elapsed(issuedAt) {
    const minutes = Math.max(0, dayjs().diff(dayjs(issuedAt), "minute"))
    if (minutes < 60) return `${minutes} phút`
    return `${Math.floor(minutes / 60)} giờ ${minutes % 60} phút`
}

export default function MyTablesPage() {
    const [selectedId, setSelectedId] = useState(null)
    const mine = useMyInvoices()
    const reservationsQuery = useReservations(RESERVATION_PARAMS)

    const invoices = mine.data ?? []
    const subtotal = invoices.reduce((sum, i) => sum + (Number(i.totalAmount) || 0), 0)

    const now = dayjs()
    const upcoming = (reservationsQuery.data?.content ?? [])
        .filter(
            (r) =>
                ["PENDING", "CONFIRMED"].includes(r.reservationStatus) &&
                dayjs(r.reservationTime).isSame(now, "day") &&
                !dayjs(r.reservationTime).isBefore(now.subtract(30, "minute"))
        )
        .sort((a, b) => dayjs(a.reservationTime).diff(dayjs(b.reservationTime)))

    const invoiceColumns = [
        { key: "tableName", header: "Bàn", className: "w-[80px] font-medium text-gold", cell: (i) => i.tableName ?? "—" },
        { key: "id", header: "Mã đơn", className: "w-[90px] text-muted-foreground", cell: (i) => shortInvoiceId(i.id) },
        { key: "items", header: "Số món", className: "w-[72px]", align: "right", cell: (i) => i.details?.length ?? 0 },
        { key: "totalAmount", header: "Tạm tính", align: "right", cell: (i) => formatVnd(i.totalAmount) },
        {
            key: "issuedAt",
            header: "Đã phục vụ",
            align: "right",
            className: "w-[120px] text-muted-foreground",
            cell: (i) => elapsed(i.issuedAt),
        },
    ]

    const reservationColumns = [
        { key: "time", header: "Giờ", className: "w-[64px] font-medium", cell: (r) => dayjs(r.reservationTime).format("HH:mm") },
        { key: "contactName", header: "Khách", cell: (r) => r.contactName },
        { key: "partySize", header: "Số khách", className: "w-[80px]", align: "right", cell: (r) => r.partySize },
        {
            key: "status",
            header: "Trạng thái",
            className: "w-[120px]",
            cell: (r) => (
                <StatusBadge tone={STATUS_TONE[r.reservationStatus]}>
                    {STATUS_LABEL[r.reservationStatus] ?? r.reservationStatus}
                </StatusBadge>
            ),
        },
    ]

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Bàn của tôi"
                description="Các bàn bạn đang phục vụ và lượt đặt bàn sắp tới trong hôm nay"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <KpiCard label="Bàn đang phục vụ" value={`${invoices.length} bàn`} note="Hóa đơn chưa thanh toán do bạn mở" />
                <KpiCard label="Tạm tính" value={formatVnd(subtotal)} note="Tổng các hóa đơn đang mở" />
                <KpiCard label="Đặt bàn sắp tới" value={`${upcoming.length} lượt`} note="Trong hôm nay" />
            </div>

            <Panel title="Bàn đang phục vụ" description="Bấm vào một dòng để xem chi tiết và thanh toán">
                {mine.isError ? (
                    <p role="alert" className="py-6 text-center text-xs text-destructive">{mine.error.message}</p>
                ) : mine.isLoading ? (
                    <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
                ) : (
                    <DataTable
                        columns={invoiceColumns}
                        rows={invoices}
                        getRowKey={(i) => i.id}
                        empty="Bạn chưa mở bàn nào. Vào Đơn hàng để mở bàn mới"
                        onRowClick={(i) => setSelectedId(i.id)}
                    />
                )}
            </Panel>

            <Panel title="Đặt bàn sắp tới hôm nay" description="Chờ xác nhận hoặc đã xác nhận" className="min-w-0">
                <DataTable
                    columns={reservationColumns}
                    rows={upcoming}
                    getRowKey={(r) => r.id}
                    empty="Không còn lượt đặt bàn nào sắp tới trong hôm nay"
                />
                <p className="mt-3 text-[11px] text-subtle">
                    Xử lý đặt bàn tại <Link to="/admin/reservations" className="text-primary underline-offset-2 hover:underline">Lịch đặt bàn</Link>.
                </p>
            </Panel>

            {selectedId && (
                <InvoiceDetailDialog key={selectedId} invoiceId={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </main>
    )
}
