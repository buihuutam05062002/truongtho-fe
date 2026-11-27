import {api} from "@/lib/axios"

export const categoryApi = {
    getAll: () => api.get("/categories"),
    create: (body) => api.post('/categories',body),
    delete: (id) => api.delete(`/categories/${id}`),
    update: (id,body) => api.put(`categories/${id}`,body),
    getByid: (id) => api.get(`categories/${id}`),
  
}

