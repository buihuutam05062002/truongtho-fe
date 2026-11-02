import {api} from "@/lib/axios";


export const reservationApi = {
    create: (body) => api.post('/reservations', body),
    delete: (id) => api.delete(`/reservations/${id}`),
    update: (id,body) => api.put(`/reservations/${id}`, body),
    getById: (id) => api.get(`/reservations/${id}`),
    getAll: (param) => api.get("/reservations",{param}),
    updateStatus: (id, reservationStatus) => api.patch(`/reservations/${id}/status`, {reservationStatus})
}