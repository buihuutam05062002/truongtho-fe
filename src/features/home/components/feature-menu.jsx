import { DishCard } from "./dish-card"
import { Button } from "@/components/ui/button"
import { Section, SectionHeader } from "@/components/layout/section"
import { Link } from "react-router-dom"

const items = [
    {
        imgUrl: "https://i.pinimg.com/1200x/ad/87/35/ad87351a060599ee49fd5883c4162c50.jpg",
        title: "Cơm tấm",
        description: "Ngon từ trong miệng, ngọt từ trong thịt",
        value: 80000
    },
        {
        imgUrl: "https://i.pinimg.com/736x/d6/42/6f/d6426f32746388dd8c15e7fa37f02b0c.jpg",
        title: "Bánh xèo",
        description: "Vỏ bánh giòn, nước chấm đậm vị",
        value: 80000
    },
        {
        imgUrl: "https://i.pinimg.com/736x/83/3f/52/833f52b716010b0cc8aec7e045002d3c.jpg",
        title: "Gỏi cuốn",
        description: "Da bánh mềm mại, hương liệu lan tỏa",
        value: 80000
    }
    
]


export function FeatureMenu() {
  return (
    <Section id="menu">
      <SectionHeader
        eyebrow="Tinh túy từ gian bếp"
        title="Những hương vị làm nên nhớ thương"
        action={
        <Link to="/menu"><Button variant="outline">Xem toàn bộ thực đơn</Button></Link>
       }
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