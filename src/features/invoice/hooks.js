import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { invoiceApi } from "./api"

export const useInvoices = (params) =>
    useQuery({
        queryKey: ["invoices", params],
        queryFn: () => invoiceApi.search(params),
        placeholderData: keepPreviousData,
    })

export const useMyInvoices = () =>
    useQuery({
        queryKey: ["invoices", "mine"],
        queryFn: () => invoiceApi.mine(),
        refetchInterval: 30_000,
    })

export const useInvoice = (id, { refetchInterval = false } = {}) =>
    useQuery({
        queryKey: ["invoice", id],
        queryFn: () => invoiceApi.getById(id),
        enabled: !!id,
        refetchInterval,
    })

export const useTableInvoice = (tableId) =>
    useQuery({
        queryKey: ["invoice-by-table", tableId],
        queryFn: () => invoiceApi.getOpenByTable(tableId),
        enabled: tableId != null,
        retry: false,
        gcTime: 0,
    })

function useRefresh() {
    const qc = useQueryClient()
    return () => {
        for (const key of ["invoices", "invoice", "tables", "dashboard"]) {
            qc.invalidateQueries({ queryKey: [key] })
        }
        qc.removeQueries({ queryKey: ["invoice-by-table"] })
    }
}

export const useCancelInvoice = () => {
    const refresh = useRefresh()
    return useMutation({
        mutationFn: invoiceApi.cancel,
        onSuccess: () => {
            refresh()
            toast.success("Đã hủy hóa đơn")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const usePayCash = () => {
    const refresh = useRefresh()
    return useMutation({
        mutationFn: async (invoiceId) => {
            const payment = await invoiceApi.createPayment(invoiceId, "CASH")
            return invoiceApi.confirmPayment(payment.id)
        },
        onSuccess: () => {
            refresh()
            toast.success("Đã ghi nhận thanh toán tiền mặt")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useCreateQr = () =>
    useMutation({
        mutationFn: invoiceApi.createSePay,
        onError: (err) => toast.error(err.message),
    })


export const useCreateInvoice = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (tableId) => invoiceApi.create(tableId),
        onSuccess: (invoice, tableId) => {
            qc.setQueryData(["invoice-by-table", tableId], invoice)
            qc.setQueryData(["invoice", invoice.id], invoice)
            qc.invalidateQueries({ queryKey: ["tables"] })
            toast.success("Đã mở bàn")
        },
        onError: (err) => toast.error(err.message),
    })
}

function useInvoiceMutation(mutationFn) {
    const qc = useQueryClient()
    return useMutation({
        mutationFn,
        onSuccess: (invoice) => qc.setQueryData(["invoice", invoice.id], invoice),
        onError: (err) => toast.error(err.message),
    })
}

export const useAddDetail = () =>
    useInvoiceMutation(({ invoiceId, productId, quantity = 1 }) =>
        invoiceApi.addDetail(invoiceId, { productId, quantity })
    )

export const useUpdateDetail = () =>
    useInvoiceMutation(({ invoiceId, productId, quantity }) =>
        invoiceApi.updateDetail(invoiceId, productId, quantity)
    )

export const useRemoveDetail = () =>
    useInvoiceMutation(({ invoiceId, productId }) => invoiceApi.removeDetail(invoiceId, productId))

export const useMoveTable = () => {
    const refresh = useRefresh()
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ invoiceId, toTableId }) => invoiceApi.moveTable(invoiceId, toTableId),
        onSuccess: (invoice) => {
            refresh()
            qc.setQueryData(["invoice", invoice.id], invoice)
            toast.success("Đã chuyển bàn")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useMergeTable = () => {
    const refresh = useRefresh()
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ invoiceId, fromTableId }) => invoiceApi.mergeTable(invoiceId, fromTableId),
        onSuccess: (invoice) => {
            refresh()
            qc.setQueryData(["invoice", invoice.id], invoice)
            toast.success("Đã gộp bàn")
        },
        onError: (err) => toast.error(err.message),
    })
}

export const useAttachCustomer = () =>
    useInvoiceMutation(({ invoiceId, keyword }) => invoiceApi.attachCustomer(invoiceId, keyword))

export const useDetachCustomer = () =>
    useInvoiceMutation(({ invoiceId }) => invoiceApi.detachCustomer(invoiceId))

export const useRedeemPoints = () =>
    useInvoiceMutation(({ invoiceId, points }) => invoiceApi.redeemPoints(invoiceId, points))

export const useApplyVoucher = () =>
    useInvoiceMutation(({ invoiceId, code }) => invoiceApi.applyVoucher(invoiceId, code))

export const useRemoveVoucher = () =>
    useInvoiceMutation(({ invoiceId }) => invoiceApi.removeVoucher(invoiceId))
