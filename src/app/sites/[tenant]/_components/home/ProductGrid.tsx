import ProductRow from '@/features/products/components/ProductRow';

interface ProductGridProps {
  groupedProducts: Record<string, any[]>;
}

export default function ProductGrid({ groupedProducts }: ProductGridProps) {
  const hasProducts = Object.entries(groupedProducts).length > 0;

  if (!hasProducts) {
    return (
      <div className="py-20 text-center text-gray-500 bg-white">
        No hay productos disponibles en esta tienda.
      </div>
    );
  }

  return (
    <div className="bg-white">
      {Object.entries(groupedProducts).map(([categoryName, items]) => (
        <ProductRow key={categoryName} title={categoryName} items={items} />
      ))}
    </div>
  );
}
