'use client';

import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { formatUsd } from '@/lib/currency-shared';

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  tenantSlug: string;
}

export default function ProductActions({ product, tenantSlug }: ProductActionsProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      tenantSlug: tenantSlug,
    });
  };

  const whatsappMsg = encodeURIComponent(`Hola, estoy interesado en el producto: ${product.name} (${formatUsd(product.price)}). ¿Tienen disponibilidad?`);
  const whatsappUrl = `https://wa.me/5804121833072?text=${whatsappMsg}`;

  return (
    <div className="flex flex-col gap-4">
      <button 
        onClick={handleAddToCart}
        className="w-full bg-white text-black border-2 border-black h-14 flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors"
      >
        <ShoppingCart size={20} />
        Añadir al carrito
      </button>

      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full bg-black text-white h-14 flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
      >
        <ShoppingBag size={20} />
        Comprar por WhatsApp
      </a>
    </div>
  );
}
