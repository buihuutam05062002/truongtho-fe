import { useState } from "react"
import { ArrowLeft, ArrowRight, ImageOff, ImagePlus, Loader2, Star, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { MAX_IMAGES, MAX_IMAGE_MB } from "../constants"

function OverlayButton({ label, className, ...props }) {
    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            className={cn(
                "flex size-7 items-center justify-center rounded-md bg-black/60 text-white outline-none transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-40",
                className
            )}
            {...props}
        />
    )
}

/**
 * Bộ ảnh của một món: xem một ảnh lớn + dải ảnh nhỏ.
 * Ảnh đầu tiên là ảnh đại diện (backend lưu theo thứ tự mảng → position).
 */
export default function ProductImages({ images, onChange, onAdd, uploading, name }) {
    const [active, setActive] = useState(0)
    const index = Math.min(active, Math.max(images.length - 1, 0))
    const current = images[index]
    const isCover = index === 0
    const canAdd = images.length < MAX_IMAGES

    const move = (dir) => {
        const target = index + dir
        if (target < 0 || target >= images.length) return
        const next = [...images]
        const tmp = next[index]
        next[index] = next[target]
        next[target] = tmp
        onChange(next)
        setActive(target)
    }

    const makeCover = () => {
        onChange([current, ...images.filter((_, i) => i !== index)])
        setActive(0)
    }

    const remove = () => onChange(images.filter((_, i) => i !== index))

    return (
        <div className="space-y-2">
            <div className="relative h-[154px] overflow-hidden rounded-md bg-secondary">
                {current ? (
                    <img
                        src={current.src}
                        alt={current.altText || name || `Ảnh món ${index + 1}`}
                        className="size-full object-cover"
                    />
                ) : (
                    <div className="flex size-full flex-col items-center justify-center gap-1.5 text-subtle">
                        <ImageOff className="size-5" />
                        <span className="text-[11px]">Chưa có ảnh</span>
                    </div>
                )}

                {current && (
                    <>
                        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-black/60 px-2 py-1 text-[10px] text-white">
                            {isCover ? (
                                <>
                                    <Star className="size-3 fill-current" /> Ảnh đại diện
                                </>
                            ) : (
                                `Ảnh ${index + 1}/${images.length}`
                            )}
                        </span>
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            <OverlayButton label="Chuyển ảnh sang trái" disabled={index === 0} onClick={() => move(-1)}>
                                <ArrowLeft className="size-3.5" />
                            </OverlayButton>
                            <OverlayButton
                                label="Chuyển ảnh sang phải"
                                disabled={index === images.length - 1}
                                onClick={() => move(1)}
                            >
                                <ArrowRight className="size-3.5" />
                            </OverlayButton>
                            {!isCover && (
                                <OverlayButton label="Đặt làm ảnh đại diện" onClick={makeCover}>
                                    <Star className="size-3.5" />
                                </OverlayButton>
                            )}
                            <OverlayButton label="Xóa ảnh này" className="hover:bg-destructive" onClick={remove}>
                                <Trash2 className="size-3.5" />
                            </OverlayButton>
                        </div>
                    </>
                )}
            </div>

            <ul className="flex flex-wrap gap-2">
                {images.map((img, i) => (
                    <li key={img.id ?? img.key}>
                        <button
                            type="button"
                            aria-label={i === 0 ? "Xem ảnh đại diện" : `Xem ảnh ${i + 1}`}
                            aria-current={i === index ? "true" : undefined}
                            onClick={() => setActive(i)}
                            className={cn(
                                "relative block size-[52px] overflow-hidden rounded-md border-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                i === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <img src={img.src} alt="" className="size-full object-cover" />
                            {i === 0 && (
                                <Star className="absolute bottom-0.5 left-0.5 size-3 fill-white text-white drop-shadow" />
                            )}
                        </button>
                    </li>
                ))}

                {canAdd && (
                    <li>
                        <label
                            title="Thêm ảnh"
                            className="flex size-[52px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-md border border-dashed border-input text-muted-foreground transition-colors hover:bg-secondary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50"
                        >
                            {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
                            <span className="text-[9px]">
                                {images.length}/{MAX_IMAGES}
                            </span>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="sr-only"
                                aria-label="Thêm ảnh"
                                disabled={uploading}
                                onChange={(e) => {
                                    onAdd(Array.from(e.target.files ?? []))
                                    e.target.value = ""
                                }}
                            />
                        </label>
                    </li>
                )}
            </ul>

            <p className="text-[10px] text-subtle">
                Ảnh đầu tiên là ảnh đại diện trên thực đơn. Tối đa {MAX_IMAGES} ảnh, mỗi ảnh ≤ {MAX_IMAGE_MB}MB (JPG, PNG, WEBP).
            </p>
        </div>
    )
}
