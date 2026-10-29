import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/form-field";
import { PasswordInput } from "@/components/form/password-input";
import { EmailInput } from "@/components/form/text-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas";
import { useLogin } from "../hooks";
import { applyServerErrors } from "@/lib/form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const login = useLogin();

  const onSubmit = (values) =>
    login.mutate(values, { onError: (err) => applyServerErrors(err, setError) });
  return (
    <>
      <div className="space-y-2">
        <h1 className="font-serif text-4xl font-semibold">Đăng nhập</h1>
        <p className="text-sm text-muted-foreground">Chào mừng bạn quay lại</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Lần đầu ghé thăm?{" "}
        <Link
          to="/register"
          className="font-medium text-red-400 underline-offset-4 hover:underline"
        >
          Tạo tài khoản
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <FormField id="email" label="Email" error={errors.email?.message}>
          <EmailInput
            id="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FormField>

        <FormField
          id="password"
          label="Mật khẩu"
          error={errors.password?.message}
        >
          <PasswordInput
            id="password"
            autoComplete="current-password"
            aria-invalid={!!errors.email}
            {...register("password")}
          />
        </FormField>

        {login.isError && (
          <p role="alert" className="text-sm text-destructive">
            {login.error.message}
          </p>
        )}
        <Button type="submit" disabled={login.isPending} className="p-5 w-full">Xác nhận</Button>
      </form>


      <Button className="p-5 bg-red-700 w-full  ">GOOGLE</Button>
    </>
  );
}
