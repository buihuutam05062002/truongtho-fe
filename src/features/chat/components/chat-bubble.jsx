import { useEffect, useRef, useState } from "react"
import { MessageCircle, RotateCcw, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "../hooks"

const SUGGESTIONS = [
  "Gợi ý món cho 4 người",
  "Có món nào cay không?",
  "Giờ mở cửa của nhà hàng?",
  "Món nhẹ cho trẻ em",
]

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const { messages, loading, send, reset } = useChat()
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, open])

  const submit = (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    send(input)
    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          role="dialog"
          aria-label="Trợ lý Trường Thọ"
          className="flex h-[min(32rem,calc(100dvh-6rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
        >
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="text-sm font-semibold">Trợ lý Trường Thọ</p>
              <p className="text-xs opacity-80">Hỏi về món ăn, giờ mở cửa, đặt bàn</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={reset}
                aria-label="Cuộc trò chuyện mới"
                title="Cuộc trò chuyện mới"
                className="rounded-md p-1.5 hover:bg-white/15"
              >
                <RotateCcw className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
                className="rounded-md p-1.5 hover:bg-white/15"
              >
                <X className="size-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-sm">
                  Xin chào! Mình có thể gợi ý món ăn và giải đáp thắc mắc về nhà hàng. Bạn muốn hỏi gì ạ?
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isUser = m.role === "user"
              const typing = !isUser && !m.text && loading && i === messages.length - 1
              return (
                <div key={i} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                  <p
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm",
                      isUser
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-muted"
                    )}
                  >
                    {typing ? <span className="animate-pulse text-muted-foreground">Đang trả lời…</span> : m.text}
                  </p>
                </div>
              )
            })}
            <div ref={endRef} />
          </div>

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Nhập câu hỏi…"
              className="h-9 min-w-0 flex-1 rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Gửi"
              className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Đóng trò chuyện" : "Mở trò chuyện"}
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  )
}