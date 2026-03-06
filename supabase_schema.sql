-- Multi-tenant E-commerce Schema for Supabase

-- 1. Create the `stores` table (Tenants)
CREATE TABLE public.stores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    domain TEXT NOT NULL UNIQUE, -- e.g. 'tienda'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the `categories` table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(store_id, slug) -- A category slug must be unique per store
);

-- 3. Create the `products` table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0 NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(store_id, slug) -- A product slug must be unique per store
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create basic Read policies (Assuming stores are public for visitors)
-- Visitors can view any store data, filtering happens on the application layer via `store_id`
CREATE POLICY "Stores are publicly viewable"
    ON public.stores FOR SELECT
    USING (true);

CREATE POLICY "Categories are publicly viewable"
    ON public.categories FOR SELECT
    USING (true);

CREATE POLICY "Products are publicly viewable"
    ON public.products FOR SELECT
    USING (true);

-- (Optional) Auth policies for Admin Users can be added here
-- For example, allowing store owners to edit only their rows based on auth.uid()
