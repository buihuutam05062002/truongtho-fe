import { DishCard } from "./dish-card"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/layout/section"


const items = [
    {
        imgUrl: "https://bizweb.dktcdn.net/100/426/047/articles/33-967f1e3e-ba0c-4166-bf6f-4835ad75f4bd.jpg",
        title: "Cá kho tộ",
        description: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    },
        {
        imgUrl: "https://cdn.tgdd.vn/2025/01/CookRecipe/GalleryStep/thanh-pham-27.jpg",
        title: "Thịt kho tàu",
        description: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    },
        {
        imgUrl: "https://www.hoidaubepaau.com/wp-content/uploads/2018/04/mon-canh-cua-rau-day.jpg",
        title: "Canh cua rau đay",
        description: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    }
    
]


export function FeatureMenu() {
  return (
    <Section id="thuc-don">
      <SectionHeader
        eyebrow="Tinh túy từ gian bếp"
        title="Những hương vị làm nên nhớ thương"
        action={<Button variant="outline">Xem toàn bộ thực đơn</Button>}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <DishCard
            key={item.title}
            imgUrl={item.imgUrl}
            title={item.title}
            content={item.description}
       
          />
        ))}
      </div>
    </Section>
  )
}