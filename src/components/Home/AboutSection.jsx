import {MoveRight} from "lucide-react"
import {Button} from "@/components/ui/button"
export function AboutSection(){
    return (
        <section className=" max-w-7xl mx-auto grid items-center lg:grid-cols-2 gap-10 px-6 py-16 lg:gap-16 lg:px-10 ">
            <div className="">
                <img src="https://res.cloudinary.com/hzjnf9ek/image/upload/v1792577839/nuocsuot_imlexk.webp" alt="" className="aspect-square w-full max-w-xl justify-self-center rounded-4xl object-fit  " />
            </div>
            <div className="max-w-xl space-y-4">
                <p className="uppercase tracking-widest text-sm">Câu chuyện về trường thọ</p>
                <h1 className="font-serif text-4xl">Giữ hồn Á Đông, gửi trao tâm ý</h1>
                <p>Trường Thọ bắt đầu từ một niềm tin giản dị: bữa ăn ngon không chỉ ở hương vị, mà còn ở những người cùng ngồi quanh bàn.</p>
                <p>Từ xửng dim sum nghi ngút đến món quay thơm lừng, chúng tôi gìn giữ nét tinh tế của ẩm thực Á Đông, kết hợp nguyên liệu theo mùa và sự hiếu khách chân thành.</p>
                <div>
                    <Button>Khám phá câu chuyên <MoveRight/></Button>
                </div>
            </div>
        </section>
    )
}