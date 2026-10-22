import { MoveUpRight, MoveRight } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div>
      <div className="relative min-h-svh flex flex-col ">
        <img
          src="https://res.cloudinary.com/hzjnf9ek/image/upload/v1792572509/download_2026-10-21_08_44_12.414523_cgcrfa.webp"
          alt=""
          className="z-0 absolute w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="z-20  my-auto ">
          <p className="uppercase">Trọn vị á đông - trọn tính sum vầy</p>
          <h1>Tinh hoa hội tụ</h1>
          <h1>Vị ngon trường tồn</h1>
          <p>
            Một hành trình vị giác á đông, nơi mỗi món ăn được nâng niu và mỗi
            cuộc gặp gỡ trở nên đáng nhớ
          </p>
          <div>
            <Button className="">
              Đặt bàn ngay <MoveUpRight />
            </Button>
            <Button>
              Xem thực đơn <MoveRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-10 py-5">
        <p className="uppercase">Dành cho những khoảng khắc bên nhau</p>
        <p className="">Khám phá Trường thọ</p>
      </div>
    </div>
  );
}
