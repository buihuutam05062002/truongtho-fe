const items = [
    "Sảnh dùng bữa ấm cúng",
    "Phòng riêng cho nhóm 8–12 khách",
    "Sắp xếp theo dịp đặc biệt",
]

export function SpaceHighlights(){
    return (
        <div className="border-y border-border bg-card">
            <ul className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-0">
                {items.map((text) => (
                    <li key={text} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                        <span aria-hidden="true" className="size-1 bg-rose"></span>
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    )
}