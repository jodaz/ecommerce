import Hero from './_components/home/Hero';
import ProductGrid from './_components/home/ProductGrid';
import PaymentBanner from './_components/home/PaymentBanner';
import { getBusinessBySlug, getPaymentMethodsForBusiness } from '@/lib/api/business';
import { getProductsForStore } from '@/lib/api/products';
import { notFound } from 'next/navigation';

export default async function Home({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  
  const business = await getBusinessBySlug(tenant);
  if (!business) {
    notFound();
  }

  const groupedProducts = await getProductsForStore(business.id);
  const paymentMethods = await getPaymentMethodsForBusiness(business.id);

  return (
    <div className="bg-white">
      <Hero storeName={business.name} />
      <ProductGrid groupedProducts={groupedProducts} />
      <PaymentBanner methods={paymentMethods} />
    </div>
  );
}
