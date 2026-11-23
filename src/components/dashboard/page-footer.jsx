import { cn } from "@/lib/utils"

export function PageFooter({ note, className }) {
  return (
    <footer className={cn("flex flex-wrap items-start justify-between gap-2 pt-1.5", className)}>
      <p className="font-serif text-xs text-gold">Tinh tế trong phục vụ. Vững vàng trong vận hành.</p>
      {note && <p className="text-[10px] text-subtle">{note}</p>}
    </footer>
  )
}
