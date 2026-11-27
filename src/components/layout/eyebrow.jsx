import { cn } from "@/lib/utils"

export function Eyebrow({ children, className, lineClassName }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className={cn("h-px w-6 bg-rose", lineClassName)} />
      <p
        className={cn(
          "text-[10px] font-medium uppercase tracking-[0.15em] text-gold",
          className
        )}
      >
        {children}
      </p>
    </div>
  )
}