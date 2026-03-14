-- 1. Create Enums
CREATE TYPE public.pricing_interval AS ENUM ('monthly', 'annual');
CREATE TYPE public.subscription_status AS ENUM ('pending_activation', 'active', 'expired', 'cancelled');

-- 2. Create Plans Table
CREATE TABLE public.plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    max_stores INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Plan Prices Table
CREATE TABLE public.plan_prices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE CASCADE,
    interval public.pricing_interval NOT NULL,
    price_usd NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Business Subscriptions Table
CREATE TABLE public.business_subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE RESTRICT,
    plan_price_id UUID NOT NULL REFERENCES public.plan_prices(id) ON DELETE RESTRICT,
    status public.subscription_status NOT NULL DEFAULT 'pending_activation',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Plans are viewable by everyone." ON public.plans FOR SELECT USING (true);
CREATE POLICY "Plan prices are viewable by everyone." ON public.plan_prices FOR SELECT USING (true);

-- Business subscriptions are viewable by users associated with the business
CREATE POLICY "Business subscriptions are viewable by business members." ON public.business_subscriptions
FOR SELECT USING (
    business_id IN (
        SELECT business_id FROM public.profiles WHERE id = auth.uid()
    )
);

-- Insert Seed Data (Using specific UUIDs so we can reference them if needed, or we can just let it generate and look them up, but for predictability, explicit UUIDs are good for the default plans)
INSERT INTO public.plans (id, name, description, max_stores)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Emprendedor', 'Perfecto para empezar. Incluye 1 tienda.', 1),
    ('00000000-0000-0000-0000-000000000002', 'Empresarial', 'Para negocios en crecimiento. Múltiples tiendas.', 999);

INSERT INTO public.plan_prices (plan_id, interval, price_usd)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'monthly', 10.00),
    ('00000000-0000-0000-0000-000000000001', 'annual', 100.00),
    ('00000000-0000-0000-0000-000000000002', 'monthly', 25.00),
    ('00000000-0000-0000-0000-000000000002', 'annual', 250.00);
