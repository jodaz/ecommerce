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
        stock
      )
    `)
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const product = {
    ...data,
    stock: data.store_inventory?.reduce((sum: number, inv: any) => sum + (inv.stock || 0), 0) || 0,
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
  const { stock, price, ...restProductData } = body;
  const supabase = await createClient();
  
  const productData = {
    ...restProductData,
    ...(price !== undefined ? { base_price: price } : {})
  };
  
  const { data: product, error } = await supabase
    .from('business_products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  if (stock !== undefined && product.business_id) {
    let { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('business_id', product.business_id)
      .eq('is_main', true)
      .maybeSingle();
      
    if (!store) {
      const { data: fallbackStore } = await supabase
        .from('stores')
        .select('id')
        .eq('business_id', product.business_id)
        .limit(1)
        .maybeSingle();
      store = fallbackStore;
    }
      
    if (store) {
      const { error: invError } = await supabase
        .from('store_inventory')
        .upsert({
          store_id: store.id,
          product_id: product.id,
          stock: stock
        });
      
      if (invError) return NextResponse.json({ error: invError.message }, { status: 500 });
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
