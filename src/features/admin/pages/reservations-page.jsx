import { useState } from "react"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Pagination } from "@/components/dashboard/pagination"
import { NEXT_ACTIONS, STATUS_LABEL, STATUS_TONE } from "@/features/reservation/constants"
import { useReservations, useUpdateReservationStatus } from "@/features/reservation/hooks"

export default function ReservationsPage() {
  const [page, setPage] = useState(0)
  const { data, isLoading, isError, error } = useReservations({
    page,
    size: 10,
    sort: "createdAt,desc",
  })
  const updateStatus = useUpdateReservationStatus()

  const columns = [
    { key: "reservationCode", header: "Mã", className: "font-medium" },
    { key: "contactName", header: "Họ và tên" },
    { key: "contactPhone", header: "Số điện thoại" },
    {
      key: "reservationTime",
      header: "Thời gian",
      cell: (r) => dayjs(r.reservationTime).format("HH:mm · DD/MM/YYYY"),
    },
    { key: "partySize", header: "Số khách", align: "right" },
    {
      key: "reservationStatus",
      header: "Trạng thái",
      cell: (r) => (
        <StatusBadge tone={STATUS_TONE[r.reservationStatus]}>
          {STATUS_LABEL[r.reservationStatus] ?? r.reservationStatus}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      header: "Thao tác",
      cell: (r) => (
        <div className="flex flex-wrap gap-2">
          {(NEXT_ACTIONS[r.reservationStatus] ?? []).map((a) => (
            <Button
              key={a.status}
              size="sm"
              variant={a.status === "CANCELLED" ? "outline" : "default"}
              disabled={updateStatus.isPending}
              onClick={() => updateStatus.mutate({ id: r.id, status: a.status })}
            >
              {a.label}
            </Button>
          ))}
        </div>
      ),
    },
  ]

  return (
    <main className="space-y-6 p-4 lg:p-8">
      <PageHeader
        title="Đặt bàn"
        description="Theo dõi và xác nhận các yêu cầu đặt bàn của khách"
      />

      <Panel
        title="Danh sách đặt bàn"
        description={data ? `${data.totalElements} yêu cầu` : undefined}
      >
        {isLoading && (
          <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
        )}
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
              getRowKey={(r) => r.id}
              empty="Chưa có yêu cầu đặt bàn nào"
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
    </main>
  )
}