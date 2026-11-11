import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout/section";
const items = [
  { title: "Món chính", description: "Nhẹ nhàng đánh thức vị giác" },
  { title: "Món phụ", description: "Nhẹ nhàng đánh thức vị giác" },
  { title: "Món tráng miệng", description: "Nhẹ nhàng đánh thức vị giác" },
];

export function FeatureCategory() {
  return (
    <Section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SectionHeader
          className="mb-4"
          eyebrow="Mở ra một hành tình vị giác"
          title="Mỗi sở thích, một hương vị riêng"
        ></SectionHeader>
        <p className="mb-8 max-w-xl text-muted-foreground">
          Từ món nhẹ mở đầu đến dư vị ngọt lành, tìm một món hợp ý bạn và một
          món để cùng sẻ chia.
        </p>
        <ul className="border-t border-border">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-between gap-4 border-b border-border py-5"
            >
              <div>
                <p className="font-serif text-2xl text-foreground">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Button variant="outline" className="h-9 shrink-0 px-4">
                Xem ngay <ArrowUp />
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS99iIJraz-oXnq9KfT51OJndwj9AnocSul7W7OToQvnVdR4bh5o2nrvvU&s=10"
        alt="Các món ăn tại nhà hàng Trường Thọ"
        loading="lazy"
        className="aspect-4/3 w-full rounded-lg object-cover"
      />
    </Section>
  );
}
