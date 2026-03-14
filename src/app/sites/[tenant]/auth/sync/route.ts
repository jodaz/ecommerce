import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get('token');
  const refresh = searchParams.get('refresh');
  const next = searchParams.get('next') || '/admin';

  if (!token || !refresh) {
    return NextResponse.redirect(`${origin}/admin/login?error=missing_tokens`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: refresh,
  });

  if (error) {
    return NextResponse.redirect(`${origin}/admin/login?error=sync_failed`);
  }

  // Si se sincronizó correctamente, se ha creado la cookie en este subdominio
  return NextResponse.redirect(`${origin}${next}`);
}
