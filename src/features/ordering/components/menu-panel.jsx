import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDebouncedValue } from "@/lib/use-debounced-value"
import { Input } from "@/components/ui/input"
import { Panel } from "@/components/dashboard/panel"
import { useCategories } from "@/features/categories/hooks"
import { useProducts } from "@/features/product/hooks"
import { ORDERABLE_STATUSES, PRODUCT_STATUS_LABEL, formatPrice } from "@/features/product/constants"

const chip = (active) =>
    cn(
        "shrink-0 rounded-full border px-3 py-1 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        active
            ? "border-rose bg-rose/10 font-semibold text-foreground"
            : "border-border text-muted-foreground hover:text-foreground"
    )

export function MenuPanel({ onAdd, busy }) {
    const [search, setSearch] = useState("")
    const [categoryId, setCategoryId] = useState(null)
    const keyword = useDebouncedValue(search.trim(), 300)

    const { data: categories = [] } = useCategories()
    const { data, isLoading, isError, error } = useProducts({
        page: 0,
        size: 100,
        sort: "id,asc",
        keyword: keyword || undefined,
        categoryId: categoryId ?? undefined,
    })
    const products = data?.content ?? []

    return (
        <Panel title="Thực đơn" description="Bấm vào món để thêm vào hóa đơn" className="min-w-0">
            <div className="space-y-3">
                <div className="relative">
                    <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm món…"
                        aria-label="Tìm món"
                        className="h-[38px] bg-background pl-9 text-xs md:text-xs dark:bg-background"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Lọc theo danh mục">
                    <button type="button" className={chip(categoryId === null)} onClick={() => setCategoryId(null)}>
                        Tất cả
                    </button>
                    {categories.map((c) => (
                        <button key={c.id} type="button" className={chip(categoryId === c.id)} onClick={() => setCategoryId(c.id)}>
                            {c.name}
                        </button>
                    ))}
                </div>

                {isLoading && <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>}
                {isError && (
                    <p role="alert" className="py-6 text-center text-xs text-destructive">
                        {error.message}
                    </p>
                )}
                {data && products.length === 0 && (
                    <p className="py-6 text-center text-xs text-muted-foreground">Không tìm thấy món phù hợp</p>
                )}

                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 2xl:grid-cols-3">
                    {products.map((p) => {
                        const orderable = ORDERABLE_STATUSES.includes(p.productStatus) && p.unitPrice != null
                        const cover = [...(p.productImageResponses ?? [])].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
                        return (
                            <li key={p.id}>
                                <button
                                    type="button"
                                    disabled={!orderable || busy}
                                    onClick={() => onAdd(p)}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-lg border border-border bg-secondary/40 p-2.5 text-left outline-none transition-colors",
                                        "hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    )}
                                >
                                    <span className="size-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                                        {cover && <img src={cover.imageUrl} alt="" loading="lazy" className="size-full object-cover" />}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs font-semibold text-foreground">{p.name}</span>
                                        <span className="block text-[11px] text-muted-foreground">
                                            {orderable ? formatPrice(p.unitPrice) : (PRODUCT_STATUS_LABEL[p.productStatus] ?? "Không bán")}
                                        </span>
                                    </span>
                                    {orderable && <Plus aria-hidden="true" className="size-4 shrink-0 text-rose" />}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Panel>
    )
}
