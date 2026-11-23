import { api } from "@/lib/axios"

export const invoiceApi = {
    search: (params) => api.get("/invoices", { params }),
    mine: () => api.get("/invoices/mine"),
    getById: (id) => api.get(`/invoices/${id}`),
    getOpenByTable: (tableId) => api.get(`/invoices/tables/${tableId}/current`),
    cancel: (id) => api.post(`/invoices/${id}/cancel`),

    create: (tableId) => api.post("/invoices", null, { params: { tableId } }),

    addDetail: (id, body) => api.post(`/invoices/${id}/details`, body),
    updateDetail: (id, productId, quantity) =>
        api.put(`/invoices/${id}/details/${productId}`, null, { params: { quantity } }),
    removeDetail: (id, productId) => api.delete(`/invoices/${id}/details/${productId}`),

    createPayment: (invoiceId, paymentMethod) =>
        api.post(`/payments/invoices/${invoiceId}`, { paymentMethod }),
    confirmPayment: (paymentId) => api.post(`/payments/${paymentId}/confirm`),

    createSePay: (invoiceId) => api.post(`/invoices/${invoiceId}/payments/sepay`),

    moveTable: (id, toTableId) => api.post(`/invoices/${id}/move-table`, null, { params: { toTableId } }),
    mergeTable: (id, fromTableId) => api.post(`/invoices/${id}/merge-table`, null, { params: { fromTableId } }),

    applyVoucher: (id, code) => api.put(`/invoices/${id}/voucher`, { code }),
    removeVoucher: (id) => api.delete(`/invoices/${id}/voucher`),

    attachCustomer: (id, keyword) => api.put(`/invoices/${id}/customer`, { keyword }),
    detachCustomer: (id) => api.delete(`/invoices/${id}/customer`),
    redeemPoints: (id, points) => api.put(`/invoices/${id}/points`, { points }),
}
