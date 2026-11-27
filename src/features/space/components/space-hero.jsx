import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Eyebrow } from "@/components/layout/eyebrow"


const pad = (n) => String(n).padStart(2,"0")

const navClass = "flex size-10 items-center justify-center rounded-[2px] border border-[#42372d] text-[#f2e9dc] transition-colors hover:bg-white/10"

const slidess = [
  {
    label: "Sảnh đón khách",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/736x/d6/c7/17/d6c7179ec1376c07b5dc143ea3a3965f.jpg",
  },
  {
    label: "Phòng riêng",
    title: "Riêng tư cho những cuộc trò chuyện",
    imgUrl: "https://i.pinimg.com/1200x/fe/fd/94/fefd9475d0e2451e22b819600e43d614.jpg",
  },
  {
    label: "Bàn tiệc",
    title: "Sum họp trọn vẹn bên mâm cơm",
    imgUrl: "https://i.pinimg.com/736x/40/92/77/409277cdbe3deca486b46f78da5a5f31.jpg",
  },
]





export function SpaceHero(){
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

    const slide = slidess[index]

    return (
        <section>
            <Carousel setApi={setApi} opts={{loop:true}} plugins={[autoplay]}>
                <CarouselContent className="ml-0 h-[560px] lg:h-[620px]">
                    {slidess.map((s) => (
                        <CarouselItem key={s.title} className="h-full pl-0">
                            <img src={s.imgUrl} alt={s.title} draggable={false} className="size-full object-cover" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#131210]/92 via-[#131210]/45 via-55% to-[#131210]/20"></div>

                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
                    <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-16">
                        <Eyebrow className="text-[11px] tracking-[0.18em] text-[#bca27a]" lineClassName="bg-[#ce8d7d]">
                            Không gian Trường Thọ
                        </Eyebrow>
                        <h1 className="mt-6 font-serif text-4xl leading-[1.2] text-[#f2e9dc] sm:text-5xl lg:text-[70px] lg:leading-[88px]">
                            Một khoảng lặng,
                            <br />
                            đủ cho những gần gũi.
                        </h1>
                        <div className="mt-8 flex items-end justify-between gap-4 lg:mt-10">
                            <div key={index} className="animate-in space-y-2 duration-500 fade-in">
                                <p className="text-[11px] uppercase tracking-[0.18em] text-[#bca27a]">{slide.label}</p>
                                <p className="font-serif text-2xl text-[#f2e9dc] lg:text-[32px] lg:leading-[44px]">{slide.title}</p>
                            </div>
                            <div className="pointer-events-auto flex shrink-0 items-center gap-5">
                                <button type="button" onClick={() => api?.scrollPrev()} aria-label="Ảnh trước" className={navClass}><ArrowLeft className="size-3.5"/></button>
                                <span className="text-[11px] text-[#f2e9dc]">{pad(index + 1)} / {pad(slidess.length)}</span>
                                <button type="button" onClick={() => api?.scrollNext()} aria-label="Ảnh sau" className={navClass}><ArrowRight className="size-3.5"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </section>
    )
}