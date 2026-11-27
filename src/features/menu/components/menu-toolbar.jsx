import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PRICE_RANGES, SORT_OPTIONS } from "../constants"

export function MenuToolbar({ categories, counts, totalAll, filters }) {
    return (
        <div className="border-b border-border bg-card">
            <div className="mx-auto max-w-7xl space-y-4 px-6 pt-5 lg:px-10">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="relative min-w-0 flex-1">
                        <Search
                            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <Input
                            type="search"
                            value={filters.keyword}
                            onChange={(e) => filters.setKeyword(e.target.value)}
                            placeholder="Tìm theo tên món, ví dụ: vịt quay, trà sen…"
                            aria-label="Tìm món ăn"
                            maxLength={100}
                            className="h-10 pl-10 pr-9 text-sm [&::-webkit-search-cancel-button]:hidden"
                        />
                        {filters.keyword && (
                            <button
                                type="button"
                                onClick={() => filters.setKeyword("")}
                                aria-label="Xóa từ khóa"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>

                    <div role="group" aria-label="Sắp xếp món" className="flex flex-wrap gap-2">
                        {SORT_OPTIONS.map((o) => {
                            const active = filters.sort === o.key
                            return (
                                <button
                                    key={o.key}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => filters.setSort(o.key)}
                                    className={cn(
                                        "h-9 rounded-sm border px-3.5 text-[13px] sm:h-10 sm:px-4 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                                        active
                                            ? "border-gold bg-gold font-medium text-background"
                                            : "border-border bg-background text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {o.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <nav aria-label="Danh mục món" className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
                    <ul className="flex min-w-max items-center gap-7">
                        <li>
                            <Tab active={!filters.cat} count={totalAll} onClick={() => filters.setCat("")}>
                                Tất cả
                            </Tab>
                        </li>
                        {categories.map((c) => (
                            <li key={c.id}>
                                <Tab
                                    active={filters.cat === String(c.id)}
                                    count={counts.get(c.id) ?? 0}
                                    onClick={() => filters.setCat(String(c.id))}
                                >
                                    {c.name}
                                </Tab>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export function PriceLinks({ price, onChange }) {
    return (
        <div role="group" aria-label="Lọc theo mức giá" className="flex flex-wrap gap-x-4 gap-y-1">
            {PRICE_RANGES.map((r) => (
                <button
                    key={r.key}
                    type="button"
                    aria-pressed={price === r.key}
                    onClick={() => onChange(r.key)}
                    className={cn(
                        "rounded-sm text-[11px] underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        price === r.key
                            ? "text-gold decoration-gold"
                            : "text-muted-foreground decoration-border hover:text-foreground"
                    )}
                >
                    {r.label}
                </button>
            ))}
        </div>
    )
}

function Tab({ active, count, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={cn(
                "flex items-baseline gap-1.5 border-b-2 py-2.5 text-[13px] whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                active ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
        >
            {children}
            <span className="text-[10px] text-subtle">{count}</span>
        </button>
    )
}