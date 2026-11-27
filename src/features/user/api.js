import { api } from "@/lib/axios"

export const userApi = {
    getAll: (params) => api.get("/admin/users", { params }),
    updateRoles: (id, roles) => api.put(`/admin/users/${id}/roles`, { roles }),
    updateStatus: (id, status) => api.patch(`/admin/users/${id}/status`, { status }),
}
