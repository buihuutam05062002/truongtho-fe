import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badge = cva("inline-flex items-center gap-[5px] rounded-[4px] px-2 py-1 text-[10px] leading-normal", {
  variants: {
    tone: {
      success: "bg-success-bg text-success",
      warning: "bg-warning-bg text-warning",
      danger: "bg-red-500/10 text-red-700 dark:text-red-300",
      info: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
      neutral: "bg-secondary text-muted-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
})

export function StatusBadge({ tone = "neutral", children, className }) {
  return (
    <span className={cn(badge({ tone }), className)}>
      <span aria-hidden="true" className="size-[5px] shrink-0 rounded-full bg-current" />
      {children}
    </span>
  )
}
