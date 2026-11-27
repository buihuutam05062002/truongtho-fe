import { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import toast from "react-hot-toast"
import { CalendarClock, Users, Armchair } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Pagination } from "@/components/dashboard/pagination"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { useCancelMyReservation, useMyReservations, useUpdateMyReservation } from "../hooks"
import { CUSTOMER_EDITABLE, STATUS_LABEL, STATUS_TONE } from "../constants"
import { EditReservationDialog } from "../components/edit-reservation-dialog"
import { useMyLoyalty } from "@/features/loyalty/hooks"
import { formatVnd } from "@/features/invoice/constants"

export default function MyReservationsPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError, error } = useMyReservations({ page, size: 10 })
  const update = useUpdateMyReservation()
  const cancel = useCancelMyReservation()
  const [editing, setEditing] = useState(null)
  const [cancelling, setCancelling] = useState(null)
  const { data: loyalty } = useMyLoyalty()

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-semibold">Đặt bàn của tôi</h1>
          <p className="text-sm text-muted-foreground">Xem, chỉnh sửa hoặc hủy các yêu cầu đặt bàn của bạn</p>
        </div>
        <Button nativeButton={false} render={<Link to="/reserve" />}>
          Đặt bàn mới
        </Button>
      </div>

      {loyalty && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card p-4 text-sm">
          <p>
            Điểm tích lũy: <strong>{loyalty.points}</strong>
            <span className="text-muted-foreground">
              {" "}
              ( {formatVnd(loyalty.points * loyalty.vndPerPointRedeemed)})
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Tích 1 điểm mỗi {formatVnd(loyalty.vndPerPointEarned)} · 1 điểm = {formatVnd(loyalty.vndPerPointRedeemed)}
          </p>
        </div>
      )}

      {isLoading && <p className="py-10 text-center text-sm text-muted-foreground">Đang tải...</p>}
      {isError && (
        <p role="alert" className="py-10 text-center text-sm text-destructive">
          {error.message}
        </p>
      )}

      {data && data.content.length === 0 && (
        <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          Bạn chưa có yêu cầu đặt bàn nào.
        </div>
      )}

      <ul className="space-y-3">
        {data?.content.map((r) => {
          const editable = CUSTOMER_EDITABLE.includes(r.reservationStatus)
          return (
            <li key={r.id} className="space-y-3 rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{r.reservationCode}</p>
                <StatusBadge tone={STATUS_TONE[r.reservationStatus]}>
                  {STATUS_LABEL[r.reservationStatus] ?? r.reservationStatus}
                </StatusBadge>
              </div>

              <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <CalendarClock className="size-4" />
                  {dayjs(r.reservationTime).format("HH:mm · DD/MM/YYYY")}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="size-4" />
                  {r.partySize} người
                </span>
                {r.tableName && (
                  <span className="flex items-center gap-2">
                    <Armchair className="size-4" />
                    {r.tableName}
                  </span>
                )}
              </div>

              <p className="text-sm">
                {r.contactName} · {r.contactPhone}
              </p>
              {r.note && <p className="text-sm text-muted-foreground">Ghi chú: {r.note}</p>}

              {editable && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => setEditing(r)}>
                    Sửa
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setCancelling(r)}>
                    Hủy đặt bàn
                  </Button>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {data && data.totalPages > 1 && (
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
      )}

      {editing && (
        <EditReservationDialog
          key={editing.id}
          reservation={editing}
          pending={update.isPending}
          onClose={() => setEditing(null)}
          onSubmit={(body, onError) =>
            update.mutate(
              { id: editing.id, body },
              {
                onSuccess: () => setEditing(null),
                onError: (err) => {
                  onError(err)
                  if (!err?.details) toast.error(err.message)
                },
              }
            )
          }
        />
      )}

      <ConfirmDialog
        open={!!cancelling}
        title="Hủy đặt bàn?"
        description={cancelling && `${cancelling.reservationCode} · ${dayjs(cancelling.reservationTime).format("HH:mm, DD/MM/YYYY")}`}
        confirmLabel="Hủy đặt bàn"
        cancelLabel="Giữ lại"
        pending={cancel.isPending}
        onCancel={() => setCancelling(null)}
        onConfirm={() => cancel.mutate(cancelling.id, { onSuccess: () => setCancelling(null), onError: () => setCancelling(null) })}
      />
    </main>
  )
}
