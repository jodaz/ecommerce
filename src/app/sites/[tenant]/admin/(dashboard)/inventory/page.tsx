'use client';

import Link from 'next/link';
import { ExternalLink, Check, X, Pencil, Trash2, Image as ImageIcon, Plus, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProducts, deleteProduct, getBusinessBySlug } from '@/lib/api/inventory-client';

export default function AdminInventoryPage() {
  const { tenant } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [bcvRate, setBcvRate] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const business = await getBusinessBySlug(tenant as string);
        
        // Fetch Akomo global rates directly from client proxy or original API
        try {
          const res = await fetch('https://api.akomo.xyz/api/exchange-rates');
          if (res.ok) {
            const data = await res.json();
            const usdLabel = data?.rates?.find((r: any) => r.label === 'USD')?.value;
            if (usdLabel) setBcvRate(parseFloat(usdLabel.replace(',', '.')));
          }
        } catch (e) {
          console.error('Failed to get explicit client side rate for inventory', e);
        }

        if (business) {
          setBusinessId(business.id);
          const data = await getProducts(business.id);
          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error loading inventory:', error);
        toast.error('Error al cargar el inventario');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tenant]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Producto eliminado correctamente', {
          className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]',
        });
      } catch (error) {
        toast.error('Error al eliminar el producto');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Cargando Inventario...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase text-black">Inventario</h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">Gestión de productos y niveles de stock</p>
        </div>
        <Link 
          href="/admin/inventory/new"
          className="group relative inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95 shrink-0 rounded-none shadow-sm"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      {/* Mobile Card Layout (< md) */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {products.map((p) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 p-4 space-y-4 group active:bg-zinc-50 transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0 overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-zinc-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-black truncate pr-4">{p.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.business_categories?.name && (
                      <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                        {p.business_categories.name}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                        Precio
                      </span>
                      <span className="font-bold text-black tracking-tight mt-0.5">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.base_price)}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-500">
                        Bs. {new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(p.base_price * bcvRate)}
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-zinc-100 pl-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                        Stock
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-widest mt-1.5 ${p.stock === 0 ? 'text-red-600' : 'text-zinc-900'}`}>
                        {p.stock === 0 ? 'AGOTADO' : p.stock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-t border-zinc-100 pt-3 gap-2">
                <Link 
                  href={`/admin/inventory/${p.id}/edit`}
                  className="flex-1 bg-zinc-50 border border-zinc-200 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(p.id, p.name)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 py-2.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Table Layout (>= md) */}
      <div className="hidden md:block bg-white border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 w-24">Imagen</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Producto</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Categoría</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Precio</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Stock</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            <AnimatePresence mode="popLayout">
              {products.map((p) => (
                <motion.tr 
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="group hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="w-14 h-14 bg-zinc-100 flex items-center justify-center border border-zinc-200 group-hover:border-zinc-300 transition-colors overflow-hidden">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-zinc-300 group-hover:text-zinc-400 transition-colors" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-black tracking-tight">{p.name}</span>
                  </td>
                  <td className="px-6 py-5">
                    {p.business_categories?.name && (
                      <span className="inline-flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:bg-white transition-colors">
                        {p.business_categories.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-black tracking-tight leading-none">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p.base_price)}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-500 mt-1">
                        Bs. {new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(p.base_price * bcvRate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-xs font-bold tracking-widest ${p.stock === 0 ? 'text-red-600' : 'text-black'}`}>
                      {p.stock === 0 ? 'AGOTADO' : p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5 translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Link 
                        href={`/admin/inventory/${p.id}/edit`}
                        className="p-2.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all active:scale-95" 
                        title="Editar"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-2.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all active:scale-95 border border-transparent hover:border-red-100" 
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {products.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-zinc-100 bg-white"
          >
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No hay productos en el inventario</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
