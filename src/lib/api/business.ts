import { createClient } from '@/lib/supabase/server';

export async function getBusinessBySlug(slug: string) {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from('businesses')
    .select(`
      id, 
      name, 
      slug, 
      logo_url,
      business_settings (
        description,
        currency_code,
        theme_config,
        phone,
        facebook_url,
        instagram_url,
        tiktok_url,
        twitter_url
      ),
      stores (
        id,
        name,
        address,
        phone,
        is_main,
        is_active
      ),
      business_subscriptions (
        status,
        end_date,
        plan_id,
        plans (
          id,
          name,
          max_stores
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !business) {
    console.error('DB API Error fetching business by slug:', error);
    return null;
  }

  console.log('DB API Success: Fetched business:', business.id, 'settings type:', typeof business.business_settings);
  if (business.business_settings) {
    console.log('DB API: Settings found:', JSON.stringify(business.business_settings, null, 2));
  } else {
    console.warn('DB API: No settings found for business:', business.id);
  }

  // Find active subscription
  const subscriptions = (business as any).business_subscriptions || [];
  const activeSub = subscriptions.find((sub: any) => sub.status === 'active');

  const subscription = activeSub ? {
    plan_id: activeSub.plans.id,
    plan_name: activeSub.plans.name,
    status: activeSub.status,
    end_date: activeSub.end_date,
    max_stores: activeSub.plans.max_stores
  } : null;

  // Find the primary store for inventory defaults if needed
  const stores = (business as any).stores || [];
  const mainStore = stores.find((s: any) => s.is_main) || stores[0];

  return {
    ...business,
    main_store: mainStore,
    active_subscription: subscription
  };
}

export async function updateBusinessSettings(
  businessId: string, 
  data: { 
    name?: string,
    description?: string,
    phone?: string,
    facebook_url?: string,
    instagram_url?: string,
    tiktok_url?: string,
    twitter_url?: string,
    logo_url?: string
  }
) {
  const supabase = await createClient();
  console.log('DB API: updateBusinessSettings called for ID:', businessId, 'with data:', data);

  let businessResult = null;
  // If name or logo_url are present, update businesses table
  if (data.name !== undefined || data.logo_url !== undefined) {
    const businessUpdate: any = {};
    if (data.name !== undefined) businessUpdate.name = data.name;
    if (data.logo_url !== undefined) businessUpdate.logo_url = data.logo_url;

    const { data: updatedBusiness, error: businessError } = await supabase
      .from('businesses')
      .update(businessUpdate)
      .eq('id', businessId)
      .select()
      .single();

    if (businessError) {
      console.error('Error updating business:', businessError);
      return { success: false, error: businessError };
    }
    businessResult = updatedBusiness;
  }

  // Update business_settings table
  const settingsUpdate: any = {};
  if (data.description !== undefined) settingsUpdate.description = data.description;
  if (data.phone !== undefined) settingsUpdate.phone = data.phone;
  if (data.facebook_url !== undefined) settingsUpdate.facebook_url = data.facebook_url;
  if (data.instagram_url !== undefined) settingsUpdate.instagram_url = data.instagram_url;
  if (data.tiktok_url !== undefined) settingsUpdate.tiktok_url = data.tiktok_url;
  if (data.twitter_url !== undefined) settingsUpdate.twitter_url = data.twitter_url;

  let settingsResult = null;

  if (Object.keys(settingsUpdate).length > 0) {
    console.log('DB API: Upserting settings for businessId:', businessId);
    
    const { data: updatedSettings, error: settingsError } = await supabase
      .from('business_settings')
      .upsert({ 
        business_id: businessId,
        ...settingsUpdate 
      }, { onConflict: 'business_id' })
      .select()
      .single();

    if (settingsError) {
      console.error('DB API Error updating business settings:', settingsError);
      return { success: false, error: settingsError };
    }
    settingsResult = updatedSettings;
    console.log('DB API Success: settings updated');
  }

  return { 
    success: true,
    business: businessResult, 
    settings: settingsResult 
  };
}

export async function getPaymentMethodsForBusiness(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('business_payment_methods')
    .select('id, type, label, details')
    .eq('business_id', businessId)
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching payment methods:', error);
    return [];
  }
  return data;
}

export async function getStoresByBusinessSlug(slug: string) {
  const supabase = await createClient();
  
  // First get the business ID
  const { data: business, error: bizError } = await supabase
    .from('businesses')
    .select('id')
    .eq('slug', slug)
    .single();

  if (bizError || !business) {
    console.error('Error finding business for stores:', bizError);
    return [];
  }

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('business_id', business.id)
    .eq('is_active', true)
    .order('is_main', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching stores:', error);
    return [];
  }

  return data;
}
