import { Eyebrow } from "@/components/layout/eyebrow"
import { Section } from "@/components/layout/section"
import { slides } from "@/features/home/components/dining-atmosphere"


const details = [
    {
        title: "Ánh đèn ấm",
        description: "Ánh sáng vàng dịu, đủ để thấy rõ món ăn và gương mặt người đối diện.",
        imgUrl: "https://i.pinimg.com/1200x/0a/37/5e/0a375ea797320b1a6ef39755389befbf.jpg",
    },
    {
        title: "Sắc gỗ trầm",
        description: "Gỗ tối màu, bề mặt mờ, mang lại cảm giác an yên và vững chãi.",
        imgUrl: "https://i.pinimg.com/736x/5b/ea/77/5bea77299629e7f4eb69eee7a48450e9.jpg",
    },
    {
        title: "Đường nét Á Đông",
        description: "Họa tiết sóng và khung cửa gợi nhớ nét tinh tế của ẩm thực phương Đông.",
        imgUrl: "https://i.pinimg.com/736x/26/f2/43/26f243a087a170a83c89d984018ee41f.jpg",
    },
]

export function SpaceDetails(){
    return (
        <Section>
            <div className="mb-14 flex flex-col items-center gap-[18px] text-center">
                <Eyebrow className="text-[11px] tracking-[0.18em]">Từng chi tiết nhỏ</Eyebrow>
                <h2 className="font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">Ba điều làm nên không khí</h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3 lg:gap-11">
                {details.map((item) => (
                    <div key={item.title}>
                        <img src={item.imgUrl} alt={item.title} loading="lazy" className="h-60 w-full object-cover" />
                        <p className="mt-5 font-serif text-[22px] leading-[30px] text-foreground">{item.title}</p>
                        <p className="mt-5 text-[13px] leading-[21px] text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    )
}