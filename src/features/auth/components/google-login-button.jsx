import { useEffect, useRef, useState } from "react"
import { GoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast"
import { useOAuthLogin } from "../hooks"

export function GoogleLoginButton({ text = "continue_with" }) {
  const oauth = useOAuthLogin()
  const ref = useRef(null)
  const [width, setWidth] = useState(320)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () =>
      setWidth(Math.min(400, Math.max(200, Math.round(el.getBoundingClientRect().width))))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`w-full ${oauth.isPending ? "pointer-events-none opacity-60" : ""}`}
    >
      <GoogleLogin
        width={width}
        size="large"
        theme="outline"
        shape="rectangular"
        text={text}
        onSuccess={(res) =>
          oauth.mutate(res.credential, { onError: (err) => toast.error(err.message) })
        }
        onError={() => toast.error("Không đăng nhập được bằng Google")}
      />
    </div>
  )
}