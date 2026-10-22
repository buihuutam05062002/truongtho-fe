import {z} from 'zod'

export const loginSchema = z.object({
    email: z.email('Email không hợp lệ'),
    password: z.string().min(6, "tối thiểu")
})

export const registerSchema = loginSchema
    .extend({
        confirmPassword: z.string().min(1, "vui lòng nhập lại mật khẩu"),
    }).refine((v) => v.password === v.confirmPassword, {
        path: ['confirmPassword'],
        message: "mật khẩu xác nhân không khớp"
    })