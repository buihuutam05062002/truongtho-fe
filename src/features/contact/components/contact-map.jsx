import { Section } from "@/components/layout/section"
import { CONTACT_INFO } from "../constants"

export function ContactMap() {
  const address = CONTACT_INFO[0].value
  const query = encodeURIComponent(address)

  return (
    <Section className="pt-0 lg:pt-0">
      <div className="relative h-[360px] overflow-hidden border border-border bg-card lg:h-[400px]">
        <iframe
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          title="Bản đồ nhà hàng Trường Thọ"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />

        <div className="absolute inset-x-4 bottom-4 max-w-[340px] space-y-3 border border-border bg-background p-6 sm:inset-x-auto sm:bottom-8 sm:left-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">Nhà hàng Trường Thọ</p>
          <p className="font-serif text-[17px] leading-6 text-foreground">{address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block border-b border-border pb-1 text-[13px] text-foreground transition-colors hover:border-gold"
          >
            Chỉ đường
          </a>
        </div>
      </div>
    </Section>
  )
}   