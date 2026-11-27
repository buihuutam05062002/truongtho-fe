import { api } from "@/lib/axios"

export const menuApi = {
    getMenu: (params) => api.get("/products/menu", { params }),
}
