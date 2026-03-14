import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');
  const productId = searchParams.get('product_id');
  const storeId = searchParams.get('store_id');

  if (!businessId) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 });
  }

  const supabase = await createClient();

  let query = supabase
    .from('inventory_logs')
    .select(`
      *,
      business_products (name),
      stores (name)
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (productId) query = query.eq('product_id', productId);
  if (storeId) query = query.eq('store_id', storeId);

  const { data, error } = await query.limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data);
}
