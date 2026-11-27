import { cn } from "@/lib/utils"


export function InfoRow({ label, value, className }) {
  return (
    <div className={cn("flex items-center justify-between gap-4 text-xs", className)}>
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  )
}
