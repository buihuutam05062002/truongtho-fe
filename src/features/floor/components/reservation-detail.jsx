import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { InfoRow } from "@/components/dashboard/info-row"
import { Notice } from "@/components/dashboard/notice"
import { Panel } from "@/components/dashboard/panel"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { NEXT_ACTIONS, STATUS_LABEL, STATUS_TONE } from "@/features/reservation/constants"

export function ReservationDetail({ reservation, pending, onChangeStatus }) {
    if (!reservation) {
        return (
            <Panel title="Chi tiết đặt chỗ">
                <p className="py-6 text-center text-xs text-muted-foreground">
                    Chọn một lượt đặt trong danh sách để xem chi tiết
                </p>
            </Panel>
        )
    }

    const actions = NEXT_ACTIONS[reservation.reservationStatus] ?? []

    return (
        <Panel title={`Đặt chỗ ${reservation.reservationCode}`} description={reservation.contactName}>
            <div className="space-y-4">
                <StatusBadge tone={STATUS_TONE[reservation.reservationStatus]}>
                    {STATUS_LABEL[reservation.reservationStatus] ?? reservation.reservationStatus}
                </StatusBadge>

                <div className="space-y-3">
                    <InfoRow label="Ngày / giờ" value={dayjs(reservation.reservationTime).format("DD/MM · HH:mm")} />
                    <InfoRow label="Số khách" value={`${reservation.partySize} người`} />
                    <InfoRow label="Điện thoại" value={reservation.contactPhone} />
                    <InfoRow label="Đặt lúc" value={dayjs(reservation.createdAt).format("HH:mm · DD/MM/YYYY")} />
                </div>

                {reservation.note && <Notice>{reservation.note}</Notice>}

                {actions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {actions.map((a, i) => (
                            <Button
                                key={a.status}
                                size="sm"
                                variant={i === 0 ? "default" : "outline"}
                                disabled={pending}
                                onClick={() => onChangeStatus(reservation.id, a.status)}
                            >
                                {a.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </Panel>
    )
}
