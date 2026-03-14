import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PUT: Actualizar una sucursal específica.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();
    const { is_main, business_id } = body;

    // 1. Verificación de permisos básica
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // 2. Si se está cambiando a principal, desmarcar la anterior
    if (is_main && business_id) {
      await supabase
        .from('stores')
        .update({ is_main: false })
        .eq('business_id', business_id)
        .eq('is_main', true);
    }

    // 3. Actualizar
    const { data, error } = await supabase
      .from('stores')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE: Eliminar una sucursal.
 * No se permite eliminar la sucursal principal.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // 1. Verificar si es la principal antes de borrar
    const { data: store, error: fetchError } = await supabase
      .from('stores')
      .select('is_main')
      .eq('id', id)
      .single();

    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
    
    if (store.is_main) {
      return NextResponse.json({ error: 'No se puede eliminar la sucursal principal' }, { status: 400 });
    }

    // 2. Ejecutar borrado
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
