import { Button } from "@/components/ui/button"

const btn = "h-[38px] min-w-[38px] px-3.5 text-xs font-semibold"

export function PageNumbers({ page, pageSize, totalItems, unit = "mục", onPage }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const from = totalItems === 0 ? 0 : page * pageSize + 1
  const to = Math.min((page + 1) * pageSize, totalItems)
  const visible = Math.min(5, totalPages)
  const start = Math.max(0, Math.min(page - 2, totalPages - visible))
  const pages = Array.from({ length: visible }, (_, i) => start + i)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[10px] text-subtle">
        Hiển thị {from}–{to} trong {totalItems} {unit}
      </p>
      <div className="flex gap-1.5">
        <Button variant="outline" className={btn} aria-label="Trang trước" disabled={page === 0} onClick={() => onPage(page - 1)}>
          ‹
        </Button>
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            className={btn}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPage(p)}
          >
            {p + 1}
          </Button>
        ))}
        <Button variant="outline" className={btn} aria-label="Trang sau" disabled={page >= totalPages - 1} onClick={() => onPage(page + 1)}>
          ›
        </Button>
      </div>
    </div>
  )
}
