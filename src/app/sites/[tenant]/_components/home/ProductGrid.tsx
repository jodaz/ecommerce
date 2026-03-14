import ProductRow from '@/features/products/components/ProductRow';
import { CategoryGroup } from '@/features/products/types/product';

interface ProductGridProps {
  groupedProducts: CategoryGroup[];
}

export default function ProductGrid({ groupedProducts }: ProductGridProps) {
  if (groupedProducts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 bg-white">
        No hay productos disponibles en esta tienda.
      </div>
    );
  }

  return (
    <div className="bg-white">
      {groupedProducts.map((group, index) => (
        <ProductRow 
          key={group.slug} 
          title={group.name} 
          items={group.items} 
          slug={group.slug}
          hasPage={group.hasPage}
          index={index} 
        />
      ))}
    </div>
  );
}
