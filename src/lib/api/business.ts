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
        theme_config
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
