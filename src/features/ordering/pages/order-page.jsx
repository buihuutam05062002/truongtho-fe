import { useState } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Panel } from "@/components/dashboard/panel"
import { Button } from "@/components/ui/button"
import { useTables } from "@/features/table/hook"
import { InvoiceDetailDialog } from "@/features/invoice/components/invoice-detail-dialog"
import {
    useAddDetail,
    useAttachCustomer,
    useCreateInvoice,
    useDetachCustomer,
    useInvoice,
    useMergeTable,
    useMoveTable,
    useRedeemPoints,
    useRemoveDetail,
    useTableInvoice,
    useUpdateDetail,
} from "@/features/invoice/hooks"
import { TablePicker } from "../components/table-picker"
import { MenuPanel } from "../components/menu-panel"
import { OrderCart } from "../components/order-cart"
import { TransferTableDialog } from "../components/transfer-table-dialog"
export default function OrderPage() {
    const tablesQuery = useTables()
    const [tableId, setTableId] = useState(null)
    const [payingId, setPayingId] = useState(null)
    const [action, setAction] = useState(null) 
    const tables = Array.isArray(tablesQuery.data) ? tablesQuery.data : []
    const table = tables.find((t) => t.id === tableId) ?? null
    const serving = table?.tableStatus === "SERVING"

    const openInvoice = useTableInvoice(serving ? table.id : null)
    const invoiceId = openInvoice.data?.id ?? null
    const invoiceQuery = useInvoice(invoiceId)
    const invoice = invoiceQuery.data ?? openInvoice.data ?? null

    const createInvoice = useCreateInvoice()
    const addDetail = useAddDetail()
    const updateDetail = useUpdateDetail()
    const removeDetail = useRemoveDetail()

    const attachCustomer = useAttachCustomer()
    const detachCustomer = useDetachCustomer()
    const redeemPoints = useRedeemPoints()
    const moveTable = useMoveTable()
    const mergeTable = useMergeTable()

    const handleTransfer = (otherTableId) => {
        if (action === "move") {
            moveTable.mutate(
                { invoiceId: invoice.id, toTableId: otherTableId },
                { onSuccess: () => { setTableId(otherTableId); setAction(null) } }
            )
        } else {
            mergeTable.mutate(
                { invoiceId: invoice.id, fromTableId: otherTableId },
                { onSuccess: () => setAction(null) }
            )
        }
    }
    const busy =
        addDetail.isPending ||
        updateDetail.isPending ||
        removeDetail.isPending ||
        attachCustomer.isPending ||
        detachCustomer.isPending ||
        redeemPoints.isPending

    return (
        <main className="space-y-6 p-4 lg:p-8">
            <PageHeader
                title="Gọi món"
                description="Chọn bàn, thêm món vào hóa đơn rồi thanh toán"
            />

            <Panel
                title="Chọn bàn"
                description="Bàn trống để mở bàn mới, bàn đang phục vụ để gọi thêm món"
            >
                {tablesQuery.isLoading && (
                    <p className="py-4 text-center text-xs text-muted-foreground">Đang tải...</p>
                )}
                {tablesQuery.isError && (
                    <p role="alert" className="py-4 text-center text-xs text-destructive">
                        {tablesQuery.error.message}
                    </p>
                )}
                {tablesQuery.data && <TablePicker tables={tables} selectedId={tableId} onSelect={setTableId} />}
            </Panel>

            {!table && (
                <p className="py-6 text-center text-xs text-muted-foreground">Chọn một bàn để bắt đầu gọi món</p>
            )}

            {table && !serving && (
                <Panel title={`${table.name} đang trống`} description={`${table.capacity} chỗ`}>
                    <Button disabled={createInvoice.isPending} onClick={() => createInvoice.mutate(table.id)}>
                        Mở bàn và gọi món
                    </Button>
                </Panel>
            )}

            {table && serving && openInvoice.isLoading && (
                <p className="py-6 text-center text-xs text-muted-foreground">Đang tải hóa đơn...</p>
            )}
            {table && serving && openInvoice.isError && (
                <p role="alert" className="py-6 text-center text-xs text-destructive">
                    {openInvoice.error.message}
                </p>
            )}
            {table && serving && invoice && (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setAction("move")}>
                        Chuyển bàn
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setAction("merge")}>
                        Gộp bàn
                    </Button>
                </div>
            )}
            {table && serving && invoice && (
                <div className="grid gap-6 xl:grid-cols-[1fr_400px]">
                    <MenuPanel
                        busy={busy}
                        onAdd={(product) => addDetail.mutate({ invoiceId: invoice.id, productId: product.id })}
                    />
                    <OrderCart
                        tableName={table.name}
                        invoice={invoice}
                        busy={busy}
                        onChangeQuantity={(productId, quantity) =>
                            updateDetail.mutate({ invoiceId: invoice.id, productId, quantity })
                        }
                        onRemove={(productId) => removeDetail.mutate({ invoiceId: invoice.id, productId })}
                        onPay={() => setPayingId(invoice.id)}
                        onAttach={(keyword) => attachCustomer.mutate({ invoiceId: invoice.id, keyword })}
                        onDetach={() => detachCustomer.mutate({ invoiceId: invoice.id })}
                        onRedeem={(points) => redeemPoints.mutate({ invoiceId: invoice.id, points })}
                    />
                </div>
            )}
            {action && invoice && table && (
                <TransferTableDialog
                    key={action}
                    mode={action}
                    tables={tables}
                    currentTableId={table.id}
                    pending={moveTable.isPending || mergeTable.isPending}
                    onClose={() => setAction(null)}
                    onConfirm={handleTransfer}
                />
            )}
            {payingId && (
                <InvoiceDetailDialog key={payingId} invoiceId={payingId} onClose={() => setPayingId(null)} />
            )}
        </main>
    )
}
