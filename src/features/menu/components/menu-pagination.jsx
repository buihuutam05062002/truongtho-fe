import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const btn =
    "flex size-10 items-center justify-center rounded-sm border text-[13px] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"

export function MenuPagination({ page, pageCount, from, to, total, onPage }) {
    if (pageCount <= 1) return null
    return (
        <nav aria-label="Phân trang" className="flex flex-col items-center gap-3 border-t border-border pt-8">
            <div className="flex gap-2">
                <button
                    type="button"
                    className={cn(btn, "border-border text-foreground hover:bg-secondary")}
                    disabled={page === 0}
                    onClick={() => onPage(page - 1)}
                    aria-label="Trang trước"
                >
                    <ArrowLeft className="size-4" />
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-current={i === page ? "page" : undefined}
                        onClick={() => onPage(i)}
                        className={cn(
                            btn,
                            i === page
                                ? "border-gold bg-gold font-medium text-background"
                                : "border-border text-foreground hover:bg-secondary"
                        )}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    type="button"
                    className={cn(btn, "border-border text-foreground hover:bg-secondary")}
                    disabled={page >= pageCount - 1}
                    onClick={() => onPage(page + 1)}
                    aria-label="Trang sau"
                >
                    <ArrowRight className="size-4" />
                </button>
            </div>
            <p className="text-xs text-muted-foreground">
                Hiển thị {from}–{to} trong {total} món
            </p>
        </nav>
    )
}