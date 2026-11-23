import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Select native, cao 38px theo Figma (nền `background`, viền `input`, radius 6, chữ 12px).
 * iconSide="start": mũi tên đứng trước chữ (nút lọc "Tất cả vai trò" trong Figma).
 */
export function Select({ className, iconSide = "end", children, ...props }) {
  return (
    <div className={cn("relative", className)}>
      <select
        data-slot="select"
        className={cn(
          "h-[38px] w-full appearance-none rounded-lg border border-input bg-background text-xs text-foreground outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50",
          "aria-invalid:border-destructive",
          iconSide === "start" ? "pl-9 pr-3.5 font-semibold" : "pl-2.5 pr-8"
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 size-[15px] -translate-y-1/2 text-muted-foreground",
          iconSide === "start" ? "left-3" : "right-2.5"
        )}
      />
    </div>
  )
}
