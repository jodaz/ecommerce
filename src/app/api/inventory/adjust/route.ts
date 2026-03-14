import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  
  const { 
    business_id, 
    store_id, 
    product_id, 
    change_amount, 
    reason,
    metadata 
  } = body;

  if (!business_id || !store_id || !product_id || change_amount === undefined || !reason) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 1. Get current quantity
  const { data: inventory } = await supabase
    .from('store_inventory')
    .select('stock')
    .eq('store_id', store_id)
    .eq('product_id', product_id)
    .single();

  const currentQuantity = inventory?.stock || 0;
  const newQuantity = currentQuantity + change_amount;

  if (newQuantity < 0) {
    return NextResponse.json({ error: 'Insuficient stock for this adjustment' }, { status: 400 });
  }

  // 2. Update inventory
  const { error: upsertError } = await supabase
    .from('store_inventory')
    .upsert({
      store_id,
      product_id,
      stock: newQuantity
    });

  if (upsertError) return NextResponse.json({ error: upsertError.message }, { status: 500 });

  // 3. Log movement
  const { error: logError } = await supabase
    .from('inventory_logs')
    .insert({
      business_id,
      store_id,
      product_id,
      change_amount,
      previous_quantity: currentQuantity,
      new_quantity: newQuantity,
      reason,
      metadata: metadata || {}
    });

  if (logError) console.error('Failed to create inventory log:', logError);

  return NextResponse.json({ 
    success: true, 
    new_quantity: newQuantity 
  });
}
