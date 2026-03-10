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

-- 4. Crear la tabla `store_users` (RBAC)
CREATE TABLE public.store_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'analyst')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(store_id, user_id)
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_users ENABLE ROW LEVEL SECURITY;

-- Base Read Policies (Public visitors)
CREATE POLICY "Stores are publicly viewable" ON public.stores FOR SELECT USING (true);
CREATE POLICY "Categories are publicly viewable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT USING (true);

-- Helper function to avoid infinite recursion on RLS checking
CREATE OR REPLACE FUNCTION public.has_store_role(store_id_param UUID, allowed_roles TEXT[])
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.store_users
    WHERE store_id = store_id_param 
      AND user_id = auth.uid() 
      AND role = ANY(allowed_roles)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Store Users Policies (Read)
CREATE POLICY "Users can view their own roles" ON public.store_users FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles in their store" ON public.store_users FOR SELECT
    USING (public.has_store_role(store_id, ARRAY['admin']));

-- Write Policies (RBAC)

-- Stores
CREATE POLICY "Authenticated users can create stores" ON public.stores FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update their stores" ON public.stores FOR UPDATE
    USING (public.has_store_role(id, ARRAY['admin']));

CREATE POLICY "Admins can delete their stores" ON public.stores FOR DELETE
    USING (public.has_store_role(id, ARRAY['admin']));

-- Store Users (RBAC management)
CREATE POLICY "Users can claim unowned stores" ON public.store_users FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND role = 'admin' AND NOT EXISTS (
            SELECT 1 FROM public.store_users AS existing WHERE existing.store_id = store_users.store_id
        )
    );

CREATE POLICY "Admins can manage store users" ON public.store_users FOR ALL
    USING (public.has_store_role(store_id, ARRAY['admin']));

-- Categories
CREATE POLICY "Admins and editors can manage categories" ON public.categories FOR ALL
    USING (public.has_store_role(store_id, ARRAY['admin', 'editor']));

-- Products
CREATE POLICY "Admins and editors can manage products" ON public.products FOR ALL
    USING (public.has_store_role(store_id, ARRAY['admin', 'editor']));
