import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const storeSchema = z.object({
  name: z.string().min(2, 'El nombre de la tienda debe tener al menos 2 caracteres'),
  domain: z.string()
    .min(3, 'El dominio debe tener al menos 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El dominio solo puede contener letras minúsculas, números y guiones'),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('stores')
    .select('id')
    .eq('domain', domain)
    .single();

  // Si existe (data no es nulo), entonces el dominio ya está tomado
  // Si hay error PGRST116 (No rows found), el dominio está disponible
  const isAvailable = error?.code === 'PGRST116' || (!data && !!error);

  return NextResponse.json({ available: isAvailable });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = storeSchema.parse(body);

    // 1. Verificar unicidad primero
    const { data: existingStore } = await supabase
      .from('stores')
      .select('id')
      .eq('domain', validatedData.domain)
      .single();

    if (existingStore) {
      return NextResponse.json(
        { error: 'El subdominio ya está en uso por otra tienda' },
        { status: 409 }
      );
    }

    // 2. Insertar la tienda
    const { data: newStore, error: insertError } = await supabase
      .from('stores')
      .insert({
        name: validatedData.name,
        domain: validatedData.domain,
        description: `Tienda ${validatedData.name}`,
      })
      .select('id, domain')
      .single();

    if (insertError || !newStore) {
      console.error('Error insertando tienda:', insertError);
      return NextResponse.json({ error: 'Error al crear la tienda' }, { status: 500 });
    }

    // 3. Asignar rol admin al usuario que la crea
    const { error: roleError } = await supabase
      .from('store_users')
      .insert({
        store_id: newStore.id,
        user_id: user.id,
        role: 'admin',
      });

    if (roleError) {
      console.error('Error asignando rol:', roleError);
      return NextResponse.json({ error: 'Tienda creada pero falló la asignación de permisos' }, { status: 500 });
    }

    // Retorna la tienda para hacer el handoff
    return NextResponse.json({ store: newStore });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: (err as any).errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 });
  }
}
