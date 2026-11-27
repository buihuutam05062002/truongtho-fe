import { cn } from "@/lib/utils"
import { Eyebrow } from "@/components/layout/eyebrow"

export function PageHero({ image, eyebrow, title, lead, children, className }) {
  return (
    <section
      className={cn(
        "relative flex min-h-[420px] flex-col justify-end overflow-hidden lg:h-[600px]",
        className
      )}
    >
      <img
        src={image}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#131210]/45 lg:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-[#131210]/90 via-[#131210]/60 via-55% to-[#131210]/15"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl space-y-7 px-6 pb-14 pt-24 lg:px-10 lg:pb-[88px]">
        {eyebrow && (
          <Eyebrow
            className="text-[11px] tracking-[0.18em] text-[#bca27a]"
            lineClassName="bg-[#ce8d7d]"
          >
            {eyebrow}
          </Eyebrow>
        )}
        <h1 className="font-serif text-4xl leading-[1.2] text-[#f2e9dc] sm:text-5xl lg:text-[70px] lg:leading-[88px]">
          {title}
        </h1>
        {lead && (
          <p className="max-w-[480px] text-[15px] leading-[27px] text-[#b7aa9b]">{lead}</p>
        )}
        {children}
      </div>
    </section>
  )
}