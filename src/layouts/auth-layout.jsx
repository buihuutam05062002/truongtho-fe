import { Outlet } from "react-router-dom";
import { AuthBrand } from "@/features/auth/components/auth-brand";

export default function AuthLayout(){
    return (
        <main className="grid min-h-svh bg-background text-foreground lg:grid-cols-[1.1fr_1fr]">
            <aside className="relative hidden overflow-hidden border-r border-border lg:flex">
                <div className="absolute inset-0 opacity-70" style={{backgroundImage: "url(/seigaiha.svg)", backgroundSize: "100px 60px"}}></div>
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10"></div>
                <div className="relative z-10 flex w-full flex-col justify-between p-12">
                    <AuthBrand></AuthBrand>
                    <div className="max-w-md space-y-4">
                        <p className="font-serif text-5xl font-medium leading-tight">Tinh hoa trong từng món ăn</p>
                        <div className="h-px w-16 bg-primary"></div>
                        <p className="text-sm text-muted-foreground">Đăng nhập để đặt bàn và theo dõi ưu đãi dành riêng cho bạn</p>
                    </div>
                </div>
            </aside>

            <section className="flex items-center justify-center p-6 relative ">
                
                    <video className="z-0 absolute w-full h-full object-cover" src="https://res.cloudinary.com/hzjnf9ek/video/upload/v1792483173/Ch%C3%A2u_Tinh_Tr%C3%AC_-_Th%E1%BA%A7n_%C4%82n___L%E1%BB%93ng_ti%E1%BA%BFng_thuy%E1%BA%BFt_minh_HD_15_55-upscaled-upscaled-upscaled-upscaled_ilmjuf.mp4" loop autoPlay playsInline muted></video>
                      <div className="absolute inset-0 bg-black/60" />
                <div className="w-full max-w-sm space-y-8 z-10 bg-mist-700/60 p-4 rounded-2xl ">

                    <div className="lg:hidden">
                        <AuthBrand></AuthBrand>
                    </div>

                    <Outlet ></Outlet>
                </div>
            </section>
        </main>
    )
}