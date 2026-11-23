import { MoveUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Section } from "@/components/layout/section"
import { Eyebrow } from "@/components/layout/eyebrow"

const CTA_IMG = "https://i.pinimg.com/736x/e3/36/bd/e336bd02c57a9146f44d7e2d79c7e8a3.jpg"

export function StoryCta(){
    return (
        <Section className="py-12 lg:py-20">
            <div className="grid overflow-hidden bg-secondary lg:grid-cols-[1fr_420px]">
                <div className="flex flex-col justify-center gap-5 px-8 py-10 lg:px-14 lg:py-12">
                    <Eyebrow className="text-[11px] tracking-[0.18em]">Hẹn bạn tại Trường Thọ</Eyebrow>
                    <h2 className="font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">
                        Hẹn bạn tại bàn ăn.
                    </h2>
                    <p className="max-w-[560px] text-sm leading-[26px] text-muted-foreground">
                        Một bữa tối đáng mong đợi bắt đầu từ một cuộc hẹn. Chọn thời gian phù hợp, để chúng tôi chăm chút phần còn lại.
                    </p>
                    <div className="flex flex-wrap items-center gap-8 pt-2">
                        <Button
                            className="h-[50px] rounded-[2px] px-6 text-[13px] font-medium"
                            nativeButton={false}
                            render={<Link to="/reserve" />}
                        >
                            Đặt bàn ngay <MoveUpRight />
                        </Button>
                        <ArrowLink to="/home#menu">Xem thực đơn</ArrowLink>
                    </div>
                </div>
                <img src={CTA_IMG} alt="" loading="lazy" className="h-56 w-full object-cover lg:h-full" />
            </div>
        </Section>
    )
}