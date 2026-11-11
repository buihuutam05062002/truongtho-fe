import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badge = cva("inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[11px]", {
  variants: {
    tone: {
      success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
      danger: "bg-red-500/10 text-red-700 dark:text-red-300",
      info: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
      neutral: "bg-secondary text-muted-foreground",
    },
  },
  defaultVariants: { tone: "neutral" },
})

const dot = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-sky-500",
  neutral: "bg-subtle",
}

export function StatusBadge({ tone = "neutral", children, className }) {
  return (
    <span className={cn(badge({ tone }), className)}>
      <span className={cn("size-[5px] rounded-full", dot[tone])} />
      {children}
    </span>
  )
}