import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "@/components/form/form-field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { reservationSchema } from "../schemas"
import { useCreateReservation } from "../hooks"
import dayjs from "dayjs"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { applyServerErrors } from "@/lib/form"
import {STATUS_LABEL} from "../constants"

const toPayload = (values) =>({
    contactName: values.contactName,
    contactPhone: values.contactPhone,
    reservationTime: dayjs(values.reservationTime).format("YYYY-MM-DDTHH:mm:ss"),
    partySize: values.partySize,
    note: values.note || null
})

export default function ReservationPage() {
    const [created, setCreated] = useState(null)
    const {register, handleSubmit,setError,reset,formState: {errors}} = useForm({resolver: zodResolver(reservationSchema),
        defaultValues: {contactName:"", contactPhone:"",reservationTime:"",note:"",partySize:2}
    })
    const reservation = useCreateReservation();
    const onSubmit = (values) => reservation.mutate(toPayload(values),{
        onSuccess: (res) =>setCreated(res),
        onError: (err) => applyServerErrors(err,setError)
    })
        // const onSubmit = (values) => console.log(values);
    const bookAnother = () =>{
        reset(),
        reservation.reset,
        setCreated(null)
    }

    if(created){
        return (
            <main className="mx-auto max-w-xl px-4 py-16 space-y-6">
                <h1  className="font-serif text-3xl font-semibold">Đặt bàn thành công</h1>
                <div className="space-y-2 rounded-lg border p-4">
                    <p>Mã đặt bàn: <strong>{created.reservationCode}</strong></p>


                    <p>Họ và tên: <strong>{created.contactName}</strong></p>
                    <p>Số điện thoại: <strong>{created.contactPhone}</strong></p>
                    <p>Số lượng: <strong>{created.partySize}</strong></p>
                    <p>Thời gian: <strong>{dayjs(created.reservationTime).format("HH:mm, DD/MM/YYYY")}</strong></p>
                    {created.note &&
                        (<p>Ghi chú: <strong>{created.note}</strong></p>)
                    }
                    <p>Trạng thái: <strong>{STATUS_LABEL[created.reservationStatus] ?? created.reservationStatus}</strong></p>
                </div>

                   <Button type="button" onClick={bookAnother}>Đặt thêm bàn</Button>
            </main>
        )
    }
    return (
        <main className="mx-auto max-w-xl px-4 py-16">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <FormField  id="contactName" label="Họ và tên" error={errors.contactName?.message}>
                    <Input id="contactName" autoComplete="name"  {...register("contactName")} className="h-11" aria-invalid={!!errors.contactName}></Input>
                </FormField>

                <FormField  id="contactPhone" label="Số điện thoại" error={errors.contactPhone?.message}>
                    <Input id="contactPhone" type="tel" autoComplete="tel"  {...register("contactPhone")} className="h-11" aria-invalid={!!errors.contactPhone}></Input>
                </FormField>

                <FormField  id="reservationTime" label="Thời gian" error={errors.reservationTime?.message}>
                    <Input id="reservationTime" type="datetime-local" min={dayjs().format("YYYY-MM-DDTHH:mm")}  {...register("reservationTime")} className="h-11" aria-invalid={!!errors.reservationTime}></Input>
                </FormField>

                <FormField  id="partySize" label="Số người" error={errors.partySize?.message}>
                    <Input id="partySize" type="number"   {...register("partySize", {valueAsNumber:true})} className="h-11" aria-invalid={!!errors.partySize}></Input>
                </FormField>
                <FormField  id="note" label="Ghi chú" error={errors.note?.message}>
                    <Textarea id="note"   {...register("note")} aria-invalid={!!errors.note}></Textarea>
                </FormField>

                {reservation.isError && !reservation.error?.details && (
                    <p role="alert" className="text-sm text-destructive">
                        {reservation.error.message}
                    </p>
                )}

                <Button type="submit" disabled={reservation.isPending}>{reservation.isPending ? "Đang gửi..." : "Xác nhận đặt bàn"}</Button>
             </form>
        </main>
    )
}