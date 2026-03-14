import { notFound } from 'next/navigation';
import { PriceDisplay } from '@/components/ui/price-display';
import { getProductById } from '@/lib/api/products';
import { getBusinessBySlug } from '@/lib/api/business';
import ProductActions from './ProductActions';

import Image from 'next/image';

export default async function ProductDetailPage({ params }: { params: Promise<{ tenant: string, id: string }> }) {
  const { tenant, id } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) notFound();

  const dbProduct = await getProductById(id);

  if (!dbProduct || dbProduct.business_id !== business.id) {
    notFound();
  }

  const product = {
    id: dbProduct.id,
    title: dbProduct.name,
    category: dbProduct.business_categories?.name || 'General',
    price: dbProduct.base_price,
    image: dbProduct.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image',
    description: dbProduct.description || 'Sin descripción disponible.'
  };

  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="relative aspect-square bg-zinc-50 border border-zinc-200 overflow-hidden">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-cover mix-blend-multiply"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-4">{product.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6 uppercase">{product.title}</h1>
          
          <div className="mb-8">
            <PriceDisplay amount={product.price} className="text-3xl" vesClassName="text-lg mt-2 font-medium" />
          </div>
          
          <p className="text-lg text-zinc-700 leading-relaxed mb-12">
            {product.description}
          </p>

          <ProductActions 
            product={{
              id: product.id,
              name: product.title,
              price: product.price,
              image: product.image
            }} 
            tenantSlug={tenant}
          />

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <p className="text-sm text-zinc-500 uppercase tracking-widest">
              Retiro disponible en tiendas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
