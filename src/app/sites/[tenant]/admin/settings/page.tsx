'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadCloud, Facebook, Instagram, Twitter, ExternalLink, Pencil, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/stores/adminStore';

const settingsSchema = z.object({
  companyName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().optional(),
  facebook: z.string().url('URL inválida').or(z.literal('')),
  instagram: z.string().url('URL inválida').or(z.literal('')),
  tiktok: z.string().url('URL inválida').or(z.literal('')),
  twitter: z.string().url('URL inválida').or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const { categories, deleteCategory, users, deleteUser } = useAdminStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: 'simpleshop',
      description: 'Tienda simpleshop. Los mejores precios en línea blanca, tecnología y hogar.',
      facebook: '',
      instagram: '',
      tiktok: '',
      twitter: '',
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log('Settings data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Configuración guardada correctamente');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-zinc-500 mt-2">Administrar perfil de la empresa, redes sociales, categorías y usuarios</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white border border-zinc-200 p-6 md:p-8">
        {/* Company Logo Upload Area */}
        <div className="space-y-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
            Logo de la Empresa
          </label>
          <div className="border-2 border-dashed border-zinc-200 p-6 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer min-h-[160px]">
            <UploadCloud className="w-8 h-8 text-zinc-400 mb-3" />
            <p className="text-sm font-semibold text-zinc-600">Subir nuevo logo</p>
            <p className="text-xs text-zinc-400 mt-1">Recomendado: 512x512px (PNG, JPG)</p>
          </div>
        </div>

        {/* Company Profile */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold tracking-tight border-b border-zinc-200 pb-2">Perfil de la Empresa</h2>
          
          <div className="space-y-2">
            <label htmlFor="companyName" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Nombre de la Empresa
            </label>
            <input
              id="companyName"
              type="text"
              {...register('companyName')}
              className={`w-full h-11 px-4 border ${errors.companyName ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
            />
            {errors.companyName && <p className="text-red-500 text-xs font-semibold">{errors.companyName.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Descripción Corta
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full p-4 border border-zinc-200 focus:outline-none focus:border-black transition-colors rounded-none resize-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-6 pt-4">
          <h2 className="text-lg font-bold tracking-tight border-b border-zinc-200 pb-2">Redes Sociales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="instagram" className="block text-sm font-bold uppercase tracking-widest text-zinc-800 flex items-center gap-2">
                <Instagram className="w-4 h-4" /> URL de Instagram
              </label>
              <input
                id="instagram"
                type="url"
                {...register('instagram')}
                className={`w-full h-11 px-4 border ${errors.instagram ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                placeholder="https://instagram.com/"
              />
              {errors.instagram && <p className="text-red-500 text-xs font-semibold">{errors.instagram.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="facebook" className="block text-sm font-bold uppercase tracking-widest text-zinc-800 flex items-center gap-2">
                <Facebook className="w-4 h-4" /> URL de Facebook
              </label>
              <input
                id="facebook"
                type="url"
                {...register('facebook')}
                className={`w-full h-11 px-4 border ${errors.facebook ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                placeholder="https://facebook.com/"
              />
              {errors.facebook && <p className="text-red-500 text-xs font-semibold">{errors.facebook.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="tiktok" className="block text-sm font-bold uppercase tracking-widest text-zinc-800 flex items-center gap-2">
                URL de TikTok
              </label>
              <input
                id="tiktok"
                type="url"
                {...register('tiktok')}
                className={`w-full h-11 px-4 border ${errors.tiktok ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                placeholder="https://tiktok.com/"
              />
              {errors.tiktok && <p className="text-red-500 text-xs font-semibold">{errors.tiktok.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="twitter" className="block text-sm font-bold uppercase tracking-widest text-zinc-800 flex items-center gap-2">
                <Twitter className="w-4 h-4" /> URL de X (Twitter)
              </label>
              <input
                id="twitter"
                type="url"
                {...register('twitter')}
                className={`w-full h-11 px-4 border ${errors.twitter ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
                placeholder="https://x.com/"
              />
              {errors.twitter && <p className="text-red-500 text-xs font-semibold">{errors.twitter.message}</p>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-zinc-200 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>

      {/* Categories CRUD Table */}
      <div className="space-y-6 bg-white border border-zinc-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
          <h2 className="text-lg font-bold tracking-tight">Categorías</h2>
          <Link 
            href="/admin/settings/categories/new"
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
          >
            Nueva Categoría
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-200">Nombre</th>
                <th className="px-6 py-4 border-b border-zinc-200">Página Web</th>
                <th className="px-6 py-4 border-b border-zinc-200 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{c.name}</td>
                  <td className="px-6 py-4">
                    {c.has_page ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs uppercase tracking-widest">
                        <Check className="w-4 h-4" /> Activa
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-400 font-semibold text-xs uppercase tracking-widest">
                        <X className="w-4 h-4" /> Oculta
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-zinc-500 hover:text-black transition-colors" title="Editar">
                      <Pencil className="w-5 h-5 inline-block" />
                    </button>
                    <button onClick={() => deleteCategory(c.id)} className="text-zinc-500 hover:text-red-600 transition-colors" title="Eliminar">
                      <Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">No hay categorías registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users CRUD Table */}
      <div className="space-y-6 bg-white border border-zinc-200 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200">
          <h2 className="text-lg font-bold tracking-tight">Usuarios</h2>
          <Link 
            href="/admin/settings/users/new"
            className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
          >
            Nuevo Usuario
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 uppercase tracking-widest text-xs font-semibold text-zinc-500">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-200">Nombre</th>
                <th className="px-6 py-4 border-b border-zinc-200">Correo Electrónico</th>
                <th className="px-6 py-4 border-b border-zinc-200">Rol</th>
                <th className="px-6 py-4 border-b border-zinc-200 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{u.name}</td>
                  <td className="px-6 py-4 text-zinc-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 bg-zinc-100 font-semibold text-xs tracking-widest border border-zinc-200">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-zinc-500 hover:text-black transition-colors" title="Editar">
                      <Pencil className="w-5 h-5 inline-block" />
                    </button>
                    <button onClick={() => deleteUser(u.id)} className="text-zinc-500 hover:text-red-600 transition-colors" title="Eliminar">
                      <Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">No hay usuarios registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
