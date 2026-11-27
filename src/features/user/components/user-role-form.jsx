import { useState } from "react"
import { Info, Lock, Save, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InfoRow } from "@/components/dashboard/info-row"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { useUpdateUserRoles, useUpdateUserStatus } from "../hooks"
import { ROLE_LABEL, USER_STATUS_LABEL, USER_STATUS_TONE } from "../constants"

const actionBtn = "h-[38px] px-3.5 text-xs font-semibold"
const ROLE_HINT = {
    ROLE_ADMIN: "Toàn quyền quản trị hệ thống",
    ROLE_STAFF: "Gọi món, phục vụ bàn, xử lý đặt chỗ",
    ROLE_CUSTOMER: "Đặt bàn, tích điểm thành viên",
}

function Notice({ children }) {
    return (
        <div className="flex items-start gap-2 rounded-sm bg-amber-500/10 p-3 text-[11px] text-amber-700 dark:text-[#d8b775]">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <p>{children}</p>
        </div>
    )
}

export default function UserRoleForm({ user, isSelf, onLock }) {
    const update = useUpdateUserRoles()
    const status = useUpdateUserStatus()
    const [roles, setRoles] = useState(user.roles ?? [])

    const original = user.roles ?? []
    const dirty = roles.length !== original.length || roles.some((r) => !original.includes(r))
    const addingStaff = roles.includes("ROLE_STAFF") && !original.includes("ROLE_STAFF")
    const removingStaff = !roles.includes("ROLE_STAFF") && original.includes("ROLE_STAFF")

    const toggle = (role) =>
        setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))

    const locked = user.userStatus === "LOCKED"

    return (
        <div className="space-y-4">
            <div className="space-y-1.5">
                <p className="truncate text-[15px] font-semibold text-foreground">
                    {user.fullName || user.email}
                </p>
                <StatusBadge tone={USER_STATUS_TONE[user.userStatus]}>
                    {USER_STATUS_LABEL[user.userStatus] ?? user.userStatus}
                </StatusBadge>
            </div>

            <div className="space-y-3">
                <InfoRow label="Email" value={<span className="break-all">{user.email}</span>} />
                <InfoRow label="Số điện thoại" value={user.phoneNumber || "—"} />
            </div>

            <hr className="border-border" />

            <fieldset className="space-y-2">
                <legend className="mb-2 text-[11px] text-muted-foreground">Vai trò</legend>
                {Object.entries(ROLE_LABEL).map(([role, label]) => {
                    const lockedBox = isSelf && role === "ROLE_ADMIN"
                    return (
                        <label
                            key={role}
                            className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border p-2.5 text-xs has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
                        >
                            <input
                                type="checkbox"
                                className="mt-0.5 size-3.5 accent-[var(--primary)]"
                                checked={roles.includes(role)}
                                disabled={lockedBox}
                                onChange={() => toggle(role)}
                            />
                            <span>
                                <span className="block font-medium text-foreground">{label}</span>
                                <span className="block text-[11px] text-muted-foreground">{ROLE_HINT[role]}</span>
                            </span>
                        </label>
                    )
                })}
            </fieldset>

            {isSelf && <Notice>Bạn không thể gỡ quyền quản trị hoặc khóa chính tài khoản của mình.</Notice>}
            {addingStaff && (
                <Notice>Hồ sơ nhân viên sẽ được tạo tự động (ngày vào làm là hôm nay). Có thể chỉnh lại ở trang Nhân sự.</Notice>
            )}
            {removingStaff && (
                <Notice>Hồ sơ nhân viên sẽ chuyển sang “Đã nghỉ việc”. Hóa đơn và đặt bàn cũ vẫn được giữ lại.</Notice>
            )}
            {dirty && <Notice>Người dùng cần đăng nhập lại để vai trò mới có hiệu lực.</Notice>}

            <div className="flex flex-wrap items-center gap-2.5">
                <Button type="button" variant="outline" className={actionBtn} disabled={!dirty} onClick={() => setRoles(original)}>
                    Hủy thay đổi
                </Button>
                <Button
                    type="button"
                    className={actionBtn}
                    disabled={!dirty || roles.length === 0 || update.isPending}
                    onClick={() => update.mutate({ id: user.id, roles })}
                >
                    <Save className="size-[15px]" />
                    Lưu vai trò
                </Button>
                {locked ? (
                    <Button
                        type="button"
                        variant="outline"
                        className={actionBtn}
                        disabled={status.isPending}
                        onClick={() => status.mutate({ id: user.id, status: "ACTIVE" })}
                    >
                        <Unlock className="size-[15px]" />
                        Mở khóa
                    </Button>
                ) : (
                    <Button
                        type="button"
                        variant="destructive"
                        className={actionBtn}
                        disabled={isSelf}
                        onClick={onLock}
                    >
                        <Lock className="size-[15px]" />
                        Khóa
                    </Button>
                )}
            </div>
        </div>
    )
}
