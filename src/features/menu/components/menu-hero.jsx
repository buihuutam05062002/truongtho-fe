export function MenuHero() {
    return (
        <section className="relative overflow-hidden border-b border-border">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-[420px] text-gold opacity-[0.12] md:block"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 36px), repeating-linear-gradient(-45deg, currentColor 0 1px, transparent 1px 36px)",
                }}
            />
            <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-16 lg:px-10 lg:pb-14 lg:pt-20">
                <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-gold" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gold">
                        Tinh tuyển từ gian bếp
                    </p>
                </div>
                <h1 className="mt-4 font-serif text-5xl leading-[1.15] text-foreground lg:text-6xl">Thực đơn</h1>
                <p className="mt-3 max-w-[34rem] text-sm leading-[22px] text-muted-foreground">
                    Hương vị Á Đông được chọn lọc từ Trung Hoa, Việt Nam, Thái Lan, Nhật Bản và Hàn Quốc, nấu theo
                    mùa và dọn theo kiểu sum vầy.
                </p>
            </div>
        </section>
    )
}