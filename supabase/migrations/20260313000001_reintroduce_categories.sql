-- Reintroduce categories scoped to the business

CREATE TABLE IF NOT EXISTS public.business_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(business_id, slug)
);

-- Add category_id to business_products
ALTER TABLE public.business_products
ADD COLUMN category_id UUID REFERENCES public.business_categories(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;

-- Read policy
CREATE POLICY "Categories viewable by everyone" ON public.business_categories FOR SELECT USING (true);

-- Management policy (Owners)
CREATE POLICY "Owners can manage their business categories" ON public.business_categories
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.business_id = business_categories.business_id AND profiles.role = 'owner'
    ));
