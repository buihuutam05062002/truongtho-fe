import { api } from "@/lib/axios"

export const loyaltyApi = {
    me: () => api.get("/customers/me/loyalty"),
}
