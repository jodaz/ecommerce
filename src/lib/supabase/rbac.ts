import { createClient } from '@/lib/supabase/server';

export type StoreRole = 'admin' | 'editor' | 'analyst';

/**
 * Valida si el usuario autenticado actual tiene un rol específico (o cualquier rol) para una tienda dada.
 * @param storeId El UUID de la tienda
 * @returns El rol del usuario para esa tienda, o null si no está autorizado.
 */
export async function getStoreRole(storeId: string): Promise<StoreRole | null> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return null;
  }

  const { data, error } = await supabase
    .from('store_users')
    .select('role')
    .eq('store_id', storeId)
    .eq('user_id', authData.user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.role as StoreRole;
}

/**
 * Verifica si el usuario actual es un administrador global de la plataforma.
 */
export async function isPlatformAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError || !authData?.user) {
    return false;
  }

  return authData.user.app_metadata?.system_role === 'superadmin';
}
