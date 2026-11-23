import dayjs from "dayjs"
import { formatVnd, shortInvoiceId, splitDiscount } from "../constants"

const RESTAURANT = {
    name: "Nhà hàng Trường Thọ",
    address: "Địa chỉ nhà hàng",
    phone: "Số điện thoại",
}

const line = { border: 0, borderTop: "1px dashed #000", margin: "8px 0" }
const row = { display: "flex", justifyContent: "space-between" }

export function Receipt({ invoice }) {
    const paid = invoice.invoiceStatus === "PAID"
    const { voucherDiscount, pointsDiscount } = splitDiscount(invoice)

    return (
        <div
            style={{
                width: "80mm",
                margin: "0 auto",
                color: "#000",
                background: "#fff",
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
            }}
        >
            <h1 style={{ fontSize: 15, textAlign: "center", margin: 0 }}>{RESTAURANT.name}</h1>
            <div style={{ textAlign: "center" }}>{RESTAURANT.address}</div>
            <div style={{ textAlign: "center" }}>{RESTAURANT.phone}</div>

            <h2 style={{ fontSize: 13, textAlign: "center", margin: "10px 0 6px" }}>
                {paid ? "HÓA ĐƠN THANH TOÁN" : "PHIẾU TẠM TÍNH"}
            </h2>
            <div>Mã đơn: {shortInvoiceId(invoice.id)}</div>
            <div>Bàn: {invoice.tableName ?? "—"}</div>
            <div>Giờ: {dayjs(invoice.issuedAt).format("HH:mm DD/MM/YYYY")}</div>
            <div>Thu ngân: {invoice.employeeName ?? "—"}</div>
            <hr style={line} />

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left" }}>Món</th>
                        <th style={{ textAlign: "right" }}>SL</th>
                        <th style={{ textAlign: "right" }}>Giá</th>
                        <th style={{ textAlign: "right" }}>Tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {(invoice.details ?? []).map((d) => (
                        <tr key={d.productId}>
                            <td>{d.productName}</td>
                            <td style={{ textAlign: "right" }}>{d.quantity}</td>
                            <td style={{ textAlign: "right" }}>{formatVnd(d.unitPrice)}</td>
                            <td style={{ textAlign: "right" }}>{formatVnd(d.total)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr style={line} />

            <div style={row}>
                <span>Tạm tính</span>
                <span>{formatVnd(invoice.subTotal)}</span>
            </div>
            {voucherDiscount > 0 && (
                <div style={row}>
                    <span>Giảm giá{invoice.voucherCode ? ` (${invoice.voucherCode})` : ""}</span>
                    <span>- {formatVnd(voucherDiscount)}</span>
                </div>
            )}
            {pointsDiscount > 0 && (
                <div style={row}>
                    <span>Dùng {invoice.pointsRedeemed} điểm</span>
                    <span>- {formatVnd(pointsDiscount)}</span>
                </div>
            )}
            <div style={{ ...row, fontWeight: "bold", fontSize: 14, marginTop: 6 }}>
                <span>TỔNG CỘNG</span>
                <span>{formatVnd(invoice.totalAmount)}</span>
            </div>

            <hr style={line} />
            <div style={{ textAlign: "center" }}>{paid ? "Đã thanh toán" : "Chưa thanh toán"}</div>
            <div style={{ textAlign: "center" }}>Cảm ơn quý khách, hẹn gặp lại!</div>
        </div>
    )
}