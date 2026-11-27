import { Info } from "lucide-react"
import { cn } from "@/lib/utils"


export function Notice({ children, className }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2 rounded-[4px] bg-warning-bg p-3 text-[11px] leading-normal text-warning",
        className
      )}
    >
      <Info className="mt-px size-3.5 shrink-0" aria-hidden="true" />
      <p className="min-w-0 flex-1">{children}</p>
    </div>
  )
}
