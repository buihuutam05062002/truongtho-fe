import { Section } from "@/components/layout/section"
import { Eyebrow } from "@/components/layout/eyebrow"

const steps = [
    {
        no: "01",
        title: "Chọn nguyên liệu",
        description: "Ưu tiên độ tươi và mùa vụ, chọn từng mẻ trong ngày.",
    },
    {
        no: "02",
        title: "Sơ chế tỉ mỉ",
        description: "Từng nếp há cảo, từng lớp da vịt đều làm thủ công mỗi ngày.",
    },
    {
        no: "03",
        title: "Lửa và thời gian",
        description: "Hấp, quay, xào đúng lửa, đúng nhịp để vị đậm mà không gắt.",
    },
    {
        no: "04",
        title: "Dọn lên bàn",
        description: "Món nóng đến tay bạn, kèm một chén trà ấm cuối bữa.",
    },
]

export function StoryJourney(){
    return (
        <Section className="space-y-14">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-[18px]">
                    <Eyebrow className="text-[11px] tracking-[0.18em]">Từ gian bếp đến bàn ăn</Eyebrow>
                    <h2 className="font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">
                        Hành trình
                        <br />
                        một món ăn.
                    </h2>
                </div>
                <p className="text-sm leading-[26px] text-muted-foreground lg:w-[360px]">
                    Bốn chặng lặng lẽ phía sau mỗi đĩa món lên bàn.
                </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                    <div key={step.no} className="space-y-3 border-t border-border pt-[25px]">
                        <p className="font-serif text-[15px] leading-5 text-gold">{step.no}</p>
                        <p className="font-serif text-[22px] leading-[30px] text-foreground">{step.title}</p>
                        <p className="text-[13px] leading-[21px] text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}