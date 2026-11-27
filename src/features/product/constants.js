export const PRODUCT_STATUS_LABEL = {
    ON_SALE: "Đang bán",
    AVAILABLE: "Có sẵn",
    OUT_OF_STOCK: "Hết hàng",
    SUSPENDED: "Tạm ngưng",
}

export const PRODUCT_STATUS_TONE = {
    ON_SALE: "success",
    AVAILABLE: "info",
    OUT_OF_STOCK: "danger",
    SUSPENDED: "warning",
}

export const ORDERABLE_STATUSES = ["ON_SALE", "AVAILABLE"]

export const formatPrice = (value) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value ?? 0)

export const formatCode = (id) => `#${id}`

export const MAX_IMAGES = 8
export const MAX_IMAGE_MB = 5
