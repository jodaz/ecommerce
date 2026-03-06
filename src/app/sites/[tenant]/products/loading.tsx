export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex-1 animate-pulse">
      <div className="h-8 md:h-12 bg-zinc-100 rounded w-1/2 mb-8 md:mb-12" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-square bg-zinc-100 border border-zinc-200" />
            <div className="h-3 bg-zinc-100 rounded w-1/3" />
            <div className="h-5 bg-zinc-100 rounded w-3/4" />
            <div className="h-5 bg-zinc-100 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
