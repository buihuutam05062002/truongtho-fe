import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function TempPasswordDialog({ open, title, description, username, password, onClose }) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(password)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            /* trình duyệt chặn clipboard: người dùng tự chép */
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent title={title} description={description} className="max-w-sm">
                <div className="space-y-4">
                    {username && (
                        <p className="text-xs text-muted-foreground">
                            Email đăng nhập: <span className="text-foreground">{username}</span>
                        </p>
                    )}
                    <div className="flex items-center gap-2 rounded-md border border-border bg-background p-3">
                        <code className="flex-1 select-all text-sm font-semibold tracking-wider text-foreground">
                            {password}
                        </code>
                        <Button type="button" size="sm" variant="outline" onClick={copy}>
                            {copied ? <Check /> : <Copy />}
                            {copied ? "Đã chép" : "Sao chép"}
                        </Button>
                    </div>
                    <p className="rounded-sm bg-amber-500/10 p-3 text-[11px] text-amber-700 dark:text-[#d8b775]">
                        Mật khẩu này chỉ hiển thị một lần. Hãy gửi cho nhân viên và nhắc đổi mật khẩu (biểu tượng chìa khóa ở góc dưới thanh bên) sau khi đăng nhập.
                    </p>
                    <div className="flex justify-end">
                        <Button onClick={onClose}>Đã lưu lại</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
