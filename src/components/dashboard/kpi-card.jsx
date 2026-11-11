import { cn } from "@/lib/utils"

export function KpiCard({ label, value, note, className }) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-md border border-border bg-card p-4", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-[27px] font-semibold leading-none text-foreground">{value}</p>
      {note && <p className="text-[10px] text-subtle">{note}</p>}
    </div>
  )
}