import { Section } from "@/components/layout/section"
import { ReserveSection } from "@/features/home/components/reserve-section"
import { ContactHero } from "../components/contact-hero"
import { ContactInfo } from "../components/contact-info"
import { ContactForm } from "../components/contact-form"
import { ContactMap } from "../components/contact-map"
import { ContactFaq } from "../components/contact-faq"

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <Section className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <ContactInfo />
        <ContactForm />
      </Section>

      <ContactMap />

      <div id="reserve" className="scroll-mt-24">
        <ReserveSection />
      </div>

      <ContactFaq />
    </main>
  )
}