import {z} from "zod"

export const reservationSchema = z.object({
    contactName: z.string().trim().min(1,"vui lòng nhập họ tên").max(100, "Tối đa 100 ký tự"),
    contactPhone: z.string().trim().min(1, "vui lòng nhập số điện thoại").regex(/^(0|\+84)\d{9}$/, "Số điện thoại không hợp lệ"),
    reservationTime: z.string().min(1," vui lòng chọn thời gian")
        .refine((v) => new Date(v).getTime() > Date.now(), "Thời gian đặt bàn không phù hợp"),
    partySize: z.number({ error: "Vui lòng nhập số người" }).min(1,"vui lòng nhập số lượng người").max(50, "Tối đa 50 người, vui lòng liên hệ nhà hàng").int(),
    note: z.string().trim().max(500, "Tối đa 500 ký tự")
})


const ok = {
    contactName: "tam",
    contactPhone: "0918132062",
    reservationTime:"2030-01-01T19:00",
    partySize: 4,
    note: "Chẳng có gì"
}

const temp =  reservationSchema.safeParse({...ok, contactPhone: "0918132062"}).success;
console.log(temp)