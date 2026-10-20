import {Link} from "react-router-dom"
import {Button} from "@/components/ui/button"
import { FormField } from "@/components/form/form-field"
import {PasswordInput} from "@/components/form/password-input"
import {EmailInput} from "@/components/form/text-input"
export default function LoginPage(){
    return (
        <>
        <div className="space-y-2">
            <h1 className="font-serif text-4xl font-semibold">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground">Chào mừng bạn quay lại</p>
        </div>
        <p className="text-sm text-muted-foreground">
            Lần đầu ghé thăm?{" "}
            <Link to="/register" className="font-medium text-red-400 underline-offset-4 hover:underline">Tạo tài khoản</Link>
        </p>
        <FormField  id={"email"} label={"Email"} error={"Email không hợp lệ"} children={<EmailInput type="text" />}  ></FormField>
        <FormField id="password" label="Mật khẩu" error={"Sai email hoặc mật khẩu"} children={<PasswordInput ></PasswordInput>}></FormField>
        <Button className="p-5 bg-red-700 w-full  ">GOOGLE</Button>
        </>
    )
}