import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { ArrowLink } from "@/components/ui/arrow-link"

const points = [
    "Ánh đèn dịu, tạo cảm giác gần gũi",
    "Sắc gỗ trầm, nội thất đường nét Á Đông",
    "Chén trà ấm kết vị cuối bữa",
]
const slides = {
    imgUrl:"https://i.pinimg.com/736x/97/bc/72/97bc72de661bce75e7e7f956dee8a7e6.jpg",
    label: "wu dongzi",

}

export function SpaceLobby(){
    return (
        <Section className="py-12 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[640px_1fr]">
                <img
                    src={slides.imgUrl}
                    alt={slides.label}
                    loading="lazy"
                    className="h-72 w-full object-cover sm:h-96 lg:h-[480px]"
                />
                <div>
                    <Eyebrow className="text-[11px] tracking-[0.18em]">Sảnh đón khách</Eyebrow>
                    <h2 className="mt-[22px] font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">
                        Ấm cúng
                        <br />
                        trong từng góc nhỏ.
                    </h2>
                    <div className="mt-7 max-w-[520px] space-y-8 text-sm leading-[26px] text-muted-foreground">
                        <p>Ánh đèn ấm, sắc gỗ trầm và những đường nét Á Đông. Mọi chi tiết đều dành chỗ cho sự thư thái của bạn.</p>
                        <p>Sảnh dùng bữa dành cho bữa cơm gia đình và những buổi hẹn thân mật, nơi chuyện trò có thể chậm và dài hơn một chút.</p>
                    </div>
                    <ul className="mt-9 space-y-3">
                        {points.map((text) => (
                            <li key={text} className="flex items-center gap-2.5 text-[13px] leading-4 text-muted-foreground">
                                <span aria-hidden="true" className="size-1 shrink-0 bg-rose"></span>
                                {text}
                            </li>
                        ))}
                    </ul>
                    <ArrowLink to="/menu" className="mt-8">Xem thực đơn</ArrowLink>
                </div>
            </div>
        </Section>
    )
}