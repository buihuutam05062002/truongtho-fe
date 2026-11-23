import { cn } from "@/lib/utils"
import { formatPrice } from "@/features/product/constants"
import { coverOf } from "../utils"

export function MenuCard({ product, onSelect }) {
    const cover = coverOf(product)
    const soldOut = product.productStatus === "OUT_OF_STOCK"

    return (
        <li>
            <button
                type="button"
                onClick={() => onSelect(product)}
                className="group flex h-full w-full flex-col rounded-sm text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
                <span className="relative block aspect-4/3 w-full overflow-hidden rounded-sm bg-secondary">
                    {cover ? (
                        <img
                            src={cover.imageUrl}
                            alt={cover.altText || product.name}
                            loading="lazy"
                            className={cn("size-full object-cover", soldOut && "opacity-60")}
                        />
                    ) : (
                        <span
                            aria-hidden="true"
                            className="flex size-full items-center justify-center font-serif text-5xl text-subtle"
                        >
                            {product.name.charAt(0)}
                        </span>
                    )}
                    {soldOut && (
                        <span className="absolute left-2.5 top-2.5 bg-background px-2 py-1 text-[10px] leading-none tracking-[0.08em] text-gold">
                            Hết món
                        </span>
                    )}
                </span>

                <span className="mt-4 block font-serif text-2xl leading-[30px] text-foreground transition-colors group-hover:text-gold">
                    {product.name}
                </span>
                <span className="mt-1.5 line-clamp-2 block min-h-[2.75rem] text-[13px] leading-[22px] text-muted-foreground">
                    {product.description}
                </span>

                <span className="mt-auto flex items-baseline justify-between gap-3 border-t border-border pt-3">
                    <span className="text-[15px] font-medium text-primary dark:text-[#ce8d7d]">
                        {formatPrice(product.unitPrice)}
                    </span>
                    <span className="truncate text-xs text-subtle">{product.categoryResponse?.name}</span>
                </span>
            </button>
        </li>
    )
}