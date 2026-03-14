import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get('business_id');
  const productId = searchParams.get('product_id');

  if (!businessId) {
    return NextResponse.json({ error: 'business_id is required' }, { status: 400 });
  }

  const supabase = await createClient();

  // 1. Fetch all stores for this business
  const { data: stores, error: storesError } = await supabase
    .from('stores')
    .select('id, name, is_main')
    .eq('business_id', businessId)
    .eq('is_active', true);

  if (storesError) return NextResponse.json({ error: storesError.message }, { status: 500 });

  // 2. Fetch products with their current store_inventory
  let query = supabase
    .from('business_products')
    .select(`
      id,
      name,
      image_url,
      store_inventory (
        store_id,
        quantity
      )
    `)
    .eq('business_id', businessId);

  if (productId) {
    query = query.eq('id', productId);
  }

  const { data: products, error: productsError } = await query;

  if (productsError) return NextResponse.json({ error: productsError.message }, { status: 500 });

  interface InventoryRecord {
    store_id: string;
    quantity: number;
  }

  // 3. Map inventory data to include all stores (even if quantity is 0 or missing)
  const result = products.map(product => {
    const inventoryMap = new Map<string, number>(
      (product.store_inventory as unknown as InventoryRecord[])?.map((inv) => [inv.store_id, inv.quantity]) || []
    );

    return {
      id: product.id,
      name: product.name,
      image_url: product.image_url,
      inventory: stores.map(store => ({
        store_id: store.id,
        store_name: store.name,
        is_main: store.is_main,
        quantity: inventoryMap.get(store.id) || 0
      }))
    };
  });

  return NextResponse.json(result);
}
