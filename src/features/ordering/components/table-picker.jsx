import { cn } from "@/lib/utils"
import { TABLE_STATUS_LABEL } from "@/features/table/constants"

const SELECTABLE = ["AVAILABLE", "RESERVED", "SERVING"]

const STATUS_STYLE = {
    AVAILABLE: "border-border",
    SERVING: "border-sky-500/50 bg-sky-500/5",
}

export function TablePicker({ tables, selectedId, onSelect }) {
    const sorted = [...tables].sort((a, b) => a.name.localeCompare(b.name, "vi", { numeric: true }))

    if (sorted.length === 0) {
        return <p className="py-4 text-center text-xs text-muted-foreground">Chưa có bàn nào</p>
    }

    return (
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
            {sorted.map((t) => {
                const selectable = SELECTABLE.includes(t.tableStatus)
                const selected = t.id === selectedId
                return (
                    <button
                        key={t.id}
                        type="button"
                        disabled={!selectable}
                        aria-pressed={selected}
                        title={selectable ? undefined : (TABLE_STATUS_LABEL[t.tableStatus] ?? t.tableStatus)}
                        onClick={() => onSelect(t.id)}
                        className={cn(
                            "flex flex-col gap-0.5 rounded-lg border bg-card p-2.5 text-left outline-none transition-colors",
                            "focus-visible:ring-3 focus-visible:ring-ring/50",
                            selectable ? "hover:bg-secondary" : "cursor-not-allowed opacity-50",
                            STATUS_STYLE[t.tableStatus] ?? "border-border",
                            selected && "border-rose ring-1 ring-rose"
                        )}
                    >
                        <span className="text-sm font-semibold text-foreground">{t.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                            {TABLE_STATUS_LABEL[t.tableStatus] ?? t.tableStatus}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
