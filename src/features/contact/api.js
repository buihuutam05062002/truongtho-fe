import { api } from "@/lib/axios"

export const contactApi = {
  send: (body) => api.post("/contacts", body),
}