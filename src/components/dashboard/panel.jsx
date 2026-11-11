import { cn } from "@/lib/utils"

export function Panel({ title, description, action, children, className }) {
  return (
    <section className={cn("rounded-md border border-border bg-card p-5", className)}>
      {(title || action) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0 text-xs">{action}</div>}
        </header>
      )}
      {children}
    </section>
  )
}