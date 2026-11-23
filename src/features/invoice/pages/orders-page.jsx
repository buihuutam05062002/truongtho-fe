import { useState } from "react"
import dayjs from "dayjs"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Pagination } from "@/components/dashboard/pagination"
import { Select } from "@/components/ui/select"
import { INVOICE_STATUS, formatVnd, shortInvoiceId } from "../constants"
import { useInvoices } from "../hooks"
import { InvoiceDetailDialog } from "../components/invoice-detail-dialog"

const columns = [
    { key: "id", header: "Mã đơn", className: "w-[90px] font-medium", cell: (o) => shortInvoiceId(o.id) },
    { key: "tableName", header: "Bàn", className: "w-[80px] text-gold", cell: (o) => o.tableName ?? "—" },
    { key: "employeeName", header: "Phụ trách", className: "text-muted-foreground", cell: (o) => o.employeeName ?? "—" },
    { key: "totalAmount", header: "Tổng tiền", align: "right", cell: (o) => formatVnd(o.totalAmount) },
    {
        key: "invoiceStatus",
        header: "Trạng thái",
        className: "w-[140px]",
        cell: (o) => {
            const s = INVOICE_STATUS[o.invoiceStatus]
            return <StatusBadge tone={s?.tone}>{s?.label ?? o.invoiceStatus}</StatusBadge>
        },
    },
    {
        key: "issuedAt",
        header: "Giờ tạo",
        align: "right",
        className: "w-[150px] text-muted-foreground",
        cell: (o) => dayjs(o.issuedAt).format("HH:mm · DD/MM/YYYY"),
    },
]

export default function OrdersPage() {
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState("")
    const [selectedId, setSelectedId] = useState(null)

    const { data, isLoading, isError, error } = useInvoices({
        page,
        size: 10,
        sort: "issuedAt,desc",
        status: status || undefined,
    })

    const handleStatusChange = (value) => {
        setStatus(value)
        setPage(0)
    }

    return (
        <main className="space-y-6 p-4 lg:p-8">
            <PageHeader
                title="Đơn hàng"
                description="Theo dõi hóa đơn, thu tiền và xử lý đơn của nhà hàng"
                actions={
                    <Select
                        aria-label="Lọc theo trạng thái"
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="w-[180px]"
                    >
                        <option value="">Tất cả trạng thái</option>
                        {Object.entries(INVOICE_STATUS).map(([value, { label }]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </Select>
                }
            />

            <Panel
                title="Danh sách đơn hàng"
                description={data ? `${data.totalElements} đơn · Bấm vào một dòng để xem chi tiết` : undefined}
            >
                {isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>}
                {isError && (
                    <p role="alert" className="py-6 text-center text-xs text-destructive">
                        {error.message}
                    </p>
                )}
                {data && (
                    <>
                        <DataTable
                            columns={columns}
                            rows={data.content}
                            getRowKey={(o) => o.id}
                            onRowClick={(o) => setSelectedId(o.id)}
                            isRowActive={(o) => o.id === selectedId}
                            empty="Chưa có đơn hàng nào"
                        />
                        <Pagination
                            page={data.number}
                            totalPages={data.totalPages}
                            totalItems={data.totalElements}
                            unit="đơn"
                            isFirst={data.first}
                            isLast={data.last}
                            onPrev={() => setPage((p) => p - 1)}
                            onNext={() => setPage((p) => p + 1)}
                        />
                    </>
                )}
            </Panel>

            {selectedId && (
                <InvoiceDetailDialog key={selectedId} invoiceId={selectedId} onClose={() => setSelectedId(null)} />
            )}
        </main>
    )
}
