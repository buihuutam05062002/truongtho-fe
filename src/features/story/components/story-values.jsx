import { Broccoli, Flame, HeartPlus } from "lucide-react"
import { Eyebrow } from "@/components/layout/eyebrow"
import { FeatureItem } from "@/features/home/components/feature-item"

const values = [
    {
        icon: Broccoli,
        title: "Nguyên liệu chọn lọc",
        description: "Tươi ngon theo mùa, trọn vẹn tự nhiên. Mỗi nguyên liệu được chọn kỹ trước khi vào bếp.",
    },
    {
        icon: Flame,
        title: "Tâm huyết trong từng món",
        description: "Kỹ nghệ Á Đông, chăm chút từng chi tiết, từ nếp gấp há cảo đến lớp da vịt quay giòn.",
    },
    {
        icon: HeartPlus,
        title: "Nồng hậu mỗi lần ghé",
        description: "Một chỗ ngồi ấm áp, một bữa ăn an yên. Bạn đến như đến nhà một người quen.",
    },
]

export function StoryValues(){
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-[88px]">
                <div className="mb-14 flex flex-col items-center gap-[18px] text-center">
                    <Eyebrow className="text-[11px] tracking-[0.18em]">Điều chúng tôi giữ gìn</Eyebrow>
                    <h2 className="font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">Ba điều làm nên Trường Thọ</h2>
                </div>
                <div className="grid gap-8 md:grid-cols-3 lg:gap-11">
                    {values.map((item) => (
                        <FeatureItem
                            key={item.title}
                            variant="column"
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                        ></FeatureItem>
                    ))}
                </div>
            </div>
        </section>
    )
}