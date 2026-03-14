import { createClient } from '@/lib/supabase/server';
import { CategoryGroup } from '@/features/products/types/product';

export async function getProductsForStore(businessId: string): Promise<CategoryGroup[]> {
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
        name,
        slug,
        has_page
      )
    `)
    .eq('business_id', businessId);

  if (error || !products) {
    return [];
  }

  // Group products by category
  const groups: Record<string, CategoryGroup> = {};
  
  products.forEach((product) => {
    const category = product.business_categories as {
      name: string;
      slug: string;
      has_page: boolean;
    } | null;
    
    const categoryName = category?.name || 'General';
    const categorySlug = category?.slug || 'general';
    const hasPage = category?.has_page || false;

    if (!groups[categorySlug]) {
      groups[categorySlug] = {
        name: categoryName,
        slug: categorySlug,
        hasPage: hasPage,
        items: []
      };
    }

    groups[categorySlug].items.push({
      id: product.id,
      title: product.name,
      description: product.description || undefined,
      image: product.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image',
      cta: `$${product.base_price}`,
      href: `/products/${product.id}`,
    });
  });

  return Object.values(groups);
}

export async function getProductsByCategorySlug(businessId: string, categorySlug: string) {
  const supabase = await createClient();

  const { data: category, error: catError } = await supabase
    .from('business_categories')
    .select('id, name, slug, has_page')
    .eq('business_id', businessId)
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) return null;

  const { data: products, error } = await supabase
    .from('business_products')
    .select(`
      id,
      name,
      description,
      base_price,
      image_url
    `)
    .eq('business_id', businessId)
    .eq('category_id', category.id);

  if (error) return null;

  return {
    category,
    products: products.map(p => ({
      id: p.id,
      title: p.name,
      description: p.description,
      price: p.base_price,
      image: p.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image'
    }))
  };
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
