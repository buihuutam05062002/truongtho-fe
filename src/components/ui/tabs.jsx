import { cn } from "@/lib/utils"

/**
 * Tabs điều khiển ngoài: <Tabs tabs={[{value,label}]} value onChange />
 * Figma: tab px-14 py-11, chữ 12px, viền dưới 2px; tab chọn: viền primary + chữ rose + semibold
 */
export function Tabs({ tabs, value, onChange, label = "Chế độ xem", className }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("flex gap-1.5 border-b border-border", className)}
    >
      {tabs.map((tab) => {
        const active = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cn(
              "border-b-2 px-3.5 py-[11px] text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
              active
                ? "border-primary font-semibold text-rose"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
