import { api } from "@/lib/axios"

const BASE = import.meta.env.VITE_API_URL

export const chatApi = {
  ask: (body) => api.post("/chat", body),
}


export async function* streamChat({ message, conversationId, signal }) {
  const res = await fetch(`${BASE}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ message, conversationId }),
    signal,
  })

  if (!res.ok || !res.body) {
    const err = new Error("CHAT_HTTP_ERROR")
    err.status = res.status
    throw err
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n")

    let idx
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const event = buffer.slice(0, idx)
      buffer = buffer.slice(idx + 2)
      const text = event
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5))
        .join("\n")
      if (text) yield text
    }
  }
}