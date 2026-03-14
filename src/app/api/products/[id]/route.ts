import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('business_products')
    .select(`
      *,
      store_inventory (
        quantity
      )
    `)
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const product = {
    ...data,
    stock: data.store_inventory?.reduce((sum: number, inv: any) => sum + (inv.quantity || 0), 0) || 0,
    store_inventory: undefined
  };

  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { stock, ...productData } = body;
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('business_products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  if (stock !== undefined && product.business_id) {
    const { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('business_id', product.business_id)
      .eq('is_main', true)
      .single();
      
    if (store) {
      const { data: existingInv } = await supabase
        .from('store_inventory')
        .select('id')
        .eq('store_id', store.id)
        .eq('product_id', product.id)
        .is('variant_id', null)
        .single();
        
      if (existingInv) {
        await supabase
          .from('store_inventory')
          .update({ quantity: stock })
          .eq('id', existingInv.id);
      } else {
        await supabase
          .from('store_inventory')
          .insert([{
            store_id: store.id,
            product_id: product.id,
            quantity: stock
          }]);
      }
    }
  }

  return NextResponse.json(product);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('business_products')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return new NextResponse(null, { status: 204 });
}
