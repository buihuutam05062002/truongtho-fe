import { PageHero } from "@/components/layout/page-hero"
import { ArrowLink } from "@/components/ui/arrow-link"
import { AboutSection } from "@/features/home/components/about-section"
import { StoryValues } from "@/features/story/components/story-values"
import { StoryJourney } from "../components/story-journey"
import { StoryQuote } from "../components/story-quote"
import { StoryCta } from "../components/story-cta"
const HERO_IMG =
  "https://res.cloudinary.com/hzjnf9ek/image/upload/v1792572509/download_2026-10-21_08_44_12.414523_cgcrfa.webp"

const BELIEF_PARAGRAPHS = [
  "Trường Thọ bắt đầu từ một niềm tin giản dị: bữa ăn ngon không chỉ ở hương vị, mà còn ở những người cùng ngồi quanh bàn.",
  "Từ xửng dim sum nghi ngút đến món quay thơm lừng, chúng tôi gìn giữ nét tinh tế của ẩm thực Á Đông, kết hợp nguyên liệu theo mùa và sự hiếu khách chân thành.",
  "Cái tên “Trường Thọ” gửi gắm một lời chúc: những bữa cơm bền lâu, những cuộc gặp gỡ trường tồn, và những người thân yêu luôn có chỗ ngồi bên nhau.",
]

export default function StoryPage() {
  return (
    <main>
      <PageHero
        image={HERO_IMG}
        eyebrow="Câu chuyện Trường Thọ"
        title={
          <>
            Bữa ngon bắt đầu
            <br />
            từ người cùng bàn.
          </>
        }
        lead="Một nhà hàng Á Đông nhỏ nhắn, nơi bữa ăn được nâng niu và mỗi cuộc gặp gỡ đều có chỗ để ở lại."
      />

      <AboutSection
        id="belief"
        imageAlt="Bàn tay gói há cảo"
        eyebrow="Niềm tin của chúng tôi"
        image = "https://res.cloudinary.com/hzjnf9ek/image/upload/v1795403574/Cheerful_Market_Fan_Conversation_qlupcs.png"
        title={
          <>
            Bắt đầu từ
            <br />
            một niềm tin giản dị.
          </>
        }
        paragraphs={BELIEF_PARAGRAPHS}
        action={<ArrowLink to="/home#menu">Xem thực đơn</ArrowLink>}
      />
      <StoryValues></StoryValues>
      <StoryJourney></StoryJourney>
      <StoryQuote></StoryQuote>
      <StoryCta/>
    </main>
  )
}