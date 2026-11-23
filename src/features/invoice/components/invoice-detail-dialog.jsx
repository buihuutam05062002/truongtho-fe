import { useState } from "react"
import dayjs from "dayjs"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog"
import { DataTable } from "@/components/dashboard/data-table"
import { InfoRow } from "@/components/dashboard/info-row"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { INVOICE_STATUS, formatVnd, shortInvoiceId, splitDiscount } from "../constants"
import {
    useApplyVoucher,
    useCancelInvoice,
    useCreateQr,
    useInvoice,
    usePayCash,
    useRemoveVoucher,
} from "../hooks"
import { VoucherBox } from "./voucher-box"

const detailColumns = [
    { key: "productName", header: "Món" },
    { key: "quantity", header: "SL", align: "right", className: "w-[56px]" },
    { key: "unitPrice", header: "Đơn giá", align: "right", cell: (d) => formatVnd(d.unitPrice) },
    { key: "total", header: "Thành tiền", align: "right", cell: (d) => formatVnd(d.total) },
]

export function InvoiceDetailDialog({ invoiceId, onClose }) {
    const qc = useQueryClient()
    const [qrUrl, setQrUrl] = useState(null)
    const [confirmCancel, setConfirmCancel] = useState(false)

    const { data: invoice, isLoading, isError, error } = useInvoice(invoiceId, {
        refetchInterval: qrUrl ? 3000 : false,
    })
    const payCash = usePayCash()
    const createQr = useCreateQr()
    const cancel = useCancelInvoice()
    const applyVoucher = useApplyVoucher()
    const removeVoucher = useRemoveVoucher()

    const isPending = invoice?.invoiceStatus === "PENDING"
    const canPay = isPending && Number(invoice?.totalAmount) > 0
    const busy =
        payCash.isPending ||
        createQr.isPending ||
        cancel.isPending ||
        applyVoucher.isPending ||
        removeVoucher.isPending
    const { voucherDiscount, pointsDiscount } = splitDiscount(invoice)
    const status = INVOICE_STATUS[invoice?.invoiceStatus]

    const handleClose = () => {
        for (const key of ["invoices", "tables", "dashboard"]) {
            qc.invalidateQueries({ queryKey: [key] })
        }
        qc.removeQueries({ queryKey: ["invoice-by-table"] })
        onClose()
    }

    const handleQr = () =>
        createQr.mutate(invoiceId, {
            onSuccess: (payment) => setQrUrl(payment.qrUrl ?? payment.QrUrl ?? null),
        })

    const handleApplyVoucher = (code, done) =>
        applyVoucher.mutate({ invoiceId, code }, { onSuccess: () => { setQrUrl(null); done() } })

    const handleRemoveVoucher = () =>
        removeVoucher.mutate({ invoiceId }, { onSuccess: () => setQrUrl(null) })

    const handleCancel = () =>
        cancel.mutate(invoiceId, { onSuccess: () => setConfirmCancel(false) })

    return (
        <>
            <Dialog open onOpenChange={(open) => !open && handleClose()}>
                <DialogContent
                    title={`Hóa đơn ${shortInvoiceId(invoiceId)}`}
                    description={invoice ? `Bàn ${invoice.tableName ?? "—"}` : undefined}
                    className="max-w-xl"
                >
                    {isLoading && (
                        <p className="py-6 text-center text-xs text-muted-foreground">Đang tải...</p>
                    )}
                    {isError && (
                        <p role="alert" className="py-6 text-center text-xs text-destructive">
                            {error.message}
                        </p>
                    )}

                    {invoice && (
                        <div className="space-y-5">
                            <div className="space-y-2.5">
                                <InfoRow
                                    label="Trạng thái"
                                    value={<StatusBadge tone={status?.tone}>{status?.label ?? invoice.invoiceStatus}</StatusBadge>}
                                />
                                <InfoRow label="Phụ trách" value={invoice.employeeName ?? "—"} />
                                <InfoRow label="Giờ tạo" value={dayjs(invoice.issuedAt).format("HH:mm · DD/MM/YYYY")} />
                            </div>

                            {isPending && (
                                <VoucherBox
                                    key={invoice.voucherCode ?? "none"}
                                    invoice={invoice}
                                    busy={busy}
                                    onApply={handleApplyVoucher}
                                    onRemove={handleRemoveVoucher}
                                />
                            )}

                            <DataTable
                                columns={detailColumns}
                                rows={invoice.details ?? []}
                                getRowKey={(d) => d.productId}
                                empty="Chưa có món nào trong hóa đơn"
                            />

                            <div className="space-y-2 border-t border-border pt-4">
                                <InfoRow label="Tạm tính" value={formatVnd(invoice.subTotal)} />
                                {voucherDiscount > 0 && (
                                    <InfoRow label={`Mã ${invoice.voucherCode ?? ""}`} value={`- ${formatVnd(voucherDiscount)}`} />
                                )}
                                {pointsDiscount > 0 && (
                                    <InfoRow label={`Dùng ${invoice.pointsRedeemed} điểm`} value={`- ${formatVnd(pointsDiscount)}`} />
                                )}
                                <InfoRow
                                    label="Tổng cộng"
                                    value={<span className="text-base font-semibold">{formatVnd(invoice.totalAmount)}</span>}
                                />
                            </div>

                            {invoice.invoiceStatus === "PAID" && (
                                <p role="status" className="rounded-[4px] bg-success-bg p-3 text-[11px] text-success">
                                    Hóa đơn đã được thanh toán.
                                </p>
                            )}

                            {invoice.invoiceStatus !== "CANCELLED" && (
                                <div className="flex justify-end">
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(`/print/invoice/${invoiceId}`, "_blank")}
                                    >
                                        In hóa đơn / Lưu PDF
                                    </Button>
                                </div>
                            )}

                            {isPending && qrUrl && (
                                <div className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
                                    <img src={qrUrl} alt="Mã QR thanh toán" className="size-48 rounded bg-white p-2" />
                                    <p className="text-[11px] text-muted-foreground">
                                        Đang chờ khách chuyển khoản. Trang sẽ tự cập nhật khi nhận được tiền.
                                    </p>
                                </div>
                            )}

                            {isPending && (
                                <div className="flex flex-wrap justify-end gap-2">
                                    <Button variant="outline" disabled={busy} onClick={() => setConfirmCancel(true)}>
                                        Hủy đơn
                                    </Button>
                                    <Button variant="outline" disabled={busy || !canPay} onClick={handleQr}>
                                        {qrUrl ? "Tạo lại mã QR" : "Thanh toán QR"}
                                    </Button>
                                    <Button disabled={busy || !canPay} onClick={() => payCash.mutate(invoiceId)}>
                                        Thu tiền mặt
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={confirmCancel}
                title="Hủy hóa đơn này?"
                description="Hóa đơn sẽ chuyển sang trạng thái đã hủy và không thể thanh toán nữa."
                confirmLabel="Hủy đơn"
                pending={cancel.isPending}
                onConfirm={handleCancel}
                onCancel={() => setConfirmCancel(false)}
            />
        </>
    )
}