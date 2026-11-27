import { Section } from "@/components/layout/section"

const stories = [
  {
    quote:
      "Vịt quay giòn thơm, dim sum vừa miệng. Nhưng điều khiến cả nhà muốn trở lại là cảm giác được đón tiếp thật ấm áp.",
    name: "Minh Anh",
    occasion: "Bữa tối cùng gia đình",
  },
  {
    quote:
      "Không gian đủ riêng tư để chuyện trò, món ăn lên bàn chỉn chu. Một lựa chọn tinh tế cho cuộc hẹn quan trọng.",
    name: "Hoàng Nam",
    occasion: "Một buổi gặp gỡ đối tác",
  },
  {
    quote:
      "Thích ánh đèn dịu và chén trà cuối bữa. Mọi thứ vừa đủ, để chúng mình có một buổi tối thật chậm và thật vui.",
    name: "Thu Hà",
    occasion: "Kỷ niệm một ngày đặc biệt",
  },
]




export function FeatureFeedBack(){
    return (
      <Section className="space-y-11">
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-rose"></span>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold">Dư vị sau mỗi lần ghé</p>
          </div>
          <h2 className="font-serif text-3xl leading-[1.3] text-foreground lg:text-[44px]">Điều ở lại sau một bữa ngon</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3 lg:gap-11">
          {stories.map((story) =>(
            <figure key={story.name} className="flex flex-col gap-[18px] border-t border-border pt-5">
              <span aria-hidden="true" className="font-serif text-[46px] leading-[0.8] text-rose">"</span>
              <blockquote className="font-serif text-xl leading-[1.75] text-foreground">{story.quote}</blockquote>
              <figcaption className="flex items-center gap-3 pt-1.5">
                <span className="h-px w-6 bg-gold"></span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-xs text-foreground">{story.name}</span>
                  <span className="text-[10px] text-subtle">{story.occasion}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </Section>
    )
}




