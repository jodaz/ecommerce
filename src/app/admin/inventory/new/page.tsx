'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { UploadCloud } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  stock: z.number().min(0, 'El stock no puede ser negativo'),
  delivery: z.boolean(),
  categories: z.string().min(1, 'Agrega al menos una categoría'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      stock: 0,
      delivery: false,
      categories: '',
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    // Simulate API call
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Producto guardado correctamente');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Producto</h1>
        <p className="text-zinc-500 mt-2">Agrega un nuevo producto al inventario</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 border border-zinc-200">
        
        {/* Image Upload Area */}
        <div className="space-y-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
            Imagen del Producto
          </label>
          <div className="border-2 border-dashed border-zinc-200 p-8 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer min-h-[200px]">
            <UploadCloud className="w-10 h-10 text-zinc-400 mb-4" />
            <p className="text-sm font-semibold text-zinc-600">Arrástrala aquí o haz clic para subir</p>
            <p className="text-xs text-zinc-400 mt-2">PNG, JPG hasta 5MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full h-11 px-4 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
              placeholder="Ej. Nevera Daewoo 12 Pies"
            />
            {errors.name && <p className="text-red-500 text-xs font-semibold">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Descripción
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full p-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none resize-none"
              placeholder="Describe el producto..."
            />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className={`w-full h-11 px-4 border ${errors.stock ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
            />
            {errors.stock && <p className="text-red-500 text-xs font-semibold">{errors.stock.message}</p>}
          </div>

          {/* Delivery & Categories */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="categories" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
                Categorías
              </label>
              <input
                id="categories"
                type="text"
                {...register('categories')}
                className={`w-full h-11 px-4 border ${errors.categories ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                placeholder="Ej. Hogar, Electrónica"
              />
              {errors.categories && <p className="text-red-500 text-xs font-semibold">{errors.categories.message}</p>}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="delivery"
                type="checkbox"
                {...register('delivery')}
                className="w-5 h-5 accent-black border-zinc-200 cursor-pointer"
              />
              <label htmlFor="delivery" className="text-sm font-bold uppercase tracking-widest text-zinc-800 cursor-pointer">
                Disponible para envío
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-zinc-200 flex items-center justify-end gap-4">
          <Link 
            href="/admin/inventory"
            className="px-6 py-3 text-sm font-bold uppercase tracking-widest border border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}
