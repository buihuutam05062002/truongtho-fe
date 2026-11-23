import { useState } from "react"
import { Ticket, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatVnd, splitDiscount } from "../constants"

export function VoucherBox({ invoice, busy, onApply, onRemove }) {
    const [code, setCode] = useState("")

    if (invoice.voucherCode) {
        const { voucherDiscount } = splitDiscount(invoice)
        return (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border p-3">
                <p className="flex min-w-0 items-center gap-2 text-xs">
                    <Ticket className="size-4 shrink-0 text-gold" />
                    <span className="truncate font-semibold">{invoice.voucherCode}</span>
                    <span className="text-muted-foreground">- {formatVnd(voucherDiscount)}</span>
                </p>
                <Button type="button" variant="ghost" size="icon-sm" aria-label="Bỏ mã giảm giá" disabled={busy} onClick={onRemove}>
                    <X />
                </Button>
            </div>
        )
    }

    const submit = (e) => {
        e.preventDefault()
        if (code.trim()) onApply(code.trim(), () => setCode(""))
    }

    return (
        <form onSubmit={submit} className="flex gap-2">
            <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Nhập mã giảm giá"
                aria-label="Mã giảm giá"
            />
            <Button type="submit" variant="outline" disabled={busy || !code.trim()}>
                Áp dụng
            </Button>
        </form>
    )
}
