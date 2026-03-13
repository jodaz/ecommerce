'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Loader2, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { getBusinessBySlug, createCategory } from '@/lib/api/inventory-client';
import { slugify } from '@/lib/utils';

const categorySchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  has_page: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CreateCategoryPage() {
  const { tenant } = useParams();
  const router = useRouter();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      has_page: false,
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const business = await getBusinessBySlug(tenant as string);
        if (business) {
          setBusinessId(business.id);
        }
      } catch (error) {
        toast.error('Error al identificar la tienda');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tenant]);

  const onSubmit = async (data: CategoryFormValues) => {
    if (!businessId) return;

    try {
      const categoryData = {
        ...data,
        business_id: businessId,
        slug: slugify(data.name),
      };

      await createCategory(categoryData);
      
      toast.success('Categoría creada exitosamente', {
        className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]',
      });
      router.push('/admin/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Error al guardar la categoría');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Prepando Formulario...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/categories" 
          className="p-2 -ml-2 text-zinc-400 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">Nueva Categoría</h1>
          <p className="text-zinc-500 mt-1 font-medium tracking-wide text-sm">Organiza tu catálogo de productos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-zinc-200 p-8 shadow-sm">
        <div className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Nombre de la Categoría
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full h-12 px-0 bg-transparent border-b-2 outline-none transition-all placeholder:text-zinc-300 font-bold text-lg ${errors.name ? 'border-red-500 text-red-600' : 'border-zinc-100 focus:border-black'}`}
              placeholder="EJ. LÍNEA BLANCA"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  className="text-red-600 text-[10px] font-bold uppercase tracking-widest"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center justify-between p-5 bg-zinc-50 border border-zinc-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-zinc-200 flex items-center justify-center">
                <Tag className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black">Visibilidad en Web</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">Habilitar página propia para esta categoría</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="has_page"
                type="checkbox"
                {...register('has_page')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none dark:peer-focus:ring-black rounded-none peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-none after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-end gap-4">
          <Link 
            href="/admin/categories"
            className="w-full sm:w-auto px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors text-center"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] bg-black text-white hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Procesando</span>
              </>
            ) : (
              'Guardar Categoría'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
