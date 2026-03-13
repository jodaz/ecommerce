import Hero from '@/features/home/components/Hero';
import ProductRow from '@/features/products/components/ProductRow';
import PaymentBanner from '@/features/home/components/PaymentBanner';
import { getBusinessBySlug } from '@/lib/api/business';
import { getProductsForStore } from '@/lib/api/products';
import { notFound } from 'next/navigation';

export default async function Home({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) {
    notFound();
  }

  const groupedProducts = await getProductsForStore(business.id);

  return (
    <div className="bg-white">
      <Hero storeName={business.name} />
      <div className="bg-white">
        {Object.entries(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([categoryName, items]) => (
            <ProductRow key={categoryName} title={categoryName} items={items} />
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            No hay productos disponibles en esta tienda.
          </div>
        )}
      </div>
      <PaymentBanner />
    </div>
  );
}
