'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@supabase/supabase-js';
import { Store, ChevronRight, LogOut, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type OnboardingWizardProps = {
  initialUser: User | null;
};

// Form schema for shop setup
const storeSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  domain: z.string()
    .min(3, 'El dominio debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
});

type StoreFormValues = z.infer<typeof storeSchema>;

export default function OnboardingWizard({ initialUser }: OnboardingWizardProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<StoreFormValues>({
    resolver: zodResolver(storeSchema),
  });

  const supabase = createClient();

  const handleStoreSetup = async (data: StoreFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al crear la tienda');
      }

      // Handoff to subdomain!
      const storeDomain = result.store.domain;
      const { data: sessionData } = await supabase.auth.getSession();
      
      const token = sessionData.session?.access_token;
      const refresh = sessionData.session?.refresh_token;

      if (!token || !refresh) {
        throw new Error('Fallo crítico: No se encontró la sesión actual');
      }

      const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const portTxt = process.env.NODE_ENV === 'production' ? '' : ':3000';
      
      const newHostUrl = `${protocol}://${storeDomain}.${rootDomain}${portTxt}`;
      // Inicia el Token Handoff Redirect
      window.location.href = `${newHostUrl}/auth/sync?token=${token}&refresh=${refresh}&next=/`;

    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (!user) {
    // Paso 1: Autenticación
    return (
      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl md:rounded-[2rem] shadow-2xl relative group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 blur-[40px] rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-gray-800 bg-gray-950 text-emerald-400 text-xs font-bold tracking-widest uppercase">Paso 1 / 2</div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Tu Identidad</h2>
          <p className="text-sm font-light text-gray-400">Verifica tu cuenta para asegurar tu negocio</p>
        </div>

        <a
          href="/api/auth/google"
          className="w-full h-14 flex items-center justify-center gap-3 border border-gray-700 bg-gray-800/80 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-800 hover:border-emerald-500/50 transition-all active:scale-[0.98] rounded-xl relative z-10 shadow-lg"
        >
          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </a>

        <div className="mt-8 text-center relative z-10">
           <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-light text-gray-500">
            <div className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Seguro</div>
            <div className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Rápido</div>
            <div className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Cero spam</div>
          </div>
        </div>
      </div>
    );
  }

  // Paso 2: Creación de Tienda
  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl md:rounded-[2rem] shadow-2xl relative group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 blur-[40px] rounded-full"></div>

      <div className="flex items-center justify-between mb-8 relative z-10 w-full">
         <div className="inline-block px-3 py-1 rounded-full border border-gray-800 bg-gray-950 text-emerald-400 text-xs font-bold tracking-widest uppercase">Paso 2 / 2</div>
         <button onClick={handleSignOut} className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors cursor-pointer" type="button">
            Salir <LogOut className="w-3 h-3" />
         </button>
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="w-16 h-16 bg-gray-950 border border-gray-800 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Store className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Construye tu Espacio</h2>
        <p className="text-sm font-light text-gray-400">Define el nombre y la dirección web de tu negocio.</p>
      </div>

      <form onSubmit={handleSubmit(handleStoreSetup)} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400">
            Firma Comercial
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full h-14 px-4 bg-gray-950 border ${errors.name ? 'border-red-500/50' : 'border-gray-800'} focus:outline-none focus:border-emerald-500 transition-colors rounded-xl text-white placeholder:text-gray-600 shadow-inner`}
            placeholder="Ej. Inversiones La Estrella"
          />
          {errors.name && <p className="text-red-400 text-xs font-semibold">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="domain" className="block text-xs font-bold uppercase tracking-widest text-gray-400">
            Subdominio
          </label>
          <div className="flex border border-gray-800 focus-within:border-emerald-500 transition-colors rounded-xl overflow-hidden bg-gray-950 shadow-inner">
            <input
              id="domain"
              type="text"
              {...register('domain')}
              className="flex-grow h-14 px-4 outline-none lowercase placeholder:text-gray-600 bg-transparent text-white"
              placeholder="laestrella"
            />
            <div className="h-14 px-4 border-l border-gray-800 flex items-center text-xs font-semibold text-gray-500 tracking-widest">
              .{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'simpleshop.local'}
            </div>
          </div>
          {errors.domain && <p className="text-red-400 text-xs font-semibold">{errors.domain.message}</p>}
        </div>

        {error && (
          <div className="p-3 bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-semibold text-center rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 mt-6 text-sm font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-gray-200 transition-all disabled:opacity-50 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
        >
          {isSubmitting ? 'Procesando...' : 'Lanzar al Mundo'}
          {!isSubmitting && <ChevronRight className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
}
