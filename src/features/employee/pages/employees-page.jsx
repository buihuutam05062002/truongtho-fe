import { useState } from "react"
import { Plus, Search } from "lucide-react"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { useDebouncedValue } from "@/lib/use-debounced-value"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { PageNumbers } from "@/components/dashboard/page-numbers"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import EmployeeForm from "../components/employee-form"
import TempPasswordDialog from "../components/temp-password-dialog"
import { useEmployees, useEmployeeStats, useResetEmployeePassword, useDeleteEmployee } from "../hooks"
import { EMPLOYEE_STATUS_LABEL, EMPLOYEE_STATUS_TONE, formatDate, initials } from "../constants"

const PAGE_SIZE = 8
const headerBtn = "h-[38px] px-3.5 text-xs font-semibold"

export default function EmployeesPage() {
    const [status, setStatus] = useState(null)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [selection, setSelection] = useState(null)
    const [creating, setCreating] = useState(false)
    const [confirmReset, setConfirmReset] = useState(false)
    const [credential, setCredential] = useState(null)

    const keyword = useDebouncedValue(search.trim(), 300)

    const { data, isLoading, isError, error } = useEmployees({
        page,
        size: PAGE_SIZE,
        sort: "hireDate,desc",
        keyword: keyword || undefined,
        status: status ?? undefined,
    })
    const { data: stats } = useEmployeeStats()
    const reset = useResetEmployeePassword()
    const remove = useDeleteEmployee()
    const [confirmDelete, setConfirmDelete] = useState(false)

    const rows = data?.content ?? []
    const filtering = !!keyword || status != null
    const selected = (rows.find((e) => e.id === selection?.id) ?? selection ?? rows[0] ?? null)

    const statusCount = (key) =>
        ({ ACTIVE: stats?.active, ON_LEAVE: stats?.onLeave, SUSPENDED: stats?.suspended, RESIGNED: stats?.resigned })[key]

    const columns = [
        {
            key: "name",
            header: "Nhân viên",
            cell: (e) => (
                <div className="flex items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-primary dark:text-[#dea092]">
                        {initials(e.fullName)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-foreground">{e.fullName}</p>
                        <p className="truncate text-muted-foreground">{e.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "contact",
            header: "Liên hệ",
            className: "w-[170px] text-muted-foreground",
            cell: (e) => (
                <div className="min-w-0">
                    <p className="truncate">{e.phoneNumber || "—"}</p>
                    <p className="truncate">{e.email}</p>
                </div>
            ),
        },
        { key: "hireDate", header: "Vào làm", className: "w-[88px] text-muted-foreground", cell: (e) => formatDate(e.hireDate) },
        {
            key: "employeeStatus",
            header: "Trạng thái",
            className: "w-[112px]",
            cell: (e) => (
                <StatusBadge tone={EMPLOYEE_STATUS_TONE[e.employeeStatus]}>
                    {EMPLOYEE_STATUS_LABEL[e.employeeStatus] ?? e.employeeStatus}
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
        setStatus(value)
        setPage(0)
    }

    const doReset = () =>
        reset.mutate(selected.id, {
            onSuccess: ({ tempPassword }) =>
                setCredential({
                    title: "Mật khẩu tạm mới",
                    description: `Đã cấp lại mật khẩu cho ${selected.fullName}.`,
                    username: selected.email,
                    password: tempPassword,
                }),
            onSettled: () => setConfirmReset(false),
        })

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Nhân sự"
                description="Quản lý hồ sơ, tình trạng làm việc và tài khoản đăng nhập của nhân viên"
                actions={
                    <Button className={headerBtn} onClick={() => setCreating(true)}>
                        <Plus className="size-[15px]" /> Thêm nhân viên
                    </Button>
                }
            />

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <KpiCard label="Tổng nhân sự" value={`${stats?.total ?? "—"} người`} note="Toàn bộ hồ sơ nhân viên" />
                <KpiCard label="Đang làm việc" value={`${stats?.active ?? "—"} người`} note="Tài khoản đang hoạt động" />
                <KpiCard label="Nghỉ phép" value={`${stats?.onLeave ?? "—"} người`} note="Vắng mặt tạm thời" />
                <KpiCard label="Đã nghỉ / ngưng" value={`${stats ? stats.suspended + stats.resigned : "—"} người`} note="Tài khoản bị khóa đăng nhập" />
            </div>

            <div className="flex flex-col items-start gap-6 xl:flex-row">
                <Panel title="Danh sách nhân viên" description="Hồ sơ nhân sự" className="w-full min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap border-b border-border" role="group" aria-label="Lọc theo tình trạng">
                        <button type="button" className={tab(status == null)} onClick={() => setFilter(null)}>
                            Tất cả{stats ? ` (${stats.total})` : ""}
                        </button>
                        {Object.entries(EMPLOYEE_STATUS_LABEL).map(([value, label]) => (
                            <button key={value} type="button" className={tab(status === value)} onClick={() => setFilter(value)}>
                                {label}
                                {statusCount(value) != null ? ` (${statusCount(value)})` : ""}
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
                            aria-label="Tìm nhân viên"
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
                                getRowKey={(e) => e.id}
                                empty={
                                    filtering
                                        ? "Không có nhân viên nào khớp bộ lọc"
                                        : "Chưa có nhân viên nào. Nhấn “Thêm nhân viên” để tạo hồ sơ đầu tiên"
                                }
                                onRowClick={(e) => setSelection(e)}
                                isRowActive={(e) => selected?.id === e.id}
                            />
                            <PageNumbers
                                page={data.number}
                                pageSize={PAGE_SIZE}
                                totalItems={data.totalElements}
                                unit="nhân viên"
                                onPage={setPage}
                            />
                        </>
                    )}
                </Panel>

                <Panel
                    title="Hồ sơ nhân viên"
                    description={selected ? selected.email : "Chọn một nhân viên trong danh sách"}
                    className="w-full space-y-4 xl:sticky xl:top-6 xl:w-[360px] xl:shrink-0"
                >
                    {selected ? (
                        <EmployeeForm
                            key={selected.id}
                            employee={selected}
                            onResetPassword={() => setConfirmReset(true)}
                            onDelete={() => setConfirmDelete(true)}
                        />
                    ) : (
                        <p className="py-6 text-center text-xs text-muted-foreground">
                            {isLoading ? "Đang tải..." : "Chưa có nhân viên nào để hiển thị"}
                        </p>
                    )}
                </Panel>
            </div>

            <Dialog open={creating} onOpenChange={(o) => !o && setCreating(false)}>
                <DialogContent
                    title="Thêm nhân viên mới"
                    description="Tạo tài khoản và hồ sơ nhân viên"
                    className="max-w-md"
                >
                    <EmployeeForm
                        onCreated={({ employee, tempPassword, promoted }) => {
                            setCreating(false)
                            setSelection(employee)
                            if (promoted) {
                                toast.success(`${employee.fullName || employee.email} đã được nâng lên nhân viên. Họ cần đăng nhập lại.`)
                                return
                            }
                            setCredential({
                                title: "Đã tạo nhân viên",
                                description: `Tài khoản của ${employee.fullName} đã sẵn sàng.`,
                                username: employee.email,
                                password: tempPassword,
                            })
                        }}
                        onCancel={() => setCreating(false)}
                    />
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={confirmDelete}
                title={`Xóa nhân viên ${selected?.fullName ?? ""}?`}
                description="Hồ sơ và tài khoản đăng nhập sẽ bị xóa vĩnh viễn. Nếu nhân viên đã có hóa đơn hoặc đặt bàn, hãy chuyển sang “Đã nghỉ việc” thay vì xóa."
                confirmLabel="Xóa"
                pending={remove.isPending}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={() =>
                    remove.mutate(selected.id, {
                        onSuccess: () => setSelection(null),
                        onSettled: () => setConfirmDelete(false),
                    })
                }
            />

            <ConfirmDialog
                open={confirmReset}
                title={`Cấp lại mật khẩu cho ${selected?.fullName ?? "nhân viên"}?`}
                description="Mật khẩu hiện tại sẽ không còn dùng được. Mật khẩu tạm mới chỉ hiển thị một lần."
                confirmLabel="Cấp lại"
                pending={reset.isPending}
                onCancel={() => setConfirmReset(false)}
                onConfirm={doReset}
            />

            <TempPasswordDialog
                open={!!credential}
                title={credential?.title}
                description={credential?.description}
                username={credential?.username}
                password={credential?.password}
                onClose={() => setCredential(null)}
            />
        </main>
    )
}
