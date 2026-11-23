import { api } from "@/lib/axios"

export const employeeApi = {
    getAll: (params) => api.get("/admin/employees", { params }),
    getStats: () => api.get("/admin/employees/stats"),
    create: (body) => api.post("/admin/employees", body),
    update: (id, body) => api.put(`/admin/employees/${id}`, body),
    getById: (id) => api.get(`/admin/employees/${id}`),
    remove: (id) => api.delete(`/admin/employees/${id}`),
    resetPassword: (id) => api.post(`/admin/employees/${id}/reset-password`),
}
