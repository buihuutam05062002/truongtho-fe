import { Link } from "react-router-dom"
import {Button} from "@/components/ui/button"
import { FormField } from "@/components/form/form-field"
import {PasswordInput} from "@/components/form/password-input"
import {EmailInput} from "@/components/form/text-input"

export default function RegisterPage(){
    return (
        <>
        <div className="space-y-2">
            <h1 className="font-serif text-4xl font-semibold">Tạo tài khoản</h1>
            <p className="text-sm text-muted-foreground">Vài bước</p>
        </div>
        <FormField  id={"email"} label={"Email"} error={"Email không hợp lệ"} children={<EmailInput type="text" />}  ></FormField>
        <FormField id="password" label="Mật khẩu" error={"Sai email hoặc mật khẩu"} children={<PasswordInput ></PasswordInput>}></FormField>
        <FormField id="password" label="Xác nhận Mật khẩu" error={"Sai email hoặc mật khẩu"} children={<PasswordInput ></PasswordInput>}></FormField>
        <Button className="p-5 bg-red-700 w-full  ">GOOGLE</Button>
        <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-red-400 underline-offset-4 hover:underline">Đăng nhập</Link>
        </p>
        </>
    )
}