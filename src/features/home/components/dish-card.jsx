export function DishCard({ imgUrl, title, content }) {
  return (
    <article className="border rounded-4xl  overflow-hidden h-full flex flex-col">
      <img
        src={imgUrl}
        alt=""
        className="aspect-4/3 w-full object-cover "
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-2xl font-serif ">{title}</p>
        <p className="line-clamp-2 text-muted-foreground">{content}</p>
       
      </div>
    </article>
  );
}
