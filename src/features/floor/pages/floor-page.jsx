import { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { DataTable } from "@/components/dashboard/data-table"
import { InfoRow } from "@/components/dashboard/info-row"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { PageFooter } from "@/components/dashboard/page-footer"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { StatusBadge } from "@/components/dashboard/status-badge"
import TableForm from "@/features/table/components/table-form"
import { useDeleteTable, useTables } from "@/features/table/hook"
import { NEXT_ACTIONS, STATUS_LABEL, STATUS_TONE } from "@/features/reservation/constants"
import { useReservations, useUpdateReservationStatus } from "@/features/reservation/hooks"
import { TableMap } from "../components/table-map"
import { ReservationDetail } from "../components/reservation-detail"
import { SeatTableDialog } from "@/features/reservation/components/seat-table-dialog"
const RESERVATION_PARAMS = { page: 0, size: 50, sort: "reservationTime,desc" }

const ACTIVE_STATUSES = Object.keys(NEXT_ACTIONS)

const tab = (active) =>
    cn(
        "rounded px-2.5 py-1 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        active ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:text-foreground"
    )

function ReservationStatusCell({ reservation, now }) {
    const minutes = dayjs(reservation.reservationTime).diff(now, "minute")
    const status = reservation.reservationStatus

    if (status === "ARRIVED" || minutes > 60) {
        return (
            <StatusBadge tone={STATUS_TONE[status]}>{STATUS_LABEL[status] ?? status}</StatusBadge>
        )
    }
    if (minutes >= 0) return <StatusBadge tone="warning">Còn {minutes} phút</StatusBadge>
    return <StatusBadge tone="danger">Trễ {Math.abs(minutes)} phút</StatusBadge>
}

export default function FloorPage() {
    const tablesQuery = useTables()
    const reservationsQuery = useReservations(RESERVATION_PARAMS)
    const updateStatus = useUpdateReservationStatus()
    const removeTable = useDeleteTable()

    const [editing, setEditing] = useState(null)
    const [deleting, setDeleting] = useState(null)
    const [scope, setScope] = useState("today")
    const [selectedId, setSelectedId] = useState(null)
    const [seating, setSeating] = useState(null)
    const tables = Array.isArray(tablesQuery.data) ? tablesQuery.data : []
    const countStatus = (...statuses) => tables.filter((t) => statuses.includes(t.tableStatus)).length

    const occupied = countStatus("IN_USE", "SERVING")
    const reserved = countStatus("RESERVED")
    const available = countStatus("AVAILABLE")
    const maintenance = countStatus("MAINTENANCE")
    const usable = tables.length - maintenance
    const occupancy = usable > 0 ? Math.round((occupied * 100) / usable) : 0

    const groups = [...new Set(tables.map((t) => t.position ?? null))]
        .sort((a, b) => (a ?? Infinity) - (b ?? Infinity))
        .map((position) => ({
            key: String(position),
            position,
            tables: tables
                .filter((t) => (t.position ?? null) === position)
                .sort((a, b) => a.name.localeCompare(b.name, "vi", { numeric: true })),
        }))

    const now = dayjs()
    const startOfToday = now.startOf("day")
    const endOfToday = now.endOf("day")

    const upcoming = (reservationsQuery.data?.content ?? [])
        .filter((r) => ACTIVE_STATUSES.includes(r.reservationStatus))
        .filter((r) => {
            const t = dayjs(r.reservationTime)
            if (t.isBefore(startOfToday)) return false
            return scope === "today" ? !t.isAfter(endOfToday) : true
        })
        .sort((a, b) => dayjs(a.reservationTime).valueOf() - dayjs(b.reservationTime).valueOf())

    const todayCount = (reservationsQuery.data?.content ?? []).filter((r) => {
        const t = dayjs(r.reservationTime)
        return ACTIVE_STATUSES.includes(r.reservationStatus) && !t.isBefore(startOfToday) && !t.isAfter(endOfToday)
    }).length

    const selected = upcoming.find((r) => r.id === selectedId) ?? upcoming[0] ?? null

    const reservationColumns = [
        {
            key: "time",
            header: "Giờ",
            className: "w-[96px] font-medium",
            cell: (r) => {
                const t = dayjs(r.reservationTime)
                return scope === "today" ? t.format("HH:mm") : t.format("HH:mm · DD/MM")
            },
        },
        {
            key: "contactName",
            header: "Khách đặt",
            cell: (r) => (
                <>
                    {r.contactName} <span className="text-muted-foreground">· {r.partySize} khách</span>
                </>
            ),
        },
        { key: "reservationCode", header: "Mã", className: "w-[120px] text-muted-foreground" },
        {
            key: "status",
            header: "Trạng thái",
            className: "w-[130px]",
            cell: (r) => <ReservationStatusCell reservation={r} now={now} />,
        },
    ]

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Bàn & đặt chỗ"
                description={`Điều phối ${tables.length} bàn · Theo dõi khách và lịch đặt trong ngày`}
                actions={
                    <Button onClick={() => setEditing({})}>
                        <Plus /> Thêm bàn
                    </Button>
                }
            />

            {tablesQuery.isError && (
                <p role="alert" className="text-center text-xs text-destructive">
                    {tablesQuery.error.message}
                </p>
            )}

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <KpiCard label="Đang có khách" value={`${occupied} / ${tables.length} bàn`} note={`${occupancy}% công suất`} />
                <KpiCard label="Đã đặt, chưa đến" value={`${reserved} bàn`} note={`${todayCount} lượt đặt còn xử lý trong ngày`} />
                <KpiCard label="Sẵn sàng đón khách" value={`${available} bàn`} note="Có thể xếp khách ngay" />
                <KpiCard label="Đang bảo trì" value={`${maintenance} bàn`} note="Tạm ngưng sử dụng" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div className="min-w-0 space-y-6">
                    <Panel title="Sơ đồ bàn hiện tại" description="Bấm vào một bàn để chỉnh sửa hoặc đổi trạng thái">
                        {tablesQuery.isLoading ? (
                            <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
                        ) : (
                            <TableMap groups={groups} onSelect={setEditing} />
                        )}
                    </Panel>

                    <Panel
                        title="Đặt chỗ sắp tới"
                        description={scope === "today" ? "Các lượt đặt còn xử lý trong hôm nay" : "Tất cả lượt đặt từ hôm nay trở đi"}
                        action={
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1" role="group" aria-label="Phạm vi lịch đặt">
                                    <button type="button" className={tab(scope === "today")} onClick={() => setScope("today")}>
                                        Hôm nay
                                    </button>
                                    <button type="button" className={tab(scope === "all")} onClick={() => setScope("all")}>
                                        Sắp tới
                                    </button>
                                </div>
                                <Link to="/admin/reservations" className="text-rose hover:underline">
                                    Toàn bộ lịch sử →
                                </Link>
                            </div>
                        }
                    >
                        {reservationsQuery.isLoading && (
                            <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
                        )}
                        {reservationsQuery.isError && (
                            <p role="alert" className="py-6 text-center text-xs text-destructive">
                                {reservationsQuery.error.message}
                            </p>
                        )}
                        {reservationsQuery.data && (
                            <DataTable
                                columns={reservationColumns}
                                rows={upcoming}
                                getRowKey={(r) => r.id}
                                onRowClick={(r) => setSelectedId(r.id)}
                                isRowActive={(r) => r.id === selected?.id}
                                empty="Không có lượt đặt nào cần xử lý"
                            />
                        )}
                    </Panel>
                </div>

                <div className="space-y-6">
                    <ReservationDetail
                        reservation={selected}
                        pending={updateStatus.isPending}
                        onChangeStatus={(id, status) =>
                            status === "ARRIVED" ? setSeating(selected) : updateStatus.mutate({ id, status })}
                    />

                    <Panel title="Công suất theo khu">
                        <div className="space-y-3">
                            {groups.length === 0 && (
                                <p className="text-xs text-muted-foreground">Chưa có dữ liệu</p>
                            )}
                            {groups.map((g) => {
                                const used = g.tables.filter((t) => ["IN_USE", "SERVING"].includes(t.tableStatus)).length
                                return (
                                    <InfoRow
                                        key={g.key}
                                        label={g.position == null ? "Khu khác" : `Khu ${g.position}`}
                                        value={`${used} / ${g.tables.length} bàn`}
                                    />
                                )
                            })}
                        </div>
                    </Panel>
                </div>
            </div>
            {seating && (
                <SeatTableDialog
                    key={seating.id}
                    reservation={seating}
                    pending={updateStatus.isPending}
                    onClose={() => setSeating(null)}
                    onConfirm={(tableId) =>
                        updateStatus.mutate(
                            { id: seating.id, status: "ARRIVED", tableId },
                            { onSuccess: () => setSeating(null) }
                        )
                    }
                />
            )}
            <PageFooter note={`Cập nhật lúc ${now.format("HH:mm · DD/MM/YYYY")}`} />

            <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
                <DialogContent title={editing?.id ? `Sửa ${editing.name}` : "Thêm bàn mới"}>
                    {editing && (
                        <div className="space-y-4">
                            <TableForm key={editing.id ?? "new"} initial={editing} onDone={() => setEditing(null)} />
                            {editing.id && (
                                <div className="border-t border-border pt-4">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            setDeleting(editing)
                                            setEditing(null)
                                        }}
                                    >
                                        Xóa bàn này
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!deleting}
                title={`Xóa ${deleting?.name ?? "bàn"}?`}
                description="Thao tác này không thể hoàn tác."
                pending={removeTable.isPending}
                onCancel={() => setDeleting(null)}
                onConfirm={() => removeTable.mutate(deleting.id, { onSettled: () => setDeleting(null) })}
            />
        </main>
    )
}
