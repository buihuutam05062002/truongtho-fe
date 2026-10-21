import { Label } from "../ui/label";
import { Button } from "../ui/button";
export function Header() {
  return (
    <div className="lg:flex items-center justify-around">
      <div className="flex items-center gap-3 px-8">
        <a href="">
          <img src="/logo.webp" alt="" className="size-11 rounded-full" />
        </a>
        <div>
          <Label>Trường Thọ</Label>
          <p>
            <small>Ẩm thực việt nam</small>
          </p>
        </div>
      </div>
      <div>
        <ul className="lg:flex gap-3">
          <li className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-1/2">
            <a href="">Trang Chủ</a>
          </li>
          <li className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-1/2">
            <a href="">Câu chuyện</a>
          </li>
          <li className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-1/2">
            <a href="">Thực đơn</a>
          </li>
          <li className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-1/2">
            <a href="">Không gian</a>
          </li>
          <li className="relative w-fit after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-red-700 after:transition-all after:duration-300 hover:after:w-1/2">
            <a href="">Liên hệ</a>
          </li>
        </ul>
      </div>
      <div>
        <Button>Đặt bàn ngay</Button>
      </div>
    </div>
  );
}
