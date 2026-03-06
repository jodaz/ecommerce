import { createClient } from '@/lib/supabase/server';

export async function getStoreByDomain(domain: string) {
  const supabase = await createClient();

  const { data: store, error } = await supabase
    .from('stores')
    .select('id, name, description, domain')
    .eq('domain', domain)
    .single();

  if (error || !store) {
    return null;
  }

  return store;
}
