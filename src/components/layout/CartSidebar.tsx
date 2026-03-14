'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { PriceDisplayClient } from '@/components/ui/price-display-client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tenantSlug: string;
  usdRate: number;
}

export default function CartSidebar({ isOpen, onClose, usdRate }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-black" size={24} />
                <h2 className="text-xl font-bold uppercase tracking-tight">Tu Carrito</h2>
                <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center">
                    <ShoppingCart size={40} className="text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-zinc-500 font-medium uppercase tracking-widest text-sm">Tu carrito está vacío</p>
                    <button
                      onClick={onClose}
                      className="mt-4 text-black font-bold underline uppercase tracking-widest text-xs hover:text-zinc-600"
                    >
                      Continuar comprando
                    </button>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-24 w-24 flex-shrink-0 bg-zinc-50 border border-zinc-100 rounded overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-bold uppercase tracking-tight text-black line-clamp-1">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-1">
                          <PriceDisplayClient 
                            amount={item.price} 
                            exchangeRate={usdRate}
                            className="text-sm font-medium" 
                            vesClassName="text-[10px]" 
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-zinc-200 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-zinc-100 transition-colors text-zinc-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-zinc-100 transition-colors text-zinc-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-sm font-bold">
                          <PriceDisplayClient 
                            amount={item.price * item.quantity} 
                            exchangeRate={usdRate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500 uppercase font-bold tracking-widest text-xs">Total</span>
                  <div className="text-right">
                    <PriceDisplayClient 
                      amount={total} 
                      exchangeRate={usdRate}
                      className="text-2xl font-black text-black" 
                      vesClassName="text-sm font-medium mt-1" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={clearCart}
                    className="flex items-center justify-center gap-2 h-12 border border-zinc-200 bg-white text-zinc-600 font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Limpiar
                  </button>
                  <Link
                    href={`/checkout`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 h-12 bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors shadow-lg"
                  >
                    <CreditCard size={16} />
                    Comprar
                  </Link>
                </div>
                
                <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest">
                  Los precios en bolívares se calculan a la tasa del día
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
