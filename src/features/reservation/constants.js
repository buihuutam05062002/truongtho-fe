export const STATUS_LABEL = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Chấp nhận",   
    ARRIVED: "Đã đến",
    COMPLETED: "Đã hoàn thành",
    CANCELLED: "Đã hủy",
    NO_SHOW: "Không đến",
}

export const NEXT_ACTIONS = {
    PENDING: [
        { status: "CONFIRMED", label: "Xác nhận" },
        { status: "CANCELLED", label: "Hủy" },
    ],
    CONFIRMED: [
        { status: "ARRIVED", label: "Khách đã đến" },
        { status: "NO_SHOW", label: "Không đến" },
        { status: "CANCELLED", label: "Hủy" },
    ],
    ARRIVED: [
        { status: "COMPLETED", label: "Hoàn thành" },
        { status: "CANCELLED", label: "Khách rời đi" },

    ],
}

export const STATUS_TONE = {
    PENDING: "warning",
    CONFIRMED: "info",
    ARRIVED: "info",
    COMPLETED: "success",
    CANCELLED: "danger",
    NO_SHOW: "neutral",
}

export const CUSTOMER_EDITABLE = ["PENDING", "CONFIRMED"]
