import { Eyebrow } from "@/components/layout/eyebrow"
import { CONTACT_INFO, OPENING_HOURS } from "../constants"

const labelClass = "text-[11px] font-medium uppercase tracking-[0.18em] text-gold"

export function ContactInfo() {
  return (
    <div>
      <Eyebrow className="text-[11px] tracking-[0.18em]">Ghé thăm &amp; kết nối</Eyebrow>
      <h2 className="mt-6 font-serif text-4xl leading-[1.3] text-foreground lg:text-[44px] lg:leading-[57px]">
        Ghé thăm,
        <br />
        hoặc nhắn cho chúng tôi.
      </h2>

      <dl className="mt-10 lg:mt-14">
        {CONTACT_INFO.map(({ label, value, note, href }) => (
          <div key={label} className="space-y-2 border-t border-border py-5">
            <dt className={labelClass}>{label}</dt>
            <dd className="space-y-1">
              {href ? (
                <a href={href} className="font-serif text-xl text-foreground hover:text-gold">{value}</a>
              ) : (
                <p className="font-serif text-xl text-foreground">{value}</p>
              )}
              {note && <p className="text-[11px] text-subtle">{note}</p>}
            </dd>
          </div>
        ))}

        <div className="space-y-2 border-y border-border py-5">
          <dt className={labelClass}>Giờ đón khách dự kiến</dt>
          <dd className="space-y-1.5 text-[13px]">
            <p className="text-foreground">{OPENING_HOURS.days}</p>
            {OPENING_HOURS.slots.map((s) => (
              <p key={s} className="text-muted-foreground">{s}</p>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  )
}