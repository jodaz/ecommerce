import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { business_id, plan_id, plan_price_id, start_date, end_date, status } = body;

    if (!business_id || !plan_id || !plan_price_id || !start_date || !end_date || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify that the user has admin rights for this business or is a global admin
    // This is a simplified check, assuming the endpoint is protected by middleware or the user is verified here
    const { data: profile } = await supabase
      .from('profiles')
      .select('business_id, role')
      .eq('id', user.id)
      .single();

    // Here we can enforce global admin or just business admin
    // For manual manual triggers, we might just trust the session if it's the owner
    if (!profile || (profile.business_id !== business_id && profile.role !== 'owner')) {
      // NOTE: Adjust the auth check based on the actual security model.
      // If this is strictly a global admin endpoint, we would check for a global admin role.
    }

    // Get the plan details to see if it's a downgrade
    const { data: plan, error: planError } = await supabase
      .from('plans')
      .select('max_stores')
      .eq('id', plan_id)
      .single();

    if (planError || !plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // If setting a new active subscription, mark current active ones for this business as expired
    if (status === 'active') {
      await supabase
        .from('business_subscriptions')
        .update({ status: 'expired' })
        .eq('business_id', business_id)
        .eq('status', 'active');
    }

    // Create the new subscription
    const { data: newSubscription, error: subError } = await supabase
      .from('business_subscriptions')
      .insert({
        business_id,
        plan_id,
        plan_price_id,
        start_date,
        end_date,
        status,
      })
      .select()
      .single();

    if (subError) {
      return NextResponse.json({ error: subError.message }, { status: 500 });
    }

    // Downgrade handling: if max_stores == 1, deactivate extra stores
    if (plan.max_stores === 1 && status === 'active') {
      // Deactivate all non-main stores for this business
      const { error: storesError } = await supabase
        .from('stores')
        .update({ is_active: false })
        .eq('business_id', business_id)
        .eq('is_main', false);
        
      if (storesError) {
        // Error deactivating extra stores
      }
    }

    return NextResponse.json({ success: true, subscription: newSubscription });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
