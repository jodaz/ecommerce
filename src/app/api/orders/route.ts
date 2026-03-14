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
    .from('business_orders')
    .select(`
      *,
      business_order_items (
        *,
        business_products (
          name,
          image_url
        )
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

interface OrderItemInput {
  id: string;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  
  const { 
    business_id, 
    customer_name, 
    customer_id_number, 
    customer_phone, 
    customer_address,
    total_amount,
    payment_method_id,
    payment_reference,
    items 
  } = body;

  const itemsList = items as OrderItemInput[];

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('business_orders')
    .insert([{
      business_id,
      customer_name,
      customer_id_number,
      customer_phone,
      customer_address,
      total_amount,
      payment_method_id,
      payment_reference,
      status: 'new'
    }])
    .select()
    .single();

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 });

  // 2. Create order items
  const orderItems = itemsList.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    unit_price: item.price
  }));

  const { error: itemsError } = await supabase
    .from('business_order_items')
    .insert(orderItems);

  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 });

  // 3. Deduct stock and log movements
  const { data: mainStore } = await supabase
    .from('stores')
    .select('id')
    .eq('business_id', business_id)
    .eq('is_main', true)
    .single();

  if (mainStore) {
    for (const item of itemsList) {
      const { data: inventory } = await supabase
        .from('store_inventory')
        .select('quantity')
        .eq('store_id', mainStore.id)
        .eq('product_id', item.id)
        .single();

      const currentStock = inventory?.quantity || 0;
      const newStock = currentStock - item.quantity;

      await supabase
        .from('store_inventory')
        .upsert({
          store_id: mainStore.id,
          product_id: item.id,
          quantity: newStock
        });

      await supabase
        .from('inventory_logs')
        .insert({
          business_id,
          store_id: mainStore.id,
          product_id: item.id,
          order_id: order.id,
          change_amount: -item.quantity,
          previous_quantity: currentStock,
          new_quantity: newStock,
          reason: 'sale'
        });
    }
  }

  return NextResponse.json(order);
}
