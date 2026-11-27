import { useState } from "react"
import { Gift, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatVnd, splitDiscount } from "@/features/invoice/constants"
import { EARN_VND_PER_POINT, MAX_REDEEM_PERCENT, POINT_VALUE_VND } from "@/features/loyalty/constants"

export function LoyaltyBox({ invoice, busy, onAttach, onDetach, onRedeem }) {
    const [keyword, setKeyword] = useState("")
    const [points, setPoints] = useState("")

    if (!invoice.customerId) {
        const submit = (e) => {
            e.preventDefault()
            if (keyword.trim()) onAttach(keyword.trim())
        }
        return (
            <form onSubmit={submit} className="flex gap-2 border-t border-border pt-4">
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Email hoặc SĐT khách thành viên"
                    aria-label="Tìm khách thành viên"
                />
                <Button type="submit" variant="outline" disabled={busy || !keyword.trim()}>
                    Gắn khách
                </Button>
            </form>
        )
    }

    const redeemed = invoice.pointsRedeemed ?? 0
    const balance = invoice.customerPoints ?? 0
    const base = Number(invoice.subTotal) - splitDiscount(invoice).voucherDiscount 
    const cap = Math.floor((base * MAX_REDEEM_PERCENT) / 100 / POINT_VALUE_VND)
    const max = Math.max(0, Math.min(balance + redeemed, cap)) 
    const willEarn = Math.floor(Number(invoice.totalAmount) / EARN_VND_PER_POINT)
    const wanted = Number(points)
    const invalid = points === "" || !Number.isInteger(wanted) || wanted < 1 || wanted > max

    return (
        <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="flex items-center gap-1.5 truncate text-xs font-semibold">
                        <Gift className="size-3.5 shrink-0 text-gold" />
                        {invoice.customerName || invoice.customerEmail}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                        Còn {balance} điểm · tối đa dùng {max} điểm ({formatVnd(max * POINT_VALUE_VND)})
                    </p>
                </div>
                <Button type="button" variant="ghost" size="icon-sm" aria-label="Bỏ khách" disabled={busy} onClick={onDetach}>
                    <X />
                </Button>
            </div>

            <div className="flex gap-2">
                <Input
                    type="number"
                    min={1}
                    max={max}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="Số điểm muốn dùng"
                    aria-label="Số điểm muốn dùng"
                />
                <Button type="button" variant="outline" disabled={busy || invalid} onClick={() => onRedeem(wanted)}>
                    Áp dụng
                </Button>
                {redeemed > 0 && (
                    <Button
                        type="button"
                        variant="ghost"
                        disabled={busy}
                        onClick={() => {
                            setPoints("")
                            onRedeem(0)
                        }}
                    >
                        Bỏ điểm
                    </Button>
                )}
            </div>

            {redeemed > 0 && (
                <p className="text-[11px] text-muted-foreground">
                    Đã dùng {redeemed} điểm (- {formatVnd(redeemed * POINT_VALUE_VND)})
                </p>
            )}
            {willEarn > 0 && (
                <p className="text-[11px] text-muted-foreground">Khách sẽ nhận +{willEarn} điểm sau khi thanh toán</p>
            )}
        </div>
    )
}
