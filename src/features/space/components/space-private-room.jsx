import { Eyebrow } from "@/components/layout/eyebrow"

const specs = [
    { label: "Sức chứa", value: "Nhóm 8–12 khách" },
    { label: "Thực đơn", value: "Tư vấn theo từng dịp" },
    { label: "Đặt bàn", value: "Liên hệ để được hỗ trợ riêng" },
]


const urlImg = {
    label: "Sảnh đón khách",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/736x/16/f4/2f/16f42f228d49aabb93a75060be666dc5.jpg"
}

export function SpacePrivateRoom(){
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[1fr_640px]">
                    <div>
                        <Eyebrow className="text-[11px] tracking-[0.18em]">Phòng riêng</Eyebrow>
                        <h2 className="mt-[22px] font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">
                            Phòng riêng
                            <br />
                            cho những dịp riêng.
                        </h2>
                        <p className="mt-7 max-w-[520px] text-sm leading-[26px] text-muted-foreground">
                            Bữa cơm gia đình, buổi hẹn thân mật hay cuộc gặp đối tác. Để Trường Thọ chăm chút không gian và thực đơn, bạn chỉ cần tận hưởng khoảnh khắc.
                        </p>
                        <dl className="mt-9 border-t border-border text-[13px]">
                            {specs.map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-4 border-b border-border py-4 leading-4">
                                    <dt className="text-muted-foreground">{item.label}</dt>
                                    <dd className="text-right text-foreground">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <img
                        src={urlImg.imgUrl}
                        alt={urlImg.label}
                        loading="lazy"
                        className="h-72 w-full object-cover sm:h-96 lg:h-[480px]"
                    />
                </div>
            </div>
        </section>
    )
}