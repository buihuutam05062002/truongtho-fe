import { useState } from "react"
import { cn } from "@/lib/utils"
import { TABLE_STATUS_LABEL, TABLE_STATUS_TONE } from "@/features/table/constants"

const TONE_TEXT = {
    success: "text-success",
    warning: "text-warning",
    info: "text-sky-700 dark:text-sky-300",
    neutral: "text-muted-foreground",
}

const TONE_BORDER = {
    success: "border-border",
    warning: "border-warning/60",
    info: "border-sky-500/40",
    neutral: "border-border opacity-70",
}

const areaLabel = (position) => (position == null ? "Khu khác" : `Khu ${position}`)

const tab = (active) =>
    cn(
        "border-b-2 px-3 pb-2.5 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
        active
            ? "border-rose font-semibold text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground"
    )


export function TableMap({ groups, onSelect }) {
    const [area, setArea] = useState("all")
    const visible = area === "all" ? groups : groups.filter((g) => g.key === area)

    return (
        <div>
            <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border" role="group" aria-label="Lọc theo khu vực">
                <button type="button" className={tab(area === "all")} onClick={() => setArea("all")}>
                    Tất cả khu vực
                </button>
                {groups.map((g) => (
                    <button key={g.key} type="button" className={tab(area === g.key)} onClick={() => setArea(g.key)}>
                        {areaLabel(g.position)}
                    </button>
                ))}
            </div>

            {visible.length === 0 && (
                <p className="py-6 text-center text-xs text-muted-foreground">
                    Chưa có bàn nào. Nhấn “Thêm bàn” để tạo bàn đầu tiên
                </p>
            )}

            <div className="space-y-5">
                {visible.map((g) => (
                    <section key={g.key} aria-label={areaLabel(g.position)}>
                        <h3 className="mb-2 text-[11px] text-subtle">
                            {areaLabel(g.position)} · {g.tables.length} bàn
                        </h3>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                            {g.tables.map((t) => {
                                const tone = TABLE_STATUS_TONE[t.tableStatus] ?? "neutral"
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => onSelect(t)}
                                        className={cn(
                                            "flex flex-col gap-1 rounded-lg border bg-secondary/40 p-3 text-left outline-none transition-colors",
                                            "hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50",
                                            TONE_BORDER[tone]
                                        )}
                                    >
                                        <span className="text-sm font-semibold text-foreground">{t.name}</span>
                                        <span className={cn("text-[10px]", TONE_TEXT[tone])}>
                                            {TABLE_STATUS_LABEL[t.tableStatus] ?? t.tableStatus}
                                        </span>
                                        <span className="text-[10px] text-subtle">{t.capacity} chỗ</span>
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
