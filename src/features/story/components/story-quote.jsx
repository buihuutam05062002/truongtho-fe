const BG_IMG = "https://i.pinimg.com/736x/f9/ac/cc/f9accc2d27001bf4f52a05622e161e6d.jpg"

export function StoryQuote(){
    return (
        <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden lg:h-[400px]">
            <img src={BG_IMG} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-[#131210]/62"></div>
            <div className="relative z-10 space-y-5 px-6 py-16 text-center">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#bca27a]">Tinh thần Trường Thọ</p>
                <p className="font-serif text-4xl leading-[1.25] text-[#f2e9dc] lg:text-[54px] lg:leading-[68px]">
                    Chậm một nhịp.
                    <br />
                    Đậm một vị.
                </p>
            </div>
        </section>
    )
}