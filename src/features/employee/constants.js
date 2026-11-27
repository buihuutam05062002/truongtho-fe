export const EMPLOYEE_STATUS_LABEL = {
    ACTIVE: "Hoạt động",
    ON_LEAVE: "Nghỉ phép",
    SUSPENDED: "Ngưng",
    RESIGNED: "Đã nghỉ việc",
}

export const EMPLOYEE_STATUS_TONE = {
    ACTIVE: "success",
    ON_LEAVE: "warning",
    SUSPENDED: "danger",
    RESIGNED: "neutral",
}

export const LOCKING_STATUSES = ["SUSPENDED", "RESIGNED"]

export const formatDate = (iso) => {
    if (!iso) return "—"
    const [y, m, d] = iso.split("-")
    return `${d}/${m}/${y}`
}

export const todayIso = () => {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const tenure = (iso) => {
    if (!iso) return "—"
    const start = new Date(iso)
    const now = new Date()
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
    if (now.getDate() < start.getDate()) months -= 1
    if (months < 1) return "Dưới 1 tháng"
    const years = Math.floor(months / 12)
    const rest = months % 12
    return [years && `${years} năm`, rest && `${rest} tháng`].filter(Boolean).join(" ")
}

export const initials = (name = "") =>
    name
        .trim()
        .split(/\s+/)
        .slice(-2)
        .map((w) => w[0]?.toUpperCase())
        .join("")
