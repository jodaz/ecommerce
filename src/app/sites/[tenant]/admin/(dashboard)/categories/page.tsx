'use client';

import Link from 'next/link';
import { Tag, Pencil, Trash2, Plus, Loader2, Check, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getCategories, deleteCategory, getBusinessBySlug } from '@/lib/api/inventory-client';

export default function AdminCategoriesPage() {
  const { tenant } = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const business = await getBusinessBySlug(tenant as string);
        if (business) {
          setBusinessId(business.id);
          const data = await getCategories(business.id);
          setCategories(data || []);
        }
      } catch (error) {
        toast.error('Error al cargar las categorías');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tenant]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${name}"? Los productos asociados podrían perder su referencia.`)) {
      try {
        await deleteCategory(id);
        setCategories(prev => prev.filter(c => c.id !== id));
        toast.success('Categoría eliminada correctamente', {
          className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]',
        });
      } catch (error) {
        toast.error('Error al eliminar la categoría');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Cargando Categorías...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase text-black">Categorías</h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">Organiza tus productos por secciones</p>
        </div>
        <Link 
          href="/admin/categories/new"
          className="group relative inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-95 shrink-0 rounded-none shadow-sm"
        >
          <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
          <span>Nueva Categoría</span>
        </Link>
      </div>

      {/* Mobile Card Layout (< md) */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="popLayout">
          {categories.map((c) => (
            <motion.div 
              key={c.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-zinc-200 p-5 space-y-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black uppercase tracking-tight">{c.name}</h3>
                    <p className="text-[10px] text-zinc-400 font-bold tracking-widest mt-0.5">/{c.slug}</p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] border ${c.has_page ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-zinc-50 text-zinc-400 border-zinc-100'}`}>
                  {c.has_page ? 'Visible' : 'Oculta'}
                </div>
              </div>
              
              <div className="flex border-t border-zinc-100 pt-4 gap-3">
                <Link 
                  href={`/admin/categories/${c.id}/edit`}
                  className="flex-1 bg-black text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(c.id, c.name)}
                  className="flex-1 bg-white border border-zinc-200 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2"
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
      <div className="hidden md:block bg-white border border-zinc-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Nombre</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Slug / URL</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Visibilidad</th>
              <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            <AnimatePresence mode="popLayout">
              {categories.map((c) => (
                <motion.tr 
                  key={c.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="group hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <Tag className="w-4 h-4 text-zinc-300 group-hover:text-black transition-colors" />
                       <span className="font-bold text-black tracking-tight uppercase">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <code className="text-[10px] bg-zinc-100 px-2 py-1 text-zinc-500 font-mono">/{c.slug}</code>
                  </td>
                  <td className="px-6 py-5">
                    {c.has_page ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        <Check className="w-3.5 h-3.5" /> Página Activa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                        <X className="w-3.5 h-3.5" /> Página Oculta
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1.5 translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <Link 
                        href={`/admin/categories/${c.id}/edit`}
                        className="p-2.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all active:scale-95" 
                        title="Editar"
                      >
                        <Pencil className="w-5 h-5" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(c.id, c.name)}
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
        {categories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed border-zinc-100 bg-white"
          >
            <Tag className="w-12 h-12 text-zinc-100 mx-auto mb-4" />
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No hay categorías registradas</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
