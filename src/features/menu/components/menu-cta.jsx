import { Link } from "react-router-dom"
import { MoveUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/layout/section"


export function MenuCta() {
    return (
        <Section className="flex flex-col items-center gap-6 border-t border-border text-center">
            <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-[#ce8d7d]" />
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                    Hẹn bạn tại Trường Thọ
                </p>
            </div>
            <h2 className="max-w-3xl font-serif text-3xl leading-[1.3] text-foreground lg:text-[44px]">
                Chọn xong món, giữ ngay một chỗ ngồi.
            </h2>
            <Button className="h-11 px-5 text-sm" nativeButton={false} render={<Link to="/reserve" />}>
                Đặt bàn ngay <MoveUpRight />
            </Button>
            <p className="text-xs text-subtle">Vui lòng báo trước nếu bạn có dị ứng thực phẩm.</p>
        </Section>
    )
}
