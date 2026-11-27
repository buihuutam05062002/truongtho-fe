import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/features/categories/hooks"
import { MenuHero } from "../components/menu-hero"
import { MenuToolbar, PriceLinks } from "../components/menu-toolbar"
import { MenuCard } from "../components/menu-card"
import { MenuPagination } from "../components/menu-pagination"
import { DishDialog } from "../components/dish-dialog"
import { useMenu } from "../hooks/use-menu"
import { useMenuFilters } from "../hooks/use-menu-filters"
import { GRID_PAGE_SIZE } from "../constants"
import { countByCategory, sortProducts } from "../utils"

export default function MenuPage() {
    const filters = useMenuFilters()
    const [params, setParams] = useSearchParams()

    const categoriesQuery = useCategories()
    const menu = useMenu(filters.apiParams)

    const categories = useMemo(
        () => [...(categoriesQuery.data ?? [])].sort((a, b) => a.id - b.id),
        [categoriesQuery.data]
    )
    const all = useMemo(() => menu.data?.content ?? [], [menu.data])
    const counts = useMemo(() => countByCategory(all), [all])

    const visible = useMemo(() => {
        const inCategory = filters.cat ? all.filter((p) => String(p.categoryResponse?.id) === filters.cat) : all
        return sortProducts(inCategory, filters.sort)
    }, [all, filters.cat, filters.sort])
    const dishId = params.get("dish")
    const selected = useMemo(() => all.find((p) => String(p.id) === dishId) ?? null, [all, dishId])
    const setSelected = useCallback(
        (p) =>
            setParams(
                (prev) => {
                    const next = new URLSearchParams(prev)
                    if (p) next.set("dish", String(p.id))
                    else next.delete("dish")
                    return next
                },
                { replace: true }
            ),
        [setParams]
    )
    const pageCount = Math.max(1, Math.ceil(visible.length / GRID_PAGE_SIZE))
    const page = Math.min(filters.page, pageCount - 1)
    const start = page * GRID_PAGE_SIZE
    const items = visible.slice(start, start + GRID_PAGE_SIZE)

    const goToPage = (n) => {
        filters.setPage(n)
        document.getElementById("menu-list")?.scrollIntoView({ block: "start" })
    }

    return (
        <main>
            <MenuHero />
            <MenuToolbar categories={categories} counts={counts} totalAll={all.length} filters={filters} />

            <section
                id="menu-list"
                aria-busy={menu.isFetching}
                className="mx-auto max-w-7xl scroll-mt-24 px-6 py-8 lg:px-10"
            >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                    <p className="text-xs text-muted-foreground" aria-live="polite">
                        {menu.isPending ? "Đang tải…" : `${visible.length} món`}
                    </p>
                    <PriceLinks price={filters.price} onChange={filters.setPrice} />
                </div>

                <div className={menu.isPlaceholderData ? "opacity-60 transition-opacity" : "transition-opacity"}>
                    {menu.isPending && <MenuSkeleton />}

                    {menu.isError && !menu.data && (
                        <MenuMessage
                            title="Chưa tải được thực đơn"
                            text={menu.error?.message ?? "Vui lòng thử lại sau."}
                            action={
                                <Button variant="outline" onClick={() => menu.refetch()}>
                                    Thử lại
                                </Button>
                            }
                        />
                    )}

                    {menu.data && visible.length === 0 && (
                        <MenuMessage
                            title={filters.hasActive ? "Chưa tìm thấy món phù hợp" : "Thực đơn đang được cập nhật"}
                            text={
                                filters.hasActive
                                    ? "Thử đổi từ khóa hoặc bỏ bớt bộ lọc nhé."
                                    : "Mời bạn quay lại sau ít phút."
                            }
                            action={
                                filters.hasActive && (
                                    <Button variant="outline" onClick={filters.reset}>
                                        Xóa bộ lọc
                                    </Button>
                                )
                            }
                        />
                    )}

                    {items.length > 0 && (
                        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((p) => (
                                <MenuCard key={p.id} product={p} onSelect={setSelected} />
                            ))}
                        </ul>
                    )}
                </div>

                {menu.data && !menu.data.last && (
                    <p className="mt-8 text-center text-xs text-subtle">
                        Đang hiển thị {menu.data.numberOfElements} / {menu.data.totalElements} món — hãy thu hẹp bộ
                        lọc để xem các món còn lại.
                    </p>
                )}

                <div className="mt-12">
                    <MenuPagination
                        page={page}
                        pageCount={pageCount}
                        from={start + 1}
                        to={start + items.length}
                        total={visible.length}
                        onPage={goToPage}
                    />
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 pb-14 lg:px-10">
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5 text-xs text-subtle">
                    <p>Giá niêm yết bằng VND. Vui lòng báo trước nếu bạn có dị ứng thực phẩm.</p>
                    <p>Mỗi ngày · 11:00–14:30 / 17:30–22:00</p>
                </div>
            </div>

            <DishDialog product={selected} items={visible} onChange={setSelected} onClose={() => setSelected(null)} />
        </main>
    )
}

function MenuMessage({ title, text, action }) {
    return (
        <div className="py-20 text-center" role="status">
            <p className="font-serif text-3xl text-foreground">{title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    )
}

function MenuSkeleton() {
    return (
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="space-y-3">
                    <div className="aspect-4/3 animate-pulse rounded-sm bg-secondary" />
                    <div className="h-6 w-2/3 animate-pulse rounded bg-secondary" />
                    <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                </li>
            ))}
        </ul>
    )
}