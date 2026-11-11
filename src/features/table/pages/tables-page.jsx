import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import TableForm from "../components/table-form"
import { useDeleteTable, useTables } from "../hook"
import { TABLE_STATUS_LABEL, TABLE_STATUS_TONE } from "../constants"

export default function TablesPage() {
    const { data, isLoading, isError, error } = useTables()
    const [editing, setEditing] = useState(null)
    const remove = useDeleteTable()

    const tables = Array.isArray(data) ? data : []
    const count = (status) => tables.filter((t) => t.tableStatus === status).length
    const totalSeats = tables.reduce((sum, t) => sum + (t.capacity ?? 0), 0)

    const columns = [
        { key: "name", header: "Tên bàn", className: "font-medium" },
        { key: "position", header: "Vị trí" },
        { key: "capacity", header: "Sức chứa", align: "right" },
        {
            key: "tableStatus",
            header: "Trạng thái",
            cell: (t) => (
                <StatusBadge tone={TABLE_STATUS_TONE[t.tableStatus]}>
                    {TABLE_STATUS_LABEL[t.tableStatus] ?? t.tableStatus}
                </StatusBadge>
            ),
        },
        {
            key: "actions",
            header: "Thao tác",
            cell: (t) => (
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(t)}>
                        Sửa
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        disabled={remove.isPending}
                        onClick={() => {
                            if (window.confirm(`Xóa ${t.name}?`)) remove.mutate(t.id)
                        }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <main className="space-y-6 p-4 lg:p-8">
            <PageHeader
                title="Quản lý bàn"
                description="Thêm, chỉnh sửa và theo dõi tình trạng các bàn trong nhà hàng"
                actions={
                    <Button onClick={() => setEditing({})}>
                        <Plus /> Thêm bàn
                    </Button>
                }
            />

            {data && (
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <KpiCard label="Tổng số bàn" value={tables.length} note={`${totalSeats} chỗ ngồi`} />
                    <KpiCard label="Bàn trống" value={count("AVAILABLE")} />
                    <KpiCard
                        label="Đang dùng / phục vụ"
                        value={count("IN_USE") + count("SERVING")}
                    />
                    <KpiCard label="Đang bảo trì" value={count("MAINTENANCE")} />
                </div>
            )}

            {editing && (
                <TableForm
                    key={editing.id ?? "new"}
                    initial={editing}
                    onDone={() => setEditing(null)}
                />
            )}

            <Panel title="Danh sách bàn">
                {isLoading && (
                    <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
                )}
                {isError && (
                    <p role="alert" className="py-6 text-center text-xs text-destructive">
                        {error.message}
                    </p>
                )}
                {data && (
                    <DataTable
                        columns={columns}
                        rows={tables}
                        getRowKey={(t) => t.id}
                        empty="Chưa có bàn nào. Nhấn “Thêm bàn” để tạo bàn đầu tiên"
                    />
                )}
            </Panel>
        </main>
    )
}
