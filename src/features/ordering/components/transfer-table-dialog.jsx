import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const COPY = {
    move: {
        title: "Chuyển sang bàn khác",
        hint: "Chọn một bàn trống để chuyển cả hóa đơn sang.",
        status: "AVAILABLE",
        empty: "Hiện không còn bàn trống",
        confirm: "Chuyển bàn",
    },
    merge: {
        title: "Gộp bàn",
        hint: "Chọn bàn đang phục vụ để gộp món của bàn đó vào hóa đơn này. Bàn đó sẽ trở về trống.",
        status: "SERVING",
        empty: "Không có bàn nào đang phục vụ để gộp",
        confirm: "Gộp bàn",
    },
}

export function TransferTableDialog({ mode, tables, currentTableId, pending, onClose, onConfirm }) {
    const copy = COPY[mode]
    const [selected, setSelected] = useState(null)

    const options = tables
        .filter((t) => t.tableStatus === copy.status && t.id !== currentTableId)
        .sort((a, b) => a.name.localeCompare(b.name, "vi", { numeric: true }))

    return (
        <Dialog open onOpenChange={(o) => !o && onClose()}>
            <DialogContent title={copy.title}>
                <div className="space-y-4">
                    <p className="text-xs text-muted-foreground">{copy.hint}</p>

                    {options.length === 0 && (
                        <p className="py-4 text-center text-xs text-muted-foreground">{copy.empty}</p>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                        {options.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                aria-pressed={t.id === selected}
                                onClick={() => setSelected(t.id)}
                                className={cn(
                                    "flex flex-col rounded-lg border bg-card p-2.5 text-left hover:bg-secondary",
                                    t.id === selected ? "border-rose ring-1 ring-rose" : "border-border"
                                )}
                            >
                                <span className="text-sm font-semibold">{t.name}</span>
                                <span className="text-[10px] text-muted-foreground">{t.capacity} chỗ</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Hủy</Button>
                        <Button disabled={selected == null || pending} onClick={() => onConfirm(selected)}>
                            {copy.confirm}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}