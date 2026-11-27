import { Link } from "react-router-dom"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/features/product/constants"
import { DishGallery } from "./dish-gallery"

const NAV_BTN = "size-8 rounded-full"

export function DishDialog({ product, items = [], onChange, onClose }) {
    const index = product ? items.findIndex((p) => p.id === product.id) : -1
    const canNavigate = index !== -1 && items.length > 1
    const go = (step) => {
        if (!canNavigate) return
        onChange(items[(index + step + items.length) % items.length])
    }

    const onKeyDown = (e) => {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
        if (e.target.closest?.("[data-gallery]")) return
        e.preventDefault()
        go(e.key === "ArrowLeft" ? -1 : 1)
    }

    return (
        <DialogPrimitive.Root open={!!product} onOpenChange={(open) => !open && onClose()}>
            {product && (
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/60 transition-opacity duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
                    <DialogPrimitive.Viewport className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-0 sm:items-center sm:p-6">
                        <DialogPrimitive.Popup
                            onKeyDown={onKeyDown}
                            className="relative my-auto w-full max-w-5xl overflow-hidden border-border bg-card text-card-foreground shadow-lg outline-none transition-all duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 sm:rounded-lg sm:border"
                        >
                            <DishContent
                                key={product.id}
                                product={product}
                                canNavigate={canNavigate}
                                position={index + 1}
                                total={items.length}
                                onPrev={() => go(-1)}
                                onNext={() => go(1)}
                            />
                        </DialogPrimitive.Popup>
                    </DialogPrimitive.Viewport>
                </DialogPrimitive.Portal>
            )}
        </DialogPrimitive.Root>
    )
}

function DishContent({ product, canNavigate, position, total, onPrev, onNext }) {
    const soldOut = product.productStatus === "OUT_OF_STOCK"
    const price = formatPrice(product.unitPrice)

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <DishGallery images={product.productImageResponses} name={product.name} />

            <div className="flex min-w-0 flex-col p-6 pb-24 md:pb-8 lg:p-8">
                <div className="flex items-center justify-between gap-2">
                    {canNavigate ? (
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon-sm" className={NAV_BTN} onClick={onPrev} aria-label="Món trước">
                                <ChevronLeft />
                            </Button>
                            <span className="min-w-14 text-center text-xs text-muted-foreground" aria-live="polite">
                                {position} / {total} món
                            </span>
                            <Button variant="outline" size="icon-sm" className={NAV_BTN} onClick={onNext} aria-label="Món sau">
                                <ChevronRight />
                            </Button>
                        </div>
                    ) : (
                        <span />
                    )}
                    <DialogPrimitive.Close
                        render={<Button variant="ghost" size="icon-sm" aria-label="Đóng" className="-mr-2" />}
                    >
                        <X />
                    </DialogPrimitive.Close>
                </div>

                <div className="mt-8 space-y-2">
                    {product.categoryResponse?.name && (
                        <p className="text-xs text-gold">{product.categoryResponse.name}</p>
                    )}
                    <DialogPrimitive.Title className="font-serif text-4xl font-normal leading-[1.15] text-foreground">
                        {product.name}
                    </DialogPrimitive.Title>
                </div>

                <p className="mt-5 border-y border-border py-4 text-2xl text-primary dark:text-[#ce8d7d]">{price}</p>

                {product.description && (
                    <DialogPrimitive.Description className="mt-5 text-sm leading-[26px] text-muted-foreground">
                        {product.description}
                    </DialogPrimitive.Description>
                )}

                <div className="mt-8 hidden md:block">
                    <Cta soldOut={soldOut} />
                </div>
            </div>

            <div className="sticky bottom-0 z-10 flex items-center justify-between gap-4 border-t border-border bg-card p-4 md:hidden">
                <p className="text-lg text-primary dark:text-[#ce8d7d]">{price}</p>
                <Cta soldOut={soldOut} compact />
            </div>
        </div>
    )
}

function Cta({ soldOut, compact }) {
    if (soldOut) {
        return (
            <div className="space-y-1">
                <Button disabled className={compact ? "h-10 px-4" : "h-11 w-full"}>
                    Món tạm hết
                </Button>
                {!compact && <p className="text-xs text-gold">Mời bạn chọn món khác.</p>}
            </div>
        )
    }
    return (
        <div className="space-y-2">
            <Button
                className={compact ? "h-10 px-4" : "h-11 w-full"}
                nativeButton={false}
                render={<Link to="/reserve" />}
            >
                Đặt bàn để thưởng thức
            </Button>
            {!compact && <p className="text-xs text-subtle">Vui lòng báo trước nếu bạn có dị ứng thực phẩm.</p>}
        </div>
    )
}