import Hero from '@/components/home/Hero';
import ProductRow from '@/components/home/ProductRow';
import PaymentBanner from '@/components/home/PaymentBanner';
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
