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

      </div>
    </Section>
  )
}   