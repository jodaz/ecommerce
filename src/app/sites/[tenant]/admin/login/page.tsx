'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/stores/adminStore';
import { useEffect } from 'react';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Contraseña requerida'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, users } = useAdminStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
    
    // Simple mock auth matching against standard users in store
    const user = users.find(u => u.email === data.email);
    
    // Accept any password for dummy 'admin@megaimport.com' to ease testing if needed
    if (user || data.email === 'admin@megaimport.com') {
      login(user || { id: '1', name: 'Admin', email: data.email, role: 'Admin' });
      router.push('/admin');
    } else {
      setError('root', { message: 'Credenciales inválidas' });
    }
  };

  if (isAuthenticated) return null; // Avoid flicker before redirect

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-8 shadow-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-black flex items-center justify-center text-white">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">simpleshop</h1>
          <p className="text-zinc-500 text-sm">Ingreso al portal administrativo</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full h-11 px-4 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
              placeholder="admin@megaimport.com"
            />
            {errors.email && <p className="text-red-500 text-xs font-semibold">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold uppercase tracking-widest text-zinc-800">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full h-11 px-4 border ${errors.password ? 'border-red-500' : 'border-zinc-200'} focus:outline-none focus:border-black transition-colors rounded-none`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs font-semibold">{errors.password.message}</p>}
          </div>

          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold text-center">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-sm font-bold uppercase tracking-widest bg-black text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
