import { api } from "@/lib/axios"

export const productApi = {
    getAll: (params) => api.get("/products", { params }),
    getStats: () => api.get("/products/stats"),
    getById: (id) => api.get(`/products/${id}`),
    create: (body) => api.post("/products", body),
    update: (id, body) => api.put(`/products/${id}`, body),
    delete: (id) => api.delete(`/products/${id}`),
}

export const uploadApi = {
    upload: (file, type = "PRODUCT") => {
        const form = new FormData()
        form.append("file", file)
        form.append("type", type)
        return api.post("/uploads", form)
    },
}
