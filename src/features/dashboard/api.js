import { api } from "@/lib/axios"

export const dashboardApi = {
    get: (params) => api.get("/admin/dashboard", { params }),
}
