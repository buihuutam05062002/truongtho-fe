import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useInvoice } from "../hooks"
import { Receipt } from "../components/receipt-print"

export default function ReceiptPage() {
    const { id } = useParams()
    const { data: invoice, isError, error } = useInvoice(id)

    useEffect(() => {
        if (!invoice) return
        const t = setTimeout(() => window.print(), 300)
        return () => clearTimeout(t)
    }, [invoice])

    if (isError) return <p style={{ padding: 16 }}>{error.message}</p>
    if (!invoice) return <p style={{ padding: 16 }}>Đang tải hóa đơn...</p>

    return (
        <div style={{ background: "#fff", minHeight: "100vh", padding: 16 }}>
            <Receipt invoice={invoice} />
        </div>
    )
}