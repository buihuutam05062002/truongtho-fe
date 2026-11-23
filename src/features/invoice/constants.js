import { POINT_VALUE_VND } from "@/features/loyalty/constants"
export const INVOICE_STATUS = {
    PENDING: { label: "Chờ thanh toán", tone: "warning" },
    PAID: { label: "Đã thanh toán", tone: "success" },
    CANCELLED: { label: "Đã hủy", tone: "danger" },
}

export const formatVnd = (n) =>
    `${new Intl.NumberFormat("vi-VN").format(Math.round(Number(n) || 0))} ₫`

export const shortInvoiceId = (id = "") => `#${id.slice(0, 6).toUpperCase()}`

export const splitDiscount = (invoice) => {
    const total = Number(invoice?.discountAmount) || 0
    const points = (invoice?.pointsRedeemed ?? 0) * POINT_VALUE_VND
    return { pointsDiscount: points, voucherDiscount: Math.max(0, total - points) }
}
