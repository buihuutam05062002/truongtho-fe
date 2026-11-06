import {api} from "@/lib/axios";



export const tableApi = {
    getAll: () => api.get("/dining-tables"),
    create: (body) => api.post("/dining-tables", body),
    update: (id, body) => api.put(`/dining-tables/${id}`, body),
    delete: (id) => api.delete(`dining-tables/${id}`)
}