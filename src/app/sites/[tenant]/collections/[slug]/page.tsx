import Link from 'next/link';
import Image from 'next/image';
import { getBusinessBySlug } from '@/lib/api/business';
import { getProductsByCategorySlug } from '@/lib/api/products';
import { notFound } from 'next/navigation';
import { PriceDisplay } from '@/components/ui/price-display';

export default async function CollectionPage({ 
  params 
}: { 
  params: Promise<{ tenant: string, slug: string }> 
}) {
  const { tenant, slug } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) {
    notFound();
  }

  const result = await getProductsByCategorySlug(business.id, slug);
  if (!result || !result.category.has_page) {
    notFound();
  }

  const { category, products } = result;

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex-1">
      <div className="mb-12">
        <span className="text-sm font-black uppercase tracking-[0.2em] text-emerald-600 mb-2 block">Colección</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase">
          {category.name}
        </h1>
        <div className="h-2 w-24 bg-black mt-4"></div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-zinc-500 font-medium uppercase tracking-widest bg-zinc-50 border-2 border-dashed border-zinc-200">
          No hay productos en esta colección todavía.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col">
              <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden bg-zinc-50 border border-zinc-200 group-hover:border-black transition-colors">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="flex flex-col gap-1 text-balance">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{category.name}</span>
                <h3 className="text-base md:text-lg font-bold text-black uppercase leading-tight">{product.title}</h3>
                <PriceDisplay amount={product.price} className="mt-1 md:mt-2 text-base md:text-lg" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
