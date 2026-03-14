'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { UploadCloud, X, ChevronLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { getBusinessBySlug, getCategories, uploadProductImage, createProduct } from '@/lib/api/inventory-client';
import { slugify } from '@/lib/utils';

const productSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().optional(),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  stock: z.number().min(0, 'El stock no puede ser negativo'),
  category_id: z.string().min(1, 'Selecciona una categoría'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function CreateProductPage() {
  const { tenant } = useParams();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const business = await getBusinessBySlug(tenant as string);
        if (business) {
          setBusinessId(business.id);
          const cats = await getCategories(business.id);
          setCategories(cats || []);
        }
      } catch (error) {
        toast.error('Error al cargar datos del formulario');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [tenant]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: '',
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    if (!businessId) return;

    try {
      let image_url = null;
      if (selectedFile) {
        image_url = await uploadProductImage(selectedFile);
      }

      const productData = {
        ...data,
        business_id: businessId,
        slug: slugify(data.name),
        image_url,
      };

      await createProduct(productData);
      
      toast.success('Producto creado exitosamente', {
        className: 'bg-black text-white rounded-none border border-zinc-800 font-bold uppercase tracking-widest text-[10px]',
      });
      router.push('/admin/inventory');
    } catch (error) {
      toast.error('Error al guardar el producto');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-zinc-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/inventory" 
          className="p-2 -ml-2 text-zinc-400 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase">Nuevo Producto</h1>
          <p className="text-zinc-500 mt-1 font-medium tracking-wide text-sm">Define los detalles del nuevo artículo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Image Upload */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Imagen Principal
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
              className={`
                relative aspect-square border-2 border-dashed transition-all cursor-pointer overflow-hidden group
                ${imagePreview ? 'border-zinc-200' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-black/20'}
                ${isDragging ? 'border-black bg-zinc-100' : ''}
              `}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*"
              />
              
              <AnimatePresence mode="wait">
                {imagePreview ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full"
                  >
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/60 px-3 py-1.5">Cambiar Imagen</span>
                    </div>
                    <button 
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-black text-white flex items-center justify-center hover:bg-zinc-800 transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center w-full h-full p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-white border border-zinc-200 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <UploadCloud className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Click para subir</p>
                    <p className="text-[10px] text-zinc-400 mt-2">o arrastra la imagen aquí</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-medium uppercase tracking-tighter italic">
              * Resolución recomendada 1200x1200px. Máximo 5MB.
            </p>
          </div>
        </div>

        {/* Main Content: Form Details */}
        <div className="lg:col-span-2 space-y-8 bg-white p-6 md:p-10 border border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Name */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Nombre del Producto
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full h-12 px-0 bg-transparent border-b-2 outline-none transition-all placeholder:text-zinc-300 font-bold text-lg ${errors.name ? 'border-red-500 text-red-600' : 'border-zinc-100 focus:border-black'}`}
                placeholder="EJ. NEVERA DAEWOO 12 PIES"
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

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Descripción Detallada
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full p-4 bg-zinc-50 border border-zinc-100 focus:border-black focus:bg-white focus:outline-none transition-all resize-none text-sm leading-relaxed"
                placeholder="Provee una descripción clara para tus clientes..."
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Precio
              </label>
              <div className="relative">
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full h-11 px-4 bg-zinc-50 border border-zinc-100 focus:border-black focus:bg-white focus:outline-none transition-all font-bold"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label htmlFor="stock" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Stock Inicial
              </label>
              <div className="relative">
                <input
                  id="stock"
                  type="number"
                  {...register('stock', { valueAsNumber: true })}
                  className="w-full h-11 px-4 bg-zinc-50 border border-zinc-100 focus:border-black focus:bg-white focus:outline-none transition-all font-bold"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="category_id" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Categoría
              </label>
              <select
                id="category_id"
                {...register('category_id')}
                className="w-full h-11 px-4 bg-zinc-50 border border-zinc-100 focus:border-black focus:bg-white focus:outline-none transition-all font-bold text-xs uppercase appearance-none"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">{errors.category_id.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-end gap-4">
            <Link 
              href="/admin/inventory"
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
                'Guardar Producto'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
