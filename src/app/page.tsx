import Hero from '@/features/home/components/Hero';
import ProductRow from '@/features/products/components/ProductRow';
import PaymentBanner from '@/features/home/components/PaymentBanner';
import { getProductsByCategory } from '@/lib/data';

export default function Home() {
  const groupedProducts = getProductsByCategory();

  return (
    <div className="bg-white">
      <Hero />
      <div className="bg-white">
        {Object.entries(groupedProducts).map(([categoryName, items]) => (
          <ProductRow key={categoryName} title={categoryName} items={items} />
        ))}
      </div>
      <PaymentBanner />
    </div>
  );
}
