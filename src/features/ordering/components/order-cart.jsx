import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InfoRow } from "@/components/dashboard/info-row"
import { Panel } from "@/components/dashboard/panel"
import { formatVnd } from "@/features/invoice/constants"
import { LoyaltyBox } from "./loyalty-box"

export function OrderCart({ tableName, invoice, busy, onChangeQuantity, onRemove, onPay, onAttach, onDetach, onRedeem }) {
    const details = invoice.details ?? []

    return (
        <Panel title={`Hóa đơn ${tableName}`} description={`${details.length} món`}>
            <div className="space-y-4">
                {details.length === 0 ? (
                    <p className="py-6 text-center text-xs text-muted-foreground">Chưa có món nào. Chọn món ở thực đơn để thêm</p>
                ) : (
                    <ul className="divide-y divide-border">
                        {details.map((d) => (
                            <li key={d.productId} className="flex items-center gap-3 py-2.5">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold text-foreground">{d.productName}</p>
                                    <p className="text-[11px] text-muted-foreground">{formatVnd(d.unitPrice)}</p>
                                </div>

                                <div className="flex items-center gap-1.5" role="group" aria-label={`Số lượng ${d.productName}`}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon-sm"
                                        aria-label="Giảm số lượng"
                                        disabled={busy || d.quantity <= 1}
                                        onClick={() => onChangeQuantity(d.productId, d.quantity - 1)}
                                    >
                                        <Minus />
                                    </Button>
                                    <span className="w-6 text-center text-xs font-semibold tabular-nums">{d.quantity}</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon-sm"
                                        aria-label="Tăng số lượng"
                                        disabled={busy}
                                        onClick={() => onChangeQuantity(d.productId, d.quantity + 1)}
                                    >
                                        <Plus />
                                    </Button>
                                </div>

                                <p className="w-[84px] text-right text-xs tabular-nums text-foreground">{formatVnd(d.total)}</p>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={`Xóa ${d.productName}`}
                                    disabled={busy}
                                    onClick={() => onRemove(d.productId)}
                                >
                                    <Trash2 />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}

                <LoyaltyBox
                    key={invoice.customerId ?? "none"}
                    invoice={invoice}
                    busy={busy}
                    onAttach={onAttach}
                    onDetach={onDetach}
                    onRedeem={onRedeem}
                />

                <div className="space-y-2 border-t border-border pt-4">
                    <InfoRow label="Tạm tính" value={formatVnd(invoice.subTotal)} />
                    {Number(invoice.discountAmount) > 0 && (
                        <InfoRow label="Giảm giá" value={`- ${formatVnd(invoice.discountAmount)}`} />
                    )}
                    <InfoRow
                        label="Tổng cộng"
                        value={<span className="text-base font-semibold">{formatVnd(invoice.totalAmount)}</span>}
                    />
                </div>

                <Button className="w-full" disabled={busy || details.length === 0} onClick={onPay}>
                    Thanh toán
                </Button>
            </div>
        </Panel>
    )
}
