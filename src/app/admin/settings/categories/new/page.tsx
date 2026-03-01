'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAdminStore } from '@/stores/adminStore';

const categorySchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  has_page: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export default function CreateCategoryPage() {
  const router = useRouter();
  const { addCategory } = useAdminStore();

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

  const onSubmit = async (data: CategoryFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate API call
    addCategory(data);
    router.push('/admin/settings');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Configuración
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Nueva Categoría</h1>
        <p className="text-zinc-500 mt-2">Crea una nueva categoría para organizar tus productos</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-zinc-200 p-6 md:p-8">
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Nombre de la Categoría
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full h-11 px-4 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
              placeholder="Ej. Línea Blanca"
            />
            {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name.message}</p>}
          </div>

          <div className="flex items-center justify-between p-4 border border-zinc-200">
            <div className="space-y-1">
              <label htmlFor="has_page" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
                Mostrar como Página Web
              </label>
              <p className="text-xs text-zinc-500">
                Si está activo, esta categoría será visible como una sección principal en la página web pública.
              </p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" className="sr-only peer" {...register('has_page')} />
              <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-zinc-200 flex gap-4 justify-end">
          <Link
            href="/admin/settings"
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-black transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}
