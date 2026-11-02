export function DishCard({ imgUrl, title, content, value }) {
  return (
    <article className="border rounded-4xl  overflow-hidden h-full flex-col">
      <img
        src={imgUrl}
        alt=""
        className="aspect-4/3 w-full object-cover size-80"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-2xl font-serif ">{title}</p>
        <p className="line-clamp-2 text-muted-foreground">{content}</p>
        <p className="text-red-600">{value} đ</p>
      </div>
    </article>
  );
}
