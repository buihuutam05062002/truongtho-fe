import { useState } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { ChevronDown, Folder, Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebouncedValue } from "@/lib/use-debounced-value"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { DataTable } from "@/components/dashboard/data-table"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { PageFooter } from "@/components/dashboard/page-footer"
import { PageNumbers } from "@/components/dashboard/page-numbers"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { useCategories } from "@/features/categories/hooks"
import ProductForm from "../components/product-form"
import CategoryManager from "../components/category-manager"
import { useDeleteProduct, useProducts, useProductStats } from "../hooks"
import { PRODUCT_STATUS_LABEL, PRODUCT_STATUS_TONE, formatCode, formatPrice } from "../constants"

const PAGE_SIZE = 8
const headerBtn = "h-[38px] px-3.5 text-xs font-semibold"

export default function ProductsPage() {
    const [categoryId, setCategoryId] = useState(null)
    const [status, setStatus] = useState("ALL")
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)
    const [selection, setSelection] = useState(null)
    const [creating, setCreating] = useState(false)
    const [deleting, setDeleting] = useState(null)
    const [managing, setManaging] = useState(false)

    const keyword = useDebouncedValue(search.trim(), 300)

    const { data, isLoading, isError, error, dataUpdatedAt } = useProducts({
        page,
        size: PAGE_SIZE,
        sort: "id,asc",
        keyword: keyword || undefined,
        categoryId: categoryId ?? undefined,
        status: status === "ALL" ? undefined : status,
    })
    const { data: stats } = useProductStats()
    const { data: categories = [] } = useCategories()
    const remove = useDeleteProduct()

    const rows = data?.content ?? []
    const countByCategory = new Map((stats?.categories ?? []).map((c) => [c.categoryId, c.count]))
    const usedCategories = categories.filter((c) => countByCategory.get(c.id)).length
    const updatedAt = dataUpdatedAt ? dayjs(dataUpdatedAt) : null
    const filtering = !!keyword || categoryId != null || status !== "ALL"

    const selected = creating
        ? null
        : (rows.find((p) => p.id === selection?.id) ?? selection ?? rows[0] ?? null)

    const setFilter = (setter) => (value) => {
        setter(value)
        setPage(0)
    }

    const columns = [
        { key: "code", header: "Mã", className: "w-[48px] font-medium", cell: (p) => formatCode(p.id) },
        {
            key: "name",
            header: "Tên món",
            cell: (p) => {
                const images = p.productImageResponses ?? []
                return (
                    <div className="flex items-center gap-2.5">
                        <div className="relative size-9 shrink-0">
                            {images[0] ? (
                                <img src={images[0].imageUrl} alt="" className="size-full rounded-sm object-cover" />
                            ) : (
                                <div className="size-full rounded-sm bg-secondary" aria-hidden="true" />
                            )}
                            {images.length > 1 && (
                                <span
                                    className="absolute -bottom-1 -right-1 rounded-full bg-foreground px-1 text-[9px] leading-[14px] text-background"
                                    title={`${images.length} ảnh`}
                                >
                                    {images.length}
                                </span>
                            )}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-foreground">{p.name}</p>
                            <p className="truncate text-muted-foreground">{p.categoryResponse?.name ?? "—"}</p>
                        </div>
                    </div>
                )
            },
        },
        { key: "unitPrice", header: "Giá bán", className: "w-[92px] text-muted-foreground", cell: (p) => formatPrice(p.unitPrice) },
        {
            key: "productStatus",
            header: "Tình trạng",
            className: "w-[110px]",
            cell: (p) => (
                <StatusBadge tone={PRODUCT_STATUS_TONE[p.productStatus]}>
                    {PRODUCT_STATUS_LABEL[p.productStatus] ?? p.productStatus}
                </StatusBadge>
            ),
        },
    ]

    const chip = (active) =>
        cn(
            "rounded-sm px-2.5 py-[7px] text-[10px] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
            active
                ? "bg-accent text-primary dark:text-[#dea092]"
                : "bg-secondary text-muted-foreground hover:text-foreground"
        )

    return (
        <main className="space-y-[22px] p-4 lg:px-8 lg:py-[26px]">
            <PageHeader
                title="Thực đơn"
                description="Quản lý danh mục, giá bán và tình trạng món · Giá niêm yết bằng VND"
                actions={
                    <>
                        <Button variant="outline" className={cn(headerBtn, "bg-card")} onClick={() => setManaging(true)}>
                            <Folder className="size-[15px]" /> Quản lý danh mục
                        </Button>
                        <Button className={headerBtn} onClick={() => setCreating(true)}>
                            <Plus className="size-[15px]" /> Thêm món
                        </Button>
                    </>
                }
            />

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <KpiCard label="Tổng số món" value={`${stats?.total ?? "—"} món`} note={`${usedCategories} danh mục đang sử dụng`} />
                <KpiCard label="Đang bán" value={`${stats?.orderable ?? "—"} món`} note="Có thể gọi tại bàn" />
                <KpiCard label="Tạm ngưng" value={`${stats?.paused ?? "—"} món`} note="Hết hàng hoặc ngừng bán" />
                <KpiCard label="Giá đã gồm thuế" value="VND" note="Áp dụng đồng nhất toàn nhà hàng" />
            </div>

            <div className="flex flex-col items-start gap-6 xl:flex-row">
                <Panel
                    title="Danh sách món"
                    description={updatedAt ? `Thực đơn chính · Cập nhật gần nhất ${updatedAt.format("HH:mm")}` : "Thực đơn chính"}
                    className="w-full min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Lọc theo danh mục">
                        <button type="button" className={chip(categoryId == null)} onClick={() => setFilter(setCategoryId)(null)}>
                            Tất cả · {stats?.total ?? "—"}
                        </button>
                        {categories.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                className={chip(categoryId === c.id)}
                                onClick={() => setFilter(setCategoryId)(c.id)}
                            >
                                {c.name} · {countByCategory.get(c.id) ?? 0}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <div className="relative min-w-[200px] flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
                            <Input
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(0)
                                }}
                                placeholder="Tìm theo tên hoặc mô tả món…"
                                aria-label="Tìm món"
                                className="h-[38px] bg-background pl-9 text-xs md:text-xs dark:bg-background"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={status}
                                onChange={(e) => setFilter(setStatus)(e.target.value)}
                                aria-label="Lọc theo tình trạng"
                                className="h-[38px] cursor-pointer appearance-none rounded-lg border border-border bg-card pl-3.5 pr-9 text-xs font-semibold text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                            >
                                <option value="ALL">Tất cả trạng thái</option>
                                {Object.entries(PRODUCT_STATUS_LABEL).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-[15px] -translate-y-1/2 text-foreground" />
                        </div>
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
                                getRowKey={(p) => p.id}
                                empty={
                                    filtering
                                        ? "Không có món nào khớp bộ lọc"
                                        : "Chưa có món nào. Nhấn “Thêm món” để tạo món đầu tiên"
                                }
                                onRowClick={(p) => {
                                    setCreating(false)
                                    setSelection(p)
                                }}
                                isRowActive={(p) => selected?.id === p.id}
                            />
                            <PageNumbers
                                page={data.number}
                                pageSize={PAGE_SIZE}
                                totalItems={data.totalElements}
                                unit="món"
                                onPage={setPage}
                            />
                        </>
                    )}
                </Panel>

                <Panel
                    title={selected ? "Chỉnh sửa món" : "Thêm món mới"}
                    description={selected ? `${formatCode(selected.id)} · ${selected.name}` : "Nhập thông tin món"}
                    action={
                        selected && (
                            <Link
                                to={`/menu?q=${encodeURIComponent(selected.name)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 dark:text-[#dea092]"
                            >
                                Xem trước
                            </Link>
                        )
                    }
                    className="w-full space-y-4 xl:sticky xl:top-6 xl:w-[380px] xl:shrink-0"
                >
                    {data && (
                        <ProductForm
                            key={selected?.id ?? "new"}
                            initial={selected ?? {}}
                            onSaved={(p) => {
                                setCreating(false)
                                if (p?.id) setSelection(p)
                            }}
                            onCancel={() => setCreating(false)}
                            onDelete={() => setDeleting(selected)}
                        />
                    )}
                </Panel>
            </div>

            <ConfirmDialog
                open={!!deleting}
                title={`Xóa ${deleting?.name ?? "món"}?`}
                description="Món và toàn bộ hình ảnh của món sẽ bị xóa vĩnh viễn."
                pending={remove.isPending}
                onCancel={() => setDeleting(null)}
                onConfirm={() =>
                    remove.mutate(deleting.id, {
                        onSuccess: () => setSelection(null),
                        onSettled: () => setDeleting(null),
                    })
                }
            />

            <CategoryManager open={managing} onClose={() => setManaging(false)} />

            <PageFooter
                note={updatedAt ? `Dữ liệu ${updatedAt.format("DD/MM/YYYY")} · Cập nhật đến ${updatedAt.format("HH:mm")}` : undefined}
            />
        </main>
    )
}
