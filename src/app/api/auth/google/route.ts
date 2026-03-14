import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Endpoint para iniciar el flujo de autenticación con Google.
 * Recibe el parámetro 'tenant' (subdominio) para construir la URL de redirección dinámicamente.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tenant = searchParams.get('tenant'); // Puede ser null en onboarding
  const isRootOnboarding = !tenant;

  const supabase = await createClient();

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost';
  const protocol = origin.startsWith('https') ? 'https' : 'http';
  
  const port = new URL(request.url).port;
  let redirectHost = rootDomain;
  if (port) {
    redirectHost += `:${port}`;
  }
  
  if (!isRootOnboarding) {
    redirectHost = `${tenant}.${redirectHost}`;
  }

  const redirectTo = `${protocol}://${redirectHost}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    },
  });

  if (error) {
    return NextResponse.redirect(`${origin}/admin/login?error=oauth_init_failed`);
  }

  if (data.url) {
    return NextResponse.redirect(data.url);
  }

  return NextResponse.redirect(`${origin}/admin/login?error=unknown`);
}
