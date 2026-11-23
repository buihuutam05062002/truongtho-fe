import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FormField } from "@/components/form/form-field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { applyServerErrors } from "@/lib/form"
import { reservationSchema } from "../schemas"

const toPayload = (v) => ({
  contactName: v.contactName,
  contactPhone: v.contactPhone,
  reservationTime: dayjs(v.reservationTime).format("YYYY-MM-DDTHH:mm:ss"),
  partySize: v.partySize,
  note: v.note || null,
})

export function EditReservationDialog({ reservation, pending, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      contactName: reservation.contactName,
      contactPhone: reservation.contactPhone,
      reservationTime: dayjs(reservation.reservationTime).format("YYYY-MM-DDTHH:mm"),
      partySize: reservation.partySize,
      note: reservation.note ?? "",
    },
  })

  const submit = (values) => onSubmit(toPayload(values), (err) => applyServerErrors(err, setError))
  const wasConfirmed = reservation.reservationStatus === "CONFIRMED"

  return (
    <Dialog open onOpenChange={(o) => !o && !pending && onClose()}>
      <DialogContent
        title="Sửa đặt bàn"
        description={
          wasConfirmed
            ? `Mã ${reservation.reservationCode} · Sau khi sửa, nhà hàng sẽ xác nhận lại yêu cầu của bạn`
            : `Mã ${reservation.reservationCode}`
        }
      >
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          <FormField id="e-contactName" label="Họ và tên" error={errors.contactName?.message}>
            <Input id="e-contactName" {...register("contactName")} aria-invalid={!!errors.contactName} />
          </FormField>
          <FormField id="e-contactPhone" label="Số điện thoại" error={errors.contactPhone?.message}>
            <Input id="e-contactPhone" type="tel" {...register("contactPhone")} aria-invalid={!!errors.contactPhone} />
          </FormField>
          <FormField id="e-reservationTime" label="Thời gian" error={errors.reservationTime?.message}>
            <Input
              id="e-reservationTime"
              type="datetime-local"
              min={dayjs().format("YYYY-MM-DDTHH:mm")}
              {...register("reservationTime")}
              aria-invalid={!!errors.reservationTime}
            />
          </FormField>
          <FormField id="e-partySize" label="Số người" error={errors.partySize?.message}>
            <Input
              id="e-partySize"
              type="number"
              {...register("partySize", { valueAsNumber: true })}
              aria-invalid={!!errors.partySize}
            />
          </FormField>
          <FormField id="e-note" label="Ghi chú" error={errors.note?.message}>
            <Textarea id="e-note" {...register("note")} aria-invalid={!!errors.note} />
          </FormField>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={pending} onClick={onClose}>
              Đóng
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
