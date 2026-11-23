export const coverOf = (product) => product.productImageResponses?.[0] ?? null

const byName = (a, b) => a.name.localeCompare(b.name, "vi")
const price = (p) => Number(p.unitPrice ?? 0)

export function sortProducts(products, sort) {
    if (sort === "NAME") return [...products].sort(byName)
    if (sort === "PRICE_ASC") return [...products].sort((a, b) => price(a) - price(b) || byName(a, b))
    if (sort === "PRICE_DESC") return [...products].sort((a, b) => price(b) - price(a) || byName(a, b))
    return products
}

export function countByCategory(products) {
    const counts = new Map()
    for (const p of products) {
        const id = p.categoryResponse?.id
        if (id != null) counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return counts
}