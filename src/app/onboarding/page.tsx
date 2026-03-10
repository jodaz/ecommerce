import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import OnboardingWizard from '@/features/onboarding/components/OnboardingWizard';

export default async function OnboardingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Comprobar si el usuario, en caso de estar logueado, ya tiene una tienda
  if (user) {
    const { data: stores } = await supabase
      .from('store_users')
      .select('stores(domain)')
      .eq('user_id', user.id)
      .limit(1);

    if (stores && stores.length > 0) {
      // Ya tiene tienda, mandarlo al dashboard (necesitamos el tenant)
      const storeData = stores[0].stores as any;
      const storeDomain = storeData?.domain;
      const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      // Construir la url con el puerto de forma rudimentaria (asumimos 3000 en dev)
      const portText = process.env.NODE_ENV === 'production' ? '' : ':3000';
      
      const host = `${storeDomain}.${rootDomain}${portText}`;
      redirect(`${protocol}://${host}/admin`);
    }
  }

  // Si no tiene tienda, mostrar el Wizard. Éste manejará primero Auth y luego Store creation
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500/30 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] sm:max-w-[500px] h-[200px] md:h-[400px] bg-emerald-600/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            Comienza <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic">Hoy</span>
          </h1>
          <p className="text-sm md:text-base font-light text-gray-400">Digitalízate y lanza tu plataforma en minutos</p>
        </div>

        <OnboardingWizard initialUser={user} />
      </div>
    </div>
  );
}
