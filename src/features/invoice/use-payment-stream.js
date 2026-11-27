import { useEffect, useRef } from "react"
import { tokenStore } from "@/lib/token"
import { refreshSession } from "@/lib/axios"

const BASE = import.meta.env.VITE_API_URL

/**
 * Server-Sent Events over fetch (EventSource cannot send the Authorization header).
 * Calls onEvent({ name, data }) for every event and reconnects with backoff if the stream drops.
 */
async function readStream(url, signal, onEvent) {
    const connect = () =>
        fetch(url, {
            headers: { Accept: "text/event-stream", Authorization: `Bearer ${tokenStore.get()}` },
            credentials: "include",
            signal,
        })

    let res = await connect()
    if (res.status === 401) {
        await refreshSession()
        res = await connect()
    }
    if (!res.ok || !res.body) throw new Error(`SSE ${res.status}`)

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
    let buffer = ""
    for (;;) {
        const { value, done } = await reader.read()
        if (done) return
        buffer += value

        let frameEnd
        while ((frameEnd = /\r?\n\r?\n/.exec(buffer))) {
            const frame = buffer.slice(0, frameEnd.index)
            buffer = buffer.slice(frameEnd.index + frameEnd[0].length)

            let name = "message"
            const data = []
            for (const line of frame.split(/\r?\n/)) {
                if (line.startsWith(":")) continue // heartbeat comment
                if (line.startsWith("event:")) name = line.slice(6).trim()
                else if (line.startsWith("data:")) data.push(line.slice(5).trimStart())
            }
            if (data.length) onEvent({ name, data: data.join("\n") })
        }
    }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function usePaymentStream(invoiceId, enabled, onEvent) {
    const handler = useRef(onEvent)
    useEffect(() => {
        handler.current = onEvent
    })

    useEffect(() => {
        if (!enabled || !invoiceId) return undefined

        const controller = new AbortController()
        const url = `${BASE}/payments/invoices/${invoiceId}/events`

        ;(async () => {
            let attempt = 0
            while (!controller.signal.aborted) {
                try {
                    await readStream(url, controller.signal, (event) => {
                        attempt = 0
                        handler.current?.(event)
                    })
                } catch {
                    /* dropped or aborted: fall through to the retry below */
                }
                if (controller.signal.aborted) return
                await sleep(Math.min(1000 * 2 ** attempt++, 15_000))
            }
        })()

        return () => controller.abort()
    }, [invoiceId, enabled])
}
