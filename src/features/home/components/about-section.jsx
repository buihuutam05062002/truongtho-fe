import {MoveRight} from "lucide-react"
import {Button} from "@/components/ui/button"
import { Section } from "@/components/layout/section"
export function AboutSection(){
    return (
        <Section id="cau-chuyen" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <img src="https://i.pinimg.com/736x/9f/b3/40/9fb3409fc9b241538bf53cc30a8115fc.jpg" alt="Món ăn tại nhà hàng Trường Thọ" loading="lazy" className="aspect-square w-full max-w-xl justify-self-center rounded-lg object-fill border border-border" />
            <div className="max-w-xl space-y-5">
                <p className="text-sx uppercase tracking-[0.2em] text-gold">Câu chuyện về Trường Thọ</p>
                <h2 className="font-serif text-3xl text-foreground lg:text-5xl">Giữ Hồn Á Đông, gửi trao tâm ý</h2>
                <p className="text-muted-foreground">Trường Thọ bắt đầu từ một niềm tin giản dị: bữa ăn ngon không chỉ ở hương vị, mà còn ở những người cùng ngồi quanh bàn.</p>
                <p className="text-muted-foreground">Từ xửng dim sum nghi ngút đến món quay thơm lừng, chúng tôi gìn giữ nét tinh tế của ẩm thực Á Đông, kết hợp nguyên liệu theo mùa và sự hiếu khách chân thành.</p>
                <Button variant="outline" className="h-10 px-4">Khám phá câu chuyện <MoveRight /></Button>
            </div>
        </Section>
    )
}