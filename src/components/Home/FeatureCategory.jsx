import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
const items = [
  {
    title: "Món chính",
    description: "Nhẹ nhàng đánh thức vị giác",
    value: 60000,
  },
  {
    title: "Món Phụ",
    description: "Nhẹ nhàng đánh thức vị giác",
    value: 60000,
  },
  {
    title: "Món tráng miệng",
    description: "Nhẹ nhàng đánh thức vị giác",
    value: 60000,
  },
];

export function FeatureCategory() {
  return (
    <section className="max-w-7xl mx-auto space-y-4 py-16 flex items-center gap-5 ">
      <div className="space-y-4">
        <p className="uppercase font-serif tracking-widest">
          Mở ra một hành trình vị giác
        </p>
        <p className="text-2xl">Mỗi sở thích, một hương vị riêng.</p>
        <p className="text-muted-foreground pb-3">
          Từ món nhẹ mở đầu đến dư vị ngọt lành, tìm một món hợp ý bạn và một
          món để cùng sẻ chia.
        </p>

        <div className="flex flex-col ">
          {items.map((item) => (
            <div className="mb-5 ">
              <div className="flex justify-between">
                <div>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </div>
                <div>
                  <Button>
                    Xem ngay <ArrowUp></ArrowUp>
                  </Button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>

      <img
        className="aspect-4 w-full object-cover rounded-4xl"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS99iIJraz-oXnq9KfT51OJndwj9AnocSul7W7OToQvnVdR4bh5o2nrvvU&s=10"
        alt=""
      />
    </section>
  );
}
