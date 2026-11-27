import { Eyebrow } from "@/components/layout/eyebrow"





const slides = [
    {    
    label: "1",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/1200x/4d/63/e2/4d63e24764f30f64fc4dceedb0b953af.jpg"},
        {    
    label: "2",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/1200x/c7/0f/e7/c70fe7c7db706cf1a511312af2216d84.jpg"},
        {    
    label: "3",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/1200x/1f/df/cb/1fdfcbed2ebcfe3adc93f026f1b98467.jpg"},
        {    
    label: "4",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/736x/9b/5f/c0/9b5fc023c0d7b5f21431eaf6e8ad2c58.jpg"},
        {    
    label: "5",
    title: "Ấm cúng trong từng góc nhỏ",
    imgUrl: "https://i.pinimg.com/736x/70/51/30/705130a1502c7480d24fa03b7ccb5597.jpg"},
]

const gallery = [slides[0], slides[1], slides[2], slides[3], slides[4]]




export function SpaceGallery(){
    return (
        <section className="bg-card">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
                <div className="mb-11 space-y-[18px]">
                    <Eyebrow className="text-[11px] tracking-[0.18em]">Dạo một vòng không gian</Eyebrow>
                    <h2 className="font-serif text-3xl text-foreground lg:text-[44px] lg:leading-[57px]">Thư viện hình ảnh</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {gallery.map((item, i) => (
                        <img
                            key={`${item.label}-${i}`}
                            src={item.imgUrl}
                            alt={item.label}
                            loading="lazy"
                            className={
                                i === 0
                                    ? "col-span-2 h-56 w-full object-cover lg:row-span-2 lg:h-[400px]"
                                    : "h-36 w-full object-cover lg:h-[192px]"
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}