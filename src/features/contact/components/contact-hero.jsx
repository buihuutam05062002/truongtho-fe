import { ArrowRight } from "lucide-react"
import { Eyebrow } from "@/components/layout/eyebrow"

export function ContactHero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-24">
        <div className="space-y-7">
          <Eyebrow className="text-[11px] tracking-[0.18em]">Liên hệ</Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.2] text-foreground sm:text-5xl lg:text-[70px] lg:leading-[88px]">
            Hẹn gặp bạn
            <br />
            tại Trường Thọ.
          </h1>
        </div>
        <div className="max-w-[360px] space-y-6">
          <p className="text-sm leading-[26px] text-muted-foreground">
            Đặt bàn, hỏi về phòng riêng hay chỉ muốn gửi một lời nhắn, chúng tôi luôn sẵn lòng lắng nghe.
          </p>
      
          <a
            href="#reserve"
            className="inline-flex items-center gap-4 border-b border-border pb-2 text-[13px] text-foreground transition-colors hover:border-gold"
          >
            Đến phần đặt bàn
            <ArrowRight className="size-4.5 text-rose" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}