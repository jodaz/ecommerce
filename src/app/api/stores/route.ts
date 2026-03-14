import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET: Obtener todas las sucursales de un negocio.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');

  if (!businessId) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('business_id', businessId)
    .order('is_main', { ascending: false })
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/**
 * POST: Crear una nueva sucursal.
 * Solo dueños (owners) pueden crear sucursales.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { business_id, is_main } = body;

    if (!business_id) {
      return NextResponse.json({ error: 'business_id is required' }, { status: 400 });
    }

    // 1. Validar RLS/Permisos (Supabase lo maneja, pero verificamos rol en perfil por seguridad extra)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'owner') {
      return NextResponse.json({ error: 'Solo los dueños pueden crear sucursales' }, { status: 403 });
    }

    // 2. Si es sucursal principal, desmarcar la anterior
    if (is_main) {
      await supabase
        .from('stores')
        .update({ is_main: false })
        .eq('business_id', business_id)
        .eq('is_main', true);
    }

    // 3. Insertar la nueva sucursal
    const { data, error } = await supabase
      .from('stores')
      .insert([body])
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
