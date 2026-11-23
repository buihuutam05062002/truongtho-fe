import { z } from "zod"
import { CONTACT_TOPICS } from "./constants"

const phone = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập số điện thoại")
  .refine((v) => /^(0|\+84)\d{9,10}$/.test(v.replace(/[\s.-]/g, "")), "Số điện thoại không hợp lệ")

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(100, "Tối đa 100 ký tự"),
  phone,
  email: z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  topic: z.enum(CONTACT_TOPICS),
  message: z.string().trim().min(10, "Lời nhắn tối thiểu 10 ký tự").max(1000, "Tối đa 1000 ký tự"),
})