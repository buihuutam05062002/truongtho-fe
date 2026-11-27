import { useEffect, useState } from "react"
import {ArrowRight,ArrowLeft} from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Eyebrow } from "@/components/layout/eyebrow"
import { Link } from "react-router-dom"
const slides = [
  {
    label: "Sảnh đón khách",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/1200x/a2/42/d2/a242d2eef78940a1ea3f070e38f10ad1.jpg",
  },
  {
    label: "Phòng riêng",
    title: "Riêng tư cho những cuộc trò chuyện",
    imgUrl: "https://i.pinimg.com/736x/84/5a/eb/845aebfa7171ea055f9293156b10121e.jpg",
  },
  {
    label: "Bàn tiệc",
    title: "Sum họp trọn vẹn bên mâm cơm",
    imgUrl: "https://i.pinimg.com/1200x/0b/41/93/0b4193570be88d57b7558292bc48685f.jpg",
  },
]

const pad = (n) => String(n).padStart(2,"0")

export function DiningAtmosphere(){
    const [api,setApi] = useState(null)
    const [index, setIndex] = useState(0)
    const [autoplay] = useState(() =>
  Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
)

    useEffect(() =>{
        if(!api) return
        const onSelect = () => setIndex(api.selectedScrollSnap())
        api.on("select",onSelect)
        return () => api.off("select", onSelect)
    }, [api])

    const slide = slides[index]

    return (
        <section id="space" className="scroll-mt-24 bg-card">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-10 pt-16 lg:flex-row lg:items-end lg:justify-between lg:gap-24 lg:px-10 lg:pt-20">
                <div className="space-y-4">
                    <Eyebrow>Không gian Trường Thọ</Eyebrow>
                    <h2 className="font-serif text-4xl leading-[1.3] text-foreground lg:text-[44px]">
                        Một khoảng lặng
                        <br />
                        đủ chỗ những gần gũi
                    </h2>
                </div>
                <div className="space-y-4 lg:w-360px lg:shrink-0">
                    <p className="text-sm leading-[1.85] text-muted-foreground">
                        Ánh đèn ấm, sắc gỗ trầm và những đường nét Á Đông. Mọi chi tiết đều dành chỗ cho sự thư thái của bạn.
                    </p>
                   <Link to="/space"> <button type="button" className="inline-flex items-center gap-4 border-b border-border pb-2 text-[13px] text-foreground transition-colors hover:border-gold cursor-grab">Dạo một vòng không gian <ArrowRight/></button></Link> 
                </div>
            </div>

            <Carousel setApi={setApi} opts={{loop:true}} plugins={[autoplay]}>
                <CarouselContent className="ml-0 h-[360px] sm:h-[460px] lg:h-[720px]">
                    {slides.map((s) => (
                        <CarouselItem key={s.title} className="h-full pl-0">
                            <img src={s.imgUrl} alt={s.title} draggable={false} className="size-full object-cover" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-50% to-[#0d0b09]/80"></div>

                <div className="pointer-events-none absolute inset-x-0 bottom-6 lg:bottom-10">
                    <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-6 text-white lg:px-10">
                        <div key={index} className="animate-in space-y-2 duration-500 fadein">
                            <p className="text-[9px] uppercase tracking-[0.15em] text-[#bca27a]">{slide.label}</p>
                            <p className="font-serif text-2xl lg:text-[32px]">{slide.title}</p>
                        </div>
                        <div className="pointer-events-auto flex shrink-0 items-center gap-5">
                            <button type="button" onClick={() => api?.scrollPrev()} aria-label="prev" className="transition-opacity hover:opacity-70"><ArrowLeft/></button>
                            <span className="text-[11px]">{pad(index + 1)} / {pad(slides.length)}</span>
                            <button type="button" onClick={() => api?.scrollNext()} aria-label="next" className="transition-opacity hover:opacity-70"><ArrowRight/></button>
                        </div>
                    </div>
                </div>
            </Carousel>

        </section>
    )
}
