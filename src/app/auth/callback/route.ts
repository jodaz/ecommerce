import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { getBusinessBySlug } from '@/lib/api/business';

/**
 * Manejador del callback de autenticación (OAuth/PKCE).
 * Procesa el código de Google, extrae el tenant del subdominio y gestiona el acceso.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    
    // Intercambia el código por una sesión persistente (cookies)
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error('Error exchanging code:', exchangeError.message);
      return NextResponse.redirect(`${origin}/admin/login?error=auth_exchange_failed`);
    }

    // Obtenemos el usuario autenticado
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.redirect(`${origin}/admin/login?error=no_user`);
    }

    // Identificar el tenant desde el subdominio
    const hostname = request.headers.get('host') || '';
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
    
    // Si estamos en localhost:3000, el hostname podría ser tienda.localhost:3000
    const currentHost = hostname.split(':')[0];
    let tenantDomain = currentHost;

    if (currentHost.endsWith(`.${rootDomain}`)) {
      tenantDomain = currentHost.replace(`.${rootDomain}`, '');
    }

    // Procesar callbacks del dominio raíz (Onboarding flow)
    if (currentHost === rootDomain) {
      return NextResponse.redirect(`${origin}/onboarding`);
    }

    // No procesar si de alguna manera no tenemos tenant pero tampoco somos root (fallback de seguridad)
    if (!tenantDomain) {
      return NextResponse.redirect(`${origin}/admin/login?error=missing_tenant`);
    }

    // Buscar el negocio en la BD
    const business = await getBusinessBySlug(tenantDomain);
    
    if (!business) {
      return NextResponse.redirect(`${origin}/admin/login?error=store_not_found`);
    }

    // --- LÓGICA DE ONBOARDING / RECLAMO DE NEGOCIO ---
    
    // Comprobar si hay profiles asignados a este negocio
    const { data: colleagues, error: countError } = await supabase
      .from('profiles')
      .select('id')
      .eq('business_id', business.id);

    if (countError) {
      console.error('Error checking business profiles:', countError.message);
      return NextResponse.redirect(`${origin}/admin/login?error=database_error`);
    }

    // Si el negocio está vacío, este usuario lo reclama como owner
    if (colleagues.length === 0) {
      const { error: claimError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          business_id: business.id,
          role: 'owner'
        });

      if (claimError) {
        console.error('Error claiming business:', claimError.message);
        // Quizás el usuario logueó pero falló el registro de rol. 
        // Permitimos continuar si ya existe (carrera de ratas).
      }
    } else {
      // Si el negocio ya tiene dueños, verificamos si este usuario es uno de ellos
      const isAuthorized = colleagues.some(c => c.id === user.id);
      
      if (!isAuthorized) {
        // Usuario no pertenece a este negocio. Cerramos sesión por seguridad para este tenant.
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/admin/login?error=unauthorized_for_store`);
      }
    }

    // Todo bien, redirigir al dashboard
    return NextResponse.redirect(`${origin}/admin`);
  }

  // Si no hay código, algo salió mal en la red o el usuario canceló
  return NextResponse.redirect(`${origin}/admin/login?error=no_code`);
}
