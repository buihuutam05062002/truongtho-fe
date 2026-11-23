import { z } from "zod"
import { EMPLOYEE_STATUS_LABEL } from "./constants"

const phone = z
    .string()
    .trim()
    .regex(/^[0-9+\s.-]{8,15}$/, "Số điện thoại không hợp lệ")
    .or(z.literal(""))
    .optional()

export const createEmployeeSchema = z.object({
    fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên"),
    email: z.string().trim().email("Email không hợp lệ"),
    phoneNumber: phone,
    hireDate: z.string().min(1, "Vui lòng chọn ngày vào làm"),
})

export const updateEmployeeSchema = z.object({
    fullName: z.string().trim().min(1, "Vui lòng nhập họ và tên"),
    phoneNumber: phone,
    hireDate: z.string().min(1, "Vui lòng chọn ngày vào làm"),
    employeeStatus: z.enum(Object.keys(EMPLOYEE_STATUS_LABEL), "Trạng thái không hợp lệ"),
})
