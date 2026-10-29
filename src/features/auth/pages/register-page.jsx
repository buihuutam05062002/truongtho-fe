import { Link } from "react-router-dom"
import {Button} from "@/components/ui/button"
import { FormField } from "@/components/form/form-field"
import {PasswordInput} from "@/components/form/password-input"
import {EmailInput} from "@/components/form/text-input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../schemas"
import { useRegister } from "../hooks"
import { applyServerErrors } from "@/lib/form"


export default function RegisterPage(){

    const {
        register,
        handleSubmit,
         setError,
          formState:{errors}
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {email: "", password: "", confirmPassword: ""}
    })
    const signup = useRegister();

    const onSubmit = ({email,password}) =>signup.mutate({email,password}, {onError: (err) => applyServerErrors(err,setError)})
    return (
        <>
        <div className="space-y-2">
            <h1 className="font-serif text-4xl font-semibold">Tạo tài khoản</h1>
            <p className="text-sm text-muted-foreground">Vài bước</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <FormField id="email" label="Email" error={errors.email?.message}>
                <EmailInput id="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")}></EmailInput>
            </FormField>
            <FormField id="password" label="Mật khẩu" error={errors.password?.message}>
                <PasswordInput id="password" autoComplete="new-password" aria-invalid={!!errors.password} {...register("password")}></PasswordInput>
            </FormField>
            <FormField id="confirmPassword" label="Xác nhận mật khẩu" error={errors.confirmPassword?.message}>
                <PasswordInput id="confirmPassword" autoComplete="new-password" aria-invalid={!!errors.confirmPassword} {...register("confirmPassword")}></PasswordInput>
            </FormField>


            {signup.isError && !errors.email && 
                (<p role="alert" className="text-sm text-destructive">{signup.error.message}</p>)
            }
            <Button type="submit" disabled = {signup.isPending} className="p-5 bg-green-700 w-full">{signup.isPending ? "Đang tạo tài khoản.." : "Đăng ký"}</Button>

        </form>



        <Button type="button" className="p-5 bg-red-700 w-full">GOOGLE</Button>

        <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-red-400 underline-offset-4 hover:underline">Đăng nhập</Link>
        </p>
        </>
    )
}