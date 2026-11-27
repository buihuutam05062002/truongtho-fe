export const PRICE_RANGES = [
    { key: "all", label: "Mọi mức giá" },
    { key: "p1", label: "Đến 100.000 ₫", maxPrice: 100000 },
    { key: "p2", label: "100.000 – 200.000 ₫", minPrice: 100000, maxPrice: 200000 },
    { key: "p3", label: "200.000 – 500.000 ₫", minPrice: 200000, maxPrice: 500000 },
    { key: "p4", label: "Từ 500.000 ₫", minPrice: 500000 },
]

export const SORT_OPTIONS = [
    { key: "DEFAULT", label: "Mặc định" },
    { key: "NAME", label: "Tên A–Z" },
    { key: "PRICE_ASC", label: "Giá tăng" },
    { key: "PRICE_DESC", label: "Giá giảm" },
]

export const MENU_PAGE_SIZE = 100

export const GRID_PAGE_SIZE = 12