import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Got URL", !!url, "Got Key", !!key);

const supabase = createClient(url, key);

async function run() {
  const q1 = `
    CREATE POLICY "Owners can manage inventory" ON public.store_inventory
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.stores s
            JOIN public.profiles p ON s.business_id = p.business_id
            WHERE s.id = store_inventory.store_id 
            AND p.id = auth.uid() 
            AND p.role = 'owner'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.stores s
            JOIN public.profiles p ON s.business_id = p.business_id
            WHERE s.id = store_inventory.store_id 
            AND p.id = auth.uid() 
            AND p.role = 'owner'
        )
    );
  `;
  
  const q2 = `
    CREATE POLICY "Owners can manage products" ON public.business_products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.business_id = business_products.business_id
            AND p.id = auth.uid() 
            AND p.role = 'owner'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE p.business_id = business_products.business_id
            AND p.id = auth.uid() 
            AND p.role = 'owner'
        )
    );
  `;

  // We can't execute raw sql with supabase js unless we have a function created, which we don't.
}

run();
