import { useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebouncedValue } from "@/lib/use-debounced-value"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { PageNumbers } from "@/components/dashboard/page-numbers"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { useMe } from "@/features/auth/hooks"
import UserRoleForm from "../components/user-role-form"
import { useUsers, useUpdateUserStatus } from "../hooks"
import { ROLE_LABEL, ROLE_TONE, USER_STATUS_LABEL, USER_STATUS_TONE } from "../constants"

const PAGE_SIZE = 8

export default function UsersPage() {
    const { data: me } = useMe()
    const [role, setRole] = useState(null)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [selection, setSelection] = useState(null)
    const [confirmLock, setConfirmLock] = useState(false)

    const keyword = useDebouncedValue(search.trim(), 300)

    const { data, isLoading, isError, error } = useUsers({
        page,
        size: PAGE_SIZE,
        sort: "email,asc",
        keyword: keyword || undefined,
        role: role ?? undefined,
    })
    const status = useUpdateUserStatus()

    const rows = data?.content ?? []
    const filtering = !!keyword || role != null
    const selected = rows.find((u) => u.id === selection?.id) ?? selection ?? rows[0] ?? null

    const columns = [
        {
            key: "user",
            header: "Người dùng",
            cell: (u) => (
                <div className="min-w-0">
                    <p className="truncate text-foreground">{u.fullName || "(Chưa có tên)"}</p>
                    <p className="truncate text-muted-foreground">{u.email}</p>
                </div>
            ),
        },
        {
            key: "roles",
            header: "Vai trò",
            className: "w-[190px]",
            cell: (u) => (
                <div className="flex flex-wrap gap-1">
                    {(u.roles ?? []).map((r) => (
                        <StatusBadge key={r} tone={ROLE_TONE[r]}>
                            {ROLE_LABEL[r] ?? r}
                        </StatusBadge>
                    ))}
                </div>
            ),
        },
        {
            key: "userStatus",
            header: "Trạng thái",
            className: "w-[112px]",
            cell: (u) => (
                <StatusBadge tone={USER_STATUS_TONE[u.userStatus]}>
                    {USER_STATUS_LABEL[u.userStatus] ?? u.userStatus}
                </StatusBadge>
            ),
        },
    ]

    const tab = (active) =>
        cn(
            "-mb-px border-b-2 px-3.5 py-[11px] text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
            active
                ? "border-primary font-semibold text-primary dark:text-[#dea092]"
                : "border-transparent text-muted-foreground hover:text-foreground"
        )

    const setFilter = (value) => {
        setRole(value)
        setPage(0)
    }

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Người dùng"
                description="Quản lý tài khoản, phân quyền và nâng khách hàng thành nhân viên"
            />

            <div className="flex flex-col items-start gap-6 xl:flex-row">
                <Panel title="Danh sách người dùng" description="Tất cả tài khoản trong hệ thống" className="w-full min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap border-b border-border" role="group" aria-label="Lọc theo vai trò">
                        <button type="button" className={tab(role == null)} onClick={() => setFilter(null)}>
                            Tất cả
                        </button>
                        {Object.entries(ROLE_LABEL).map(([value, label]) => (
                            <button key={value} type="button" className={tab(role === value)} onClick={() => setFilter(value)}>
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
                        <Input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPage(0)
                            }}
                            placeholder="Tìm tên, email, số điện thoại…"
                            aria-label="Tìm người dùng"
                            className="h-[38px] bg-background pl-9 text-xs md:text-xs dark:bg-background"
                        />
                    </div>

                    {isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>}
                    {isError && (
                        <p role="alert" className="py-6 text-center text-xs text-destructive">
                            {error.message}
                        </p>
                    )}
                    {data && (
                        <>
                            <DataTable
                                columns={columns}
                                rows={rows}
                                getRowKey={(u) => u.id}
                                empty={filtering ? "Không có người dùng nào khớp bộ lọc" : "Chưa có người dùng nào"}
                                onRowClick={(u) => setSelection(u)}
                                isRowActive={(u) => selected?.id === u.id}
                            />
                            <PageNumbers
                                page={data.number}
                                pageSize={PAGE_SIZE}
                                totalItems={data.totalElements}
                                unit="người dùng"
                                onPage={setPage}
                            />
                        </>
                    )}
                </Panel>

                <Panel
                    title="Phân quyền"
                    description={selected ? selected.email : "Chọn một người dùng trong danh sách"}
                    className="w-full space-y-4 xl:sticky xl:top-6 xl:w-[360px] xl:shrink-0"
                >
                    {selected ? (
                        <UserRoleForm
                            key={`${selected.id}:${(selected.roles ?? []).slice().sort().join(",")}`}
                            user={selected}
                            isSelf={selected.id === me?.id}
                            onLock={() => setConfirmLock(true)}
                        />
                    ) : (
                        <p className="py-6 text-center text-xs text-muted-foreground">
                            {isLoading ? "Đang tải..." : "Chưa có người dùng nào để hiển thị"}
                        </p>
                    )}
                </Panel>
            </div>

            <ConfirmDialog
                open={confirmLock}
                title={`Khóa tài khoản ${selected?.fullName || selected?.email || ""}?`}
                description="Người dùng sẽ bị đăng xuất và không thể đăng nhập cho đến khi được mở khóa."
                confirmLabel="Khóa"
                pending={status.isPending}
                onCancel={() => setConfirmLock(false)}
                onConfirm={() =>
                    status.mutate(
                        { id: selected.id, status: "LOCKED" },
                        { onSettled: () => setConfirmLock(false) }
                    )
                }
            />
        </main>
    )
}
