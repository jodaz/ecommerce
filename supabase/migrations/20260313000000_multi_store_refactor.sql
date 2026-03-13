-- Multi-Store and Scoped Roles Refactor (Clean Schema)
-- This migration creates the structure for Businesses -> Stores -> Profiles hierarchy.

-- 1. Create Business (The Tenant)
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Business Settings
-- Centralized table for all business-wide configurations
CREATE TABLE IF NOT EXISTS public.business_settings (
    business_id UUID PRIMARY KEY REFERENCES public.businesses(id) ON DELETE CASCADE,
    description TEXT,
    facebook_url TEXT,
    instagram_url TEXT,
    tiktok_url TEXT,
    twitter_url TEXT,
    whatsapp_number TEXT,
    support_email TEXT,
    currency_code TEXT DEFAULT 'USD',
    theme_config JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Business Payment Methods
CREATE TABLE IF NOT EXISTS public.business_payment_methods (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('PayPal', 'Zelle', 'Binance', 'Pago Móvil', 'Transferencia Bancaria')),
    label TEXT NOT NULL,
    details TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Stores (Branches/Locations)
CREATE TABLE IF NOT EXISTS public.stores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    is_main BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Logical Constraint: Only one 'is_main' store per business
CREATE UNIQUE INDEX IF NOT EXISTS one_main_store_per_business 
ON public.stores (business_id) 
WHERE (is_main = true);

-- 3. Create Profiles (Extended User Data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
    full_name TEXT,
    role TEXT NOT NULL CHECK (role IN ('owner', 'administrative')),
    assigned_store_id UUID REFERENCES public.stores(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    CONSTRAINT admin_must_have_store CHECK (
        (role = 'administrative' AND assigned_store_id IS NOT NULL) OR 
        (role = 'owner')
    )
);

-- 4. Refactor Products and Inventory
CREATE TABLE IF NOT EXISTS public.business_products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(business_id, slug)
);

-- Stock is local to each store
CREATE TABLE IF NOT EXISTS public.store_inventory (
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.business_products(id) ON DELETE CASCADE,
    stock INTEGER DEFAULT 0 NOT NULL,
    PRIMARY KEY (store_id, product_id)
);

-- 5. Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_inventory ENABLE ROW LEVEL SECURITY;

-- 6. Basic RLS Policies (Read)
CREATE POLICY "Businesses viewable by everyone" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Business settings viewable by everyone" ON public.business_settings FOR SELECT USING (true);
CREATE POLICY "Business payment methods viewable by everyone" ON public.business_payment_methods FOR SELECT USING (true);
CREATE POLICY "Stores viewable by everyone" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Products viewable by everyone" ON public.business_products FOR SELECT USING (true);
CREATE POLICY "Inventory viewable by everyone" ON public.store_inventory FOR SELECT USING (true);

-- 7. Management Policies (Owners)
CREATE POLICY "Owners can manage their business settings" ON public.business_settings
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.business_id = business_settings.business_id AND profiles.role = 'owner'
    ));

CREATE POLICY "Owners can manage their business payment methods" ON public.business_payment_methods
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.business_id = business_payment_methods.business_id AND profiles.role = 'owner'
    ));

CREATE POLICY "Owners can manage their business" ON public.businesses
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() AND profiles.business_id = businesses.id AND profiles.role = 'owner'
    ));

-- 8. Profile Access Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Owners can view all business profiles" ON public.profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles AS me 
        WHERE me.id = auth.uid() AND me.role = 'owner' AND me.business_id = profiles.business_id
    )
);
