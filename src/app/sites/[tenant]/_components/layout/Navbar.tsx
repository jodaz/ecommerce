'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/stores/cartStore';
import CartSidebar from '@/components/layout/CartSidebar';
import { useParams } from 'next/navigation';

interface NavbarProps {
  business: {
    name: string;
    logo_url?: string;
    slug?: string;
  };
  usdRate: number;
}

export default function Navbar({ business, usdRate }: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const params = useParams();
  const tenant = (params?.tenant as string) || business?.slug || '';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const logoUrl = business?.logo_url || '/logo.svg';
  const businessName = business?.name || 'simpleshop';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
              <Image 
                src={logoUrl} 
                alt={`${businessName} logo`} 
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-black hidden sm:block transition-colors uppercase">
              {businessName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
              Catálogo
            </Link>
            <Link href="/locations" className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
              Ubicaciones
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-zinc-100 rounded-full transition-colors group"
              aria-label="Abrir carrito"
            >
              <ShoppingCart size={24} className="text-black group-hover:scale-110 transition-transform" />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {itemCount}
                </span>
              )}
            </button>
            <div className="flex md:hidden">
              <span className="text-sm font-bold uppercase">Menú</span>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        tenantSlug={tenant}
        usdRate={usdRate}
      />
    </>
  );
}
