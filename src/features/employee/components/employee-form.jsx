import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info, KeyRound, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoRow } from "@/components/dashboard/info-row"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useCreateEmployee, useUpdateEmployee } from "../hooks"
import { createEmployeeSchema, updateEmployeeSchema } from "../schemas"
import {
    EMPLOYEE_STATUS_LABEL,
    EMPLOYEE_STATUS_TONE,
    LOCKING_STATUSES,
    formatDate,
    initials,
    tenure,
    todayIso,
} from "../constants"

const control =
    "h-[38px] w-full rounded-lg border border-input bg-background px-2.5 text-xs text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-background"
const inputClass = "h-[38px] bg-background text-xs md:text-xs dark:bg-background"
const actionBtn = "h-[38px] px-3.5 text-xs font-semibold"

function Field({ id, label, error, children }) {
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id} className="text-[11px] font-normal text-muted-foreground">
                {label}
            </Label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}

function Notice({ children }) {
    return (
        <div className="flex items-start gap-2 rounded-sm bg-amber-500/10 p-3 text-[11px] text-amber-700 dark:text-[#d8b775]">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <p>{children}</p>
        </div>
    )
}

export default function EmployeeForm({ employee, onCreated, onCancel, onResetPassword, onDelete }) {
    const isEdit = !!employee
    const create = useCreateEmployee()
    const update = useUpdateEmployee()

    const defaults = isEdit
        ? {
              fullName: employee.fullName ?? "",
              phoneNumber: employee.phoneNumber ?? "",
              hireDate: employee.hireDate ?? todayIso(),
              employeeStatus: employee.employeeStatus ?? "ACTIVE",
          }
        : { fullName: "", email: "", phoneNumber: "", hireDate: todayIso() }

    const {
        register,
        handleSubmit,
        reset,
        control: formControl,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(isEdit ? updateEmployeeSchema : createEmployeeSchema),
        defaultValues: defaults,
    })

    const status = useWatch({ control: formControl, name: "employeeStatus" })

    const onSubmit = (values) => {
        const body = { ...values, phoneNumber: values.phoneNumber?.trim() || undefined }
        if (isEdit) update.mutate({ id: employee.id, body })
        else create.mutate(body, { onSuccess: (res) => onCreated?.(res) })
    }

    const handleCancel = () => (isEdit ? reset(defaults) : onCancel?.())
    const pending = create.isPending || update.isPending

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {isEdit && (
                <>
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary dark:text-[#dea092]">
                            {initials(employee.fullName)}
                        </div>
                        <div className="min-w-0 space-y-1.5">
                            <p className="truncate text-[15px] font-semibold text-foreground">{employee.fullName}</p>
                            <StatusBadge tone={EMPLOYEE_STATUS_TONE[employee.employeeStatus]}>
                                {EMPLOYEE_STATUS_LABEL[employee.employeeStatus] ?? employee.employeeStatus}
                            </StatusBadge>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <InfoRow label="Email" value={<span className="break-all">{employee.email}</span>} />
                        <InfoRow label="Ngày vào làm" value={formatDate(employee.hireDate)} />
                        <InfoRow label="Thâm niên" value={tenure(employee.hireDate)} />
                    </div>
                    <hr className="border-border" />
                </>
            )}

            {!isEdit && (
                <>
                    <Field id="email" label="Email (dùng để đăng nhập)" error={errors.email?.message}>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="off"
                            className={inputClass}
                            aria-invalid={!!errors.email}
                            {...register("email")}
                        />
                    </Field>
                </>
            )}

            <Field id="fullName" label="Họ và tên" error={errors.fullName?.message}>
                <Input id="fullName" className={inputClass} aria-invalid={!!errors.fullName} {...register("fullName")} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field id="phoneNumber" label="Số điện thoại" error={errors.phoneNumber?.message}>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        className={inputClass}
                        aria-invalid={!!errors.phoneNumber}
                        {...register("phoneNumber")}
                    />
                </Field>
                <Field id="hireDate" label="Ngày vào làm" error={errors.hireDate?.message}>
                    <Input
                        id="hireDate"
                        type="date"
                        className={inputClass}
                        aria-invalid={!!errors.hireDate}
                        {...register("hireDate")}
                    />
                </Field>
            </div>

            {isEdit && (
                <Field id="employeeStatus" label="Tình trạng làm việc" error={errors.employeeStatus?.message}>
                    <select id="employeeStatus" className={control} {...register("employeeStatus")}>
                        {Object.entries(EMPLOYEE_STATUS_LABEL).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </Field>
            )}

            {isEdit && LOCKING_STATUSES.includes(status) && (
                <Notice>Trạng thái này sẽ khóa tài khoản, nhân viên không thể đăng nhập cho đến khi được chuyển lại.</Notice>
            )}
            {!isEdit && (
                <Notice>
                    Email mới: hệ thống tạo mật khẩu tạm thời và chỉ hiển thị một lần. Email đã là khách hàng: tài khoản đó
                    được nâng lên nhân viên, giữ nguyên mật khẩu và điểm thành viên.
                </Notice>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
                <Button type="button" variant="outline" className={actionBtn} onClick={handleCancel}>
                    {isEdit ? "Hủy thay đổi" : "Hủy"}
                </Button>
                <Button type="submit" className={actionBtn} disabled={pending}>
                    <Save className="size-[15px]" />
                    {isEdit ? "Lưu thay đổi" : "Thêm nhân viên"}
                </Button>
                {isEdit && (
                    <Button
                        type="button"
                        variant="outline"
                        className={actionBtn}
                        onClick={onResetPassword}
                    >
                        <KeyRound className="size-[15px]" />
                        Cấp lại mật khẩu
                    </Button>
                )}
                {isEdit && (
                    <Button type="button" variant="destructive" className={actionBtn} onClick={onDelete}>
                        <Trash2 className="size-[15px]" />
                        Xóa
                    </Button>
                )}
            </div>
        </form>
    )
}
