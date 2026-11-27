import {z} from 'zod'

const email = z.string().trim().min(1, "Vui lòng nhập email").email("Email không hợp lệ");


export const loginSchema = z.object({
    email,
    password: z.string().min(6, "tối thiểu")
})

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
        newPassword: z.string().min(8, "Mật khẩu mới tối thiểu 8 ký tự").max(72, "Mật khẩu tối đa 72 ký tự"),
        confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu mới"),
    })
    .refine((v) => v.newPassword === v.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu nhập lại không khớp",
    })
    .refine((v) => v.newPassword !== v.currentPassword, {
        path: ["newPassword"],
        message: "Mật khẩu mới phải khác mật khẩu hiện tại",
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