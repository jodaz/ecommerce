'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Store, ChevronRight, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Contraseña requerida'),
});

const ERROR_MESSAGES: Record<string, string> = {
  oauth_init_failed: 'Error al iniciar la conexión con Google',
  auth_exchange_failed: 'Error al validar la sesión de Google',
  unauthorized_for_store: 'No tienes permisos para acceder a esta tienda',
  store_not_found: 'La tienda solicitada no existe',
  missing_tokens: 'Faltan credenciales para ingresar',
  sync_failed: 'Error de sincronización de seguridad',
  default: 'Ocurrió un error inesperado al iniciar sesión',
};

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const tenant = params.tenant as string;
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createClient();

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const errorMode = searchParams.get('error');

      if (session && !errorMode) {
        router.replace('/admin');
      } else {
        setIsInitializing(false);
      }
    };
    checkAuth();
  }, [router, supabase, searchParams]);

  // Capture URL errors
  useEffect(() => {
    const errorType = searchParams.get('error');
    if (errorType) {
      setUrlError(ERROR_MESSAGES[errorType] || ERROR_MESSAGES.default);
    }
  }, [searchParams]);

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
    setUrlError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error('Credenciales inválidas o cuenta no registrada');
      }
      
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError('root', { message: err.message });
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
         <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] sm:max-w-[400px] h-[200px] md:h-[300px] bg-emerald-600/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl md:rounded-[2rem] shadow-2xl relative group w-full max-w-md z-10">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 blur-[40px] rounded-full"></div>

        <div className="flex flex-col items-center gap-3 mb-8 relative z-10">
          <div className="w-14 h-14 bg-gray-950 border border-gray-800 rounded-2xl flex items-center justify-center text-white mb-2 shadow-inner group-hover:scale-105 transition-transform">
            <Store className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Dashboard</h1>
          <p className="text-gray-400 text-sm font-light">Acceso administrativo de <span className="font-bold text-gray-300">{tenant}</span></p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-400">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full h-14 px-4 bg-gray-950 border ${errors.email ? 'border-red-500/50' : 'border-gray-800'} focus:outline-none focus:border-emerald-500 transition-colors rounded-xl text-white placeholder:text-gray-600 shadow-inner`}
              placeholder="admin@ejemplo.com"
            />
            {errors.email && <p className="text-red-400 text-xs font-semibold">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-400">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={`w-full h-14 pl-4 pr-12 bg-gray-950 border ${errors.password ? 'border-red-500/50' : 'border-gray-800'} focus:outline-none focus:border-emerald-500 transition-colors rounded-xl text-white placeholder:text-gray-600 shadow-inner`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-2"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs font-semibold">{errors.password.message}</p>}
          </div>

          {(errors.root || urlError) && (
            <div className="p-3 bg-red-950/30 border border-red-900/50 text-red-400 text-xs font-semibold text-center rounded-lg flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.root?.message || urlError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 mt-6 text-sm font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-gray-200 transition-all disabled:opacity-50 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
          >
            {isSubmitting ? 'Verificando...' : 'Ingresar'}
            {!isSubmitting && <ChevronRight className="w-5 h-5" />}
          </button>
        </form>

        {/* <div className="mt-8 relative z-10">
          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-gray-600">O ingresar vía</span>
            <div className="flex-grow border-t border-gray-800"></div>
          </div>

          <a
            href={`/api/auth/google?tenant=${tenant}`}
            className="w-full h-14 flex items-center justify-center gap-3 border border-gray-700 bg-gray-800/50 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-800 hover:border-emerald-500/50 transition-all active:scale-[0.98] rounded-xl shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </a>
        </div> */}
      </div>
    </div>
  );
}
