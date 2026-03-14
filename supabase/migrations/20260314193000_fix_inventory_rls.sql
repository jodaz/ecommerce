-- Fix RLS for store_inventory and business_products to allow inserts and updates for owners

-- Note: In older Supabase setups, sometimes existing policies need to be dropped first if they exist,
-- but since this is a new file adding policies that don't exist yet, we can just CREATE them.

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
