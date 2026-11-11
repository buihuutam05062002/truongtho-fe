import { MoveUpRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <div>
      <div className="relative flex min-h-[calc(100svh-4.25rem)] flex-col overflow-hidden">
        <img
          src="https://res.cloudinary.com/hzjnf9ek/image/upload/v1792572509/download_2026-10-21_08_44_12.414523_cgcrfa.webp"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 lg:to-transparent" />

        <div className="relative z-10 mx-auto flex flex-1 w-full  items-center px-6 py-16 lg:px-10 ">
          <div className="max-w-2xl space-y-6 text-white px-20">
            <p className="text-xs uppercase tracking-[0.2em] text-[#bca27a]">
              Trọn vị Á Đông - trọn tình sum vầy
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Tinh hoa hội tụ
              <br />
              <span className="text-[#bca27a]">Vị ngon trường tồn</span>
            </h1>
            <p className="max-w-lg text-base text-white/80 lg:text-lg">
              Một hành trình vị giác Á Đông, nơi mỗi món ăn được nâng niu và mỗi
              cuộc gặp gỡ trở nên đáng nhớ.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                className="h-11 px-5 text-sm"
                nativeButton={false}
                render={<Link to="/dat-ban" />}
              >
                Đặt bàn ngay <MoveUpRight />
              </Button>
              <Button
                variant="outline"
                className="h-11 border-white/40 bg-transparent px-5 text-sm text-white hover:bg-white/10 hover:text-white dark:bg-transparent dark:hover:bg-white/10"
                nativeButton={false}
                render={<Link to="/home#thuc-don" />}
              >
                Xem thực đơn <MoveRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
