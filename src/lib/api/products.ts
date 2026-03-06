import { createClient } from '@/lib/supabase/server';
import { ProductCarouselItem } from '@/features/products/types/product';

export async function getProductsForStore(storeId: string): Promise<Record<string, ProductCarouselItem[]>> {
  const supabase = await createClient();

  // Fetch products and their related category for the given store
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      image_url,
      categories (
        name
      )
    `)
    .eq('store_id', storeId);

  if (error || !products) {
    console.error('Error fetching products:', error);
    return {};
  }

  // Group products by category name
  const grouped = products.reduce<Record<string, ProductCarouselItem[]>>((acc, product) => {
    // Determine category name, default to 'General' if no category
    const categoryName = (product.categories as any)?.name || 'General';
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }

    acc[categoryName].push({
      id: product.id,
      title: product.name,
      description: product.description || undefined,
      image: product.image_url || 'https://placehold.co/600x600/18181b/ffffff?text=No+Image',
      cta: `$${product.price}`,
    });

    return acc;
  }, {});

  return grouped;
}
