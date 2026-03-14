import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');
  
  if (!businessId) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('business_products')
    .select(`
      *,
      business_categories (
        id,
        name
      ),
      store_inventory (
        stock
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const products = data.map((p: any) => ({
    ...p,
    stock: p.store_inventory?.reduce((sum: number, inv: any) => sum + (inv.stock || 0), 0) || 0,
    store_inventory: undefined // hide inner relation
  }));
  
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { stock, price, ...restProductData } = body;
  
  const productData = {
    ...restProductData,
    base_price: price,
  };
  
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('business_products')
    .insert([productData])
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
      const { error: invError } = await supabase.from('store_inventory').upsert({
        store_id: store.id,
        product_id: product.id,
        stock: stock
      });
      if (invError) return NextResponse.json({ error: invError.message }, { status: 500 });
    }
  }

  return NextResponse.json(product);
}
