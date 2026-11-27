import { useCallback, useEffect, useRef, useState } from "react"
import { streamChat } from "./api"

const ID_KEY = "tt-chat-id"
const MSG_KEY = "tt-chat-messages"

const FALLBACK_ERROR =
  "Xin lỗi, hệ thống đang bận. Vui lòng thử lại hoặc liên hệ nhân viên."

const read = (key) => {
  try { return sessionStorage.getItem(key) } catch { return null }
}
const write = (key, value) => {
  try { sessionStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

function getConversationId() {
  let id = read(ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    write(ID_KEY, id)
  }
  return id
}

function loadMessages() {
  try { return JSON.parse(read(MSG_KEY)) ?? [] } catch { return [] }
}


export function useChat() {
  const [messages, setMessages] = useState(loadMessages)
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)
  const idRef = useRef(null)

  useEffect(() => { idRef.current = getConversationId() }, [])
  useEffect(() => { write(MSG_KEY, JSON.stringify(messages)) }, [messages])
  useEffect(() => () => abortRef.current?.abort(), [])

  const send = useCallback(async (text) => {
    const message = text.trim().slice(0, 500) 
    if (!message || loading) return

    idRef.current ??= getConversationId()
    const controller = new AbortController()
    abortRef.current = controller

    setMessages((m) => [...m, { role: "user", text: message }, { role: "assistant", text: "" }])
    setLoading(true)

    const patchLast = (updater) =>
      setMessages((m) => {
        const copy = [...m]
        copy[copy.length - 1] = { ...copy[copy.length - 1], text: updater(copy[copy.length - 1].text) }
        return copy
      })

    try {
      for await (const chunk of streamChat({
        message,
        conversationId: idRef.current,
        signal: controller.signal,
      })) {
        patchLast((t) => t + chunk)
      }
    } catch (e) {
      if (e.name !== "AbortError") patchLast((t) => t || FALLBACK_ERROR)
    } finally {
      setLoading(false)
    }
  }, [loading])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    const id = crypto.randomUUID() 
    write(ID_KEY, id)
    setMessages([])
    setLoading(false)
  }, [])

  return { messages, loading, send, reset }
}