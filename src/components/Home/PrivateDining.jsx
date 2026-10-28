import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

export function PrivateDining(){
    return (
        <div className="max-w-7xl m-auto flex  items-center gap-5 py-16">
            <div className="relative rouded-3xl overflow-hidden">
                <img src="https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/10_2024/4nha_hng_view_dep_o_hue3.jpg" alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div  className="space-y-7">
                <p className="font-serif tracking-widest text-2xl ">Những cuộc hẹn đáng nhớ</p>
                <p className="text-6xl">Có những dịp, chỉ cần bên nhau.</p>
                <p>Bữa cơm gia đình, buổi hẹn thân mật hay cuộc gặp đối tác. Để Trường Thọ chăm chút không gian và thực đơn, bạn chỉ cần tận hưởng khoảnh khắc.</p>
                <ul className="flex gap-5">
                    <li>Sum hợp gia đình</li>
                    <li>Tiệc thân mật</li>
                    <li>Gặp gỡ đối tác</li>
                </ul>
                <Button>Tư vấn tiệc & phòng riêng <ArrowRight/></Button>
            </div>

        </div>
    )
}