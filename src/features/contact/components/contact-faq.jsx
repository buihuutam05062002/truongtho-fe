import { Section } from "@/components/layout/section"
import { Eyebrow } from "@/components/layout/eyebrow"
import { FAQS } from "../constants"

export function ContactFaq() {
  return (
    <div className="bg-card">
      <Section className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="space-y-6">
          <Eyebrow className="text-[11px] tracking-[0.18em]">Câu hỏi thường gặp</Eyebrow>
          <h2 className="font-serif text-4xl leading-[1.3] text-foreground lg:text-[44px] lg:leading-[57px]">
            Những điều
            <br />
            bạn có thể hỏi.
          </h2>
          <p className="max-w-[370px] text-sm leading-[26px] text-muted-foreground">
            Chưa thấy câu trả lời? Hãy nhắn cho chúng tôi, mọi thắc mắc đều được đón nhận.
          </p>
        </div>

        <dl className="border-t border-border">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="space-y-2 border-b border-border py-6">
              <dt className="font-serif text-xl leading-7 text-foreground">{q}</dt>
              <dd className="text-[13px] leading-[21px] text-muted-foreground">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  )
}   