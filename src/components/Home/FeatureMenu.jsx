import { DishCard } from "./Dishcard"
import { Button } from "../ui/button"

const items = [
    {
        imgUrl: "https://bizweb.dktcdn.net/100/426/047/articles/33-967f1e3e-ba0c-4166-bf6f-4835ad75f4bd.jpg",
        title: "Cá kho tộ",
        desciption: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    },
        {
        imgUrl: "https://cdn.tgdd.vn/2025/01/CookRecipe/GalleryStep/thanh-pham-27.jpg",
        title: "Thịt kho tàu",
        desciption: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    },
        {
        imgUrl: "https://www.hoidaubepaau.com/wp-content/uploads/2018/04/mon-canh-cua-rau-day.jpg",
        title: "Canh cua rau đay",
        desciption: "Ngon từ trong miệng, ngọt từ trong xương",
        value: 80000
    }
    
]


export function FeatureMenu() {
    return (
        <section className="max-w-7xl mx-auto  space-y-4 py-10 ">
            <p className="uppercase tracking-widest text-sm">Tinh túy từ gian bếp</p>
            <div className="flex  justify-between p-2">
                <p className="text-4xl">Những hương vị làm nên nhớ thương </p>
                <Button className="">Xem toàn bộ thực đơn</Button>
            </div>


            <div className="flex  gap-5 ">
                
            {items.map((item) => 
                <DishCard key={item.title} imgUrl={item.imgUrl} title={item.title} content={item.desciption} value={item.value}  />
            
            )}
            </div>

        </section>
    )
}