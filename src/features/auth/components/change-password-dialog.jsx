import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FormField } from "@/components/form/form-field"
import { PasswordInput } from "@/components/form/password-input"
import { ERR } from "@/lib/errorCodes"
import { applyServerErrors } from "@/lib/form"
import { changePasswordSchema } from "../schemas"
import { useChangePassword } from "../hooks"

const input = "h-10 text-xs md:text-xs"

function Form({ onClose }) {
    const change = useChangePassword()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    })

    const onSubmit = ({ currentPassword, newPassword }) =>
        change.mutate(
            { currentPassword, newPassword },
            {
                onSuccess: onClose,
                onError: (err) => {
                    if (err?.code === ERR.WRONG_CURRENT_PASSWORD) {
                        setError("currentPassword", { type: "server", message: err.message })
                    } else if (err?.details?.newPassword) {
                        applyServerErrors(err, setError)
                    } else {
                        setError("newPassword", { type: "server", message: err?.message ?? "Có lỗi xảy ra" })
                    }
                },
            }
        )

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField id="currentPassword" label="Mật khẩu hiện tại" error={errors.currentPassword?.message}>
                <PasswordInput id="currentPassword" autoComplete="current-password" className={input} {...register("currentPassword")} />
            </FormField>
            <FormField id="newPassword" label="Mật khẩu mới" error={errors.newPassword?.message}>
                <PasswordInput id="newPassword" autoComplete="new-password" className={input} {...register("newPassword")} />
            </FormField>
            <FormField id="confirmPassword" label="Nhập lại mật khẩu mới" error={errors.confirmPassword?.message}>
                <PasswordInput id="confirmPassword" autoComplete="new-password" className={input} {...register("confirmPassword")} />
            </FormField>
            <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" onClick={onClose}>
                    Hủy
                </Button>
                <Button type="submit" disabled={change.isPending}>
                    Đổi mật khẩu
                </Button>
            </div>
        </form>
    )
}

export default function ChangePasswordDialog({ open, onClose }) {
    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent
                title="Đổi mật khẩu"
                description="Các thiết bị khác đang đăng nhập sẽ bị đăng xuất."
                className="max-w-sm"
            >
                <Form onClose={onClose} />
            </DialogContent>
        </Dialog>
    )
}
