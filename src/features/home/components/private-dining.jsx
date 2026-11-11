import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Link } from "react-router-dom";
const occasions = ["Sum họp gia đình", "Tiệc thân mật", "Gặp gỡ đối tác"];

export function PrivateDining() {
  return (
    <Section
      id="khong-gian"
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <img
        src="https://luhanhvietnam.com.vn/du-lich/vnt_upload/news/10_2024/4nha_hng_view_dep_o_hue3.jpg"
        alt="Không gian nhà hàng Trường Thọ"
        loading="lazy"
        className="aspect-4/5 w-full rounded-lg object-cover"
      />
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Những cuộc hẹn đáng nhớ</p>
        <h2 className="font-serif text-3xl text-foreground lg:text-5xl">Có những dịp, chỉ cần bê nhau.</h2>
        <p className="text-muted-foreground">Bữa cơm gia đình, buổi hẹn thân mật hay cuộc gặp đối tác. Để Trường Thọ chăm chút không gian và thực đơn, bạn chỉ cần tận hưởng khoảnh khắc.</p>
        <ul className="flex flex-wrap gap-3">
            {occasions.map((text) => (
                <li key={text} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground ">{text}</li>
            ))}
        </ul>
        <Button className="h-10 px-4" nativeButton={false} render={<Link to="/home#lien-he">Tư vấn tiệc &amp; phòng riêng <ArrowRight/></Link>} ></Button>
      </div>
    </Section>
  );
}
