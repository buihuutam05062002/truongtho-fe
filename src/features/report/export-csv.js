const RESERVATION_LABEL = {
    PENDING: "Chờ xác nhận",
    CONFIRMED: "Đã xác nhận",
    ARRIVED: "Đã đến",
    COMPLETED: "Hoàn thành",
    CANCELLED: "Đã hủy",
    NO_SHOW: "Không đến",
}

const cell = (v) => {
    const s = String(v ?? "")
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const line = (arr) => arr.map(cell).join(",")

export function exportReportCsv(data) {
    const rows = [
        ["BÁO CÁO DOANH THU", `${data.from} đến ${data.to}`],
        [],
        ["TỔNG QUAN"],
        ["Doanh thu", data.summary.revenue],
        ["Đơn đã thanh toán", data.summary.paidOrders],
        ["Giá trị trung bình / đơn", data.summary.averageOrderValue],
        ["Tổng lượt đặt bàn", data.summary.totalReservations],
        [],
        ["DOANH THU THEO NGÀY"],
        ["Ngày", "Doanh thu", "Số đơn"],
        ...data.daily.map((d) => [d.date, d.revenue, d.orders]),
        [],
        ["MÓN BÁN CHẠY"],
        ["Món", "Đã bán", "Doanh thu"],
        ...data.topProducts.map((p) => [p.name, p.quantity, p.revenue]),
        [],
        ["NHÂN VIÊN"],
        ["Nhân viên", "Số đơn", "Doanh thu"],
        ...data.byEmployee.map((e) => [e.fullName, e.orders, e.revenue]),
        [],
        ["ĐẶT BÀN THEO TRẠNG THÁI"],
        ["Trạng thái", "Số lượt"],
        ...data.reservations.map((r) => [RESERVATION_LABEL[r.status] ?? r.status, r.count]),
    ]

    const csv = "\uFEFF" + "sep=,\r\n" + rows.map(line).join("\r\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const a = document.createElement("a")
    a.href = url
    a.download = `bao-cao_${data.from}_${data.to}.csv`
    a.click()
    URL.revokeObjectURL(url)
}