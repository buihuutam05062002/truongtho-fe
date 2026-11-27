import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"
import { Eyebrow } from "@/components/layout/eyebrow"

const DEFAULT_PARAGRAPHS = [
  "Trường Thọ bắt đầu từ một niềm tin giản dị: bữa ăn ngon không chỉ ở hương vị, mà còn ở những người cùng ngồi quanh bàn.",
  "Từ xửng dim sum nghi ngút đến món quay thơm lừng, chúng tôi gìn giữ nét tinh tế của ẩm thực Á Đông, kết hợp nguyên liệu theo mùa và sự hiếu khách chân thành.",
]

export function AboutSection({
  id = "story",
  image = "https://i.pinimg.com/736x/9f/b3/40/9fb3409fc9b241538bf53cc30a8115fc.jpg",
  imageAlt = "Món ăn tại nhà hàng Trường Thọ",
  eyebrow = "Câu chuyện về Trường Thọ",
  title = "Giữ Hồn Á Đông, gửi trao tâm ý",
  paragraphs = DEFAULT_PARAGRAPHS,
  caption,
  action = (
    <Button
      variant="outline"
      className="h-10 px-4"
      nativeButton={false}
      render={<Link to="/story#belief" />}
    >
      Khám phá câu chuyện <MoveRight />
    </Button>
  ),
}) {
  return (
    <Section id={id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative w-full max-w-xl justify-self-center">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-square w-full rounded-lg border border-border object-cover"
        />
        {caption && (
          <div className="absolute bottom-4 right-4 w-[216px] space-y-3 bg-[#1d1916] p-6 lg:bottom-6 lg:right-6">
            <span aria-hidden="true" className="block h-px w-7 bg-[#bca27a]" />
            <p className="font-serif text-[21px] leading-[30px] text-[#f2e9dc]">{caption}</p>
          </div>
        )}
      </div>

      <div className="max-w-xl space-y-6">
        <Eyebrow className="text-[11px] tracking-[0.18em]">{eyebrow}</Eyebrow>
        <h2 className="font-serif text-3xl leading-tight text-foreground lg:text-[44px] lg:leading-[57px]">
          {title}
        </h2>
        <div className="space-y-5">
          {paragraphs.map((text) => (
            <p key={text} className="text-sm leading-[26px] text-muted-foreground">
              {text}
            </p>
          ))}
        </div>
        {action}
      </div>
    </Section>
  )
}