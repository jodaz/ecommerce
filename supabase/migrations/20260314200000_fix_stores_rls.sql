-- Fix RLS for stores table to allow owners to manage branches
-- This policy allows owners of the business to INSERT, UPDATE, and DELETE stores

CREATE POLICY "Owners can manage their stores" ON public.stores
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.business_id = stores.business_id 
            AND profiles.role = 'owner'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.business_id = stores.business_id 
            AND profiles.role = 'owner'
        )
    );
