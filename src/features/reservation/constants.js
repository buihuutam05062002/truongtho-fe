export const STATUS_LABEL = {
    PENDING: "Chờ xác nhận",
    CONFIRM: "Chấp nhận",   
    ARRIVED: "Đã đến",
    COMPLETED: "Đã hoàn thành",
    CANCELLED: "Đã hủy",
    NO_SHOW: "Không đến",
}

export const NEXT_ACTIONS = {
    PENDING: [
        { status: "CONFIRM", label: "Xác nhận" },
        { status: "CANCELLED", label: "Hủy" },
    ],
    CONFIRM: [
        { status: "ARRIVED", label: "Khách đã đến" },
        { status: "NO_SHOW", label: "Không đến" },
        { status: "CANCELLED", label: "Hủy" },
    ],
    ARRIVED: [
        { status: "COMPLETED", label: "Hoàn thành" },
    ],
}