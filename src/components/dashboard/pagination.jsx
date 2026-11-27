import { Button } from "@/components/ui/button"

export function Pagination({
  page,
  totalPages,
  totalItems,
  unit = "mục",
  isFirst,
  isLast,
  onPrev,
  onNext,
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
      <p className="text-muted-foreground">
        Trang {page + 1} / {Math.max(totalPages, 1)} ({totalItems} {unit})
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={isFirst} onClick={onPrev}>
          Trước
        </Button>
        <Button variant="outline" size="sm" disabled={isLast} onClick={onNext}>
          Sau
        </Button>
      </div>
    </div>
  )
}