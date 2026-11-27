import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"


export function DishGallery({ images, name }) {
    const [api, setApi] = useState(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (!api) return
        const onSelect = () => setIndex(api.selectedScrollSnap())
        api.on("select", onSelect)
        api.on("reInit", onSelect)
        return () => {
            api.off("select", onSelect)
            api.off("reInit", onSelect)
        }
    }, [api])

    if (!images?.length) {
        return (
            <div
                className="flex aspect-3/2 w-full items-center justify-center bg-secondary font-serif text-6xl text-subtle"
                aria-hidden="true"
            >
                {name?.charAt(0)}
            </div>
        )
    }

    const multiple = images.length > 1

    return (
        <div data-gallery className="min-w-0">
            <div className="relative">
                <Carousel setApi={setApi} opts={{ loop: multiple }} aria-label={`Ảnh ${name}`}>
                    <CarouselContent className="ml-0">
                        {images.map((img, i) => (
                            <CarouselItem key={img.id} className="pl-0">
                                <img
                                    src={img.imageUrl}
                                    alt={img.altText || `${name} — ảnh ${i + 1}`}
                                    loading={i === 0 ? "eager" : "lazy"}
                                    className="aspect-3/2 w-full object-cover"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {multiple && (
                    <>
                        <Button
                            variant="secondary"
                            size="icon-sm"
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
                            onClick={() => api?.scrollPrev()}
                            aria-label="Ảnh trước"
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon-sm"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                            onClick={() => api?.scrollNext()}
                            aria-label="Ảnh sau"
                        >
                            <ChevronRight />
                        </Button>
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur-sm">
                            {index + 1} / {images.length}
                        </span>
                    </>
                )}
            </div>

            {multiple && (
                <ul className="flex gap-2 overflow-x-auto px-6 py-4 lg:px-8">
                    {images.map((img, i) => (
                        <li key={img.id} className="shrink-0">
                            <button
                                type="button"
                                onClick={() => api?.scrollTo(i)}
                                aria-label={`Xem ảnh ${i + 1}`}
                                aria-current={i === index}
                                className={cn(
                                    "block h-14 w-[4.5rem] overflow-hidden rounded-sm outline-none transition-opacity focus-visible:ring-3 focus-visible:ring-ring/50",
                                    i === index ? "opacity-100 ring-2 ring-gold" : "opacity-50 hover:opacity-100"
                                )}
                            >
                                <img src={img.imageUrl} alt="" loading="lazy" className="size-full object-cover" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}