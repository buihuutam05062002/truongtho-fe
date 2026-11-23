import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useTables } from "@/features/table/hook"

export function SeatTableDialog({ reservation, pending, onClose, onConfirm }) {
    const { data, isLoading, isError, error } = useTables()
    const [tableId, setTableId] = useState(null)

    const free = (Array.isArray(data) ? data : [])
        .filter((t) => t.tableStatus === "AVAILABLE")
        .sort((a, b) => a.name.localeCompare(b.name, "vi", { numeric: true }))

    return (
        <Dialog open onOpenChange={(o) => !o && onClose()}>
            <DialogContent title={`Xếp bàn cho ${reservation.contactName}`}>
                <div className="space-y-4">
                    <p className="text-xs text-muted-foreground">
                        {reservation.partySize} khách. Chọn một bàn đang trống.
                    </p>

                    {isLoading && <p className="py-4 text-center text-xs">Đang tải...</p>}
                    {isError && <p role="alert" className="text-xs text-destructive">{error.message}</p>}
                    {data && free.length === 0 && (
                        <p className="py-4 text-center text-xs">Hiện không còn bàn trống</p>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                        {free.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTableId(t.id)}
                                className={cn(
                                    "flex flex-col rounded-lg border bg-card p-2.5 text-left hover:bg-secondary",
                                    t.id === tableId ? "border-rose ring-1 ring-rose" : "border-border"
                                )}
                            >
                                <span className="text-sm font-semibold">{t.name}</span>
                                <span className="text-[10px] text-muted-foreground">
                                    {t.capacity} chỗ{t.capacity < reservation.partySize ? " (không đủ chỗ)" : ""}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>Hủy</Button>
                        <Button disabled={tableId == null || pending} onClick={() => onConfirm(tableId)}>
                            Xác nhận khách đã đến
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}