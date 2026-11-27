import {api} from "@/lib/axios";


export const reservationApi = {
    create: (body) => api.post('/reservations', body),
    delete: (id) => api.delete(`/reservations/${id}`),
    update: (id,body) => api.put(`/reservations/${id}`, body),
    getById: (id) => api.get(`/reservations/${id}`),
    getAll: (params) => api.get("/reservations",{params}),
    mine: (params) => api.get("/reservations/me", {params}),
    updateMine: (id, body) => api.put(`/reservations/me/${id}`, body),
    cancelMine: (id) => api.patch(`/reservations/me/${id}/cancel`),
    updateStatus: (id, reservationStatus, tableId) => api.patch(`/reservations/${id}/status`, {reservationStatus, tableId})}