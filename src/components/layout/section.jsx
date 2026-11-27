import { cn } from "@/lib/utils"

export function Section({ id, className, children }) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10 lg:py-24", className)}>
      {children}
    </section>
  )
}
export function SectionHeader({ eyebrow, title, action, className }) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-4",
        className
      )}
    >
      <div className="space-y-3">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        )}
        <h2 className="font-serif text-3xl text-foreground lg:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  )
}