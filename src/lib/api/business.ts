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
        is_main
      )
    `)
    .eq('slug', slug)
    .single();

  if (error || !business) {
    console.error('Error fetching business by slug:', error);
    return null;
  }

  // Find the primary store for inventory defaults if needed
  const mainStore = business.stores.find((s: any) => s.is_main) || business.stores[0];

  return {
    ...business,
    main_store: mainStore
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

  // If name or logo_url are present, update businesses table
  if (data.name !== undefined || data.logo_url !== undefined) {
    const businessUpdate: any = {};
    if (data.name !== undefined) businessUpdate.name = data.name;
    if (data.logo_url !== undefined) businessUpdate.logo_url = data.logo_url;

    const { error: businessError } = await supabase
      .from('businesses')
      .update(businessUpdate)
      .eq('id', businessId);

    if (businessError) {
      console.error('Error updating business:', businessError);
      return { success: false, error: businessError };
    }
  }

  // Update business_settings table
  const settingsUpdate: any = {};
  if (data.description !== undefined) settingsUpdate.description = data.description;
  if (data.phone !== undefined) settingsUpdate.phone = data.phone;
  if (data.facebook_url !== undefined) settingsUpdate.facebook_url = data.facebook_url;
  if (data.instagram_url !== undefined) settingsUpdate.instagram_url = data.instagram_url;
  if (data.tiktok_url !== undefined) settingsUpdate.tiktok_url = data.tiktok_url;
  if (data.twitter_url !== undefined) settingsUpdate.twitter_url = data.twitter_url;

  if (Object.keys(settingsUpdate).length > 0) {
    const { error: settingsError } = await supabase
      .from('business_settings')
      .update(settingsUpdate)
      .eq('business_id', businessId);

    if (settingsError) {
      console.error('Error updating business settings:', settingsError);
      return { success: false, error: settingsError };
    }
  }

  return { success: true };
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
