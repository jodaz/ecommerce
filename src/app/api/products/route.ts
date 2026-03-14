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
        quantity
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const products = data.map((p: any) => ({
    ...p,
    stock: p.store_inventory?.reduce((sum: number, inv: any) => sum + (inv.quantity || 0), 0) || 0,
    store_inventory: undefined // hide inner relation
  }));
  
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { stock, ...productData } = body;
  
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('business_products')
    .insert([productData])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  if (stock !== undefined && productData.business_id) {
    const { data: store } = await supabase
      .from('stores')
      .select('id')
      .eq('business_id', productData.business_id)
      .eq('is_main', true)
      .single();
      
    if (store) {
      await supabase.from('store_inventory').insert([{
        store_id: store.id,
        product_id: product.id,
        quantity: stock
      }]);
    }
  }

  return NextResponse.json(product);
}
