import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Dialog(props) {
  return <DialogPrimitive.Root {...props} />
}

function DialogContent({ title, description, className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
      />
      <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center">
        <DialogPrimitive.Popup
          className={cn(
            "relative my-auto w-full max-w-lg rounded-lg border border-border bg-card p-6 text-card-foreground shadow-lg outline-none",
            "transition-all duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className
          )}
          {...props}
        >
          <DialogPrimitive.Close
            render={<Button variant="ghost" size="icon-sm" aria-label="Đóng" className="absolute right-3 top-3" />}
          >
            <X />
          </DialogPrimitive.Close>

          <header className="mb-5 space-y-1.5 pr-8">
            <DialogPrimitive.Title className="text-lg font-semibold">{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="text-xs text-muted-foreground">
                {description}
              </DialogPrimitive.Description>
            )}
          </header>

          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  )
}

export { Dialog, DialogContent }
