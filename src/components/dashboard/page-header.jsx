import { cn } from "@/lib/utils"

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4", className)}>
      <div className="min-w-0 space-y-2">
        <h1 className="text-2xl font-semibold text-foreground lg:text-[27px]">{title}</h1>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}