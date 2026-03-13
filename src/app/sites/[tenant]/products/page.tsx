import Link from 'next/link';
import Image from 'next/image';
import { getBusinessBySlug } from '@/lib/api/business';
import { getAllProductsForBusiness } from '@/lib/api/products';
import { notFound } from 'next/navigation';
import { PriceDisplay } from '@/components/ui/price-display';

export default async function ProductsPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) {
    notFound();
  }

  const dbProducts = await getAllProductsForBusiness(business.id);
  const products = dbProducts.map((p: any) => ({
    id: p.id,
    title: p.name,
    category: p.business_categories?.name || 'General',
    price: p.base_price,
    image: p.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image'
  }));
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 flex-1">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-8 md:mb-12 uppercase">
        Catálogo de Productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-12">
        {products.map((product: any) => (
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
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{product.category}</span>
              <h3 className="text-base md:text-lg font-bold text-black">{product.title}</h3>
              <PriceDisplay amount={product.price} className="mt-1 md:mt-2 text-base md:text-lg" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
