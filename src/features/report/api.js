import { api } from "@/lib/axios"

export const reportApi = {
    get: (params) => api.get("/admin/reports", { params }),
}
