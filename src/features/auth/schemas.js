import {z} from 'zod'

const email = z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ");


export const loginSchema = z.object({
    email,
    password: z.string().min(6, "tối thiểu")
})

export const registerSchema =z
    .object({
        email,
        password: z.string().min(8, "Mật khẩu tối thiểu là 8").max(72, "mật khẩu tối đa"),
        confirmPassword: z.string().min(1, 'vui lòng nhập lại mật khẩu')
    })
    .refine((v) => v.password === v.confirmPassword,
    {
        path: ['confirmPassword'],
        message : "Mật khẩu nhập lại không khớp"
    }
)