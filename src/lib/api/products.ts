import { createClient } from '@/lib/supabase/server';
import { ProductCarouselItem } from '@/features/products/types/product';

export async function getProductsForStore(businessId: string): Promise<Record<string, ProductCarouselItem[]>> {
  const supabase = await createClient();

  // Fetch products and their related category for the given business
  const { data: products, error } = await supabase
    .from('business_products')
    .select(`
      id,
      name,
      description,
      base_price,
      image_url,
      business_categories (
        name
      )
    `)
    .eq('business_id', businessId);

  if (error || !products) {
    console.error('Error fetching products:', error);
    return {};
  }

  // Group products by category name
  const grouped = products.reduce<Record<string, ProductCarouselItem[]>>((acc, product) => {
    // Determine category name, default to 'General' if no category
    const categoryName = (product.business_categories as any)?.name || 'General';
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push({
      id: product.id,
      title: product.name,
      description: product.description || undefined,
      image: product.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image',
      cta: `$${product.base_price}`,
    });

    return acc;
  }, {});

  return grouped;
}

export async function getAllProductsForBusiness(businessId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('business_products')
    .select(`
      *,
      business_categories (
        name
      )
    `)
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
    
  if (error) return [];
  return data;
}

export async function getProductById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('business_products')
    .select(`
      *,
      business_categories (
        name
      )
    `)
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data;
}
