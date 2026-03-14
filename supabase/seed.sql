-- Supabase Local Seed File
-- Recreates demo store, users, and catalog data
CREATE EXTENSION IF NOT EXISTS pgcrypto CASCADE;

-- 1. Create a dummy Auth User (Owner of Emprendedor Business)
INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at, 
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'emprendedor@simpleshop.xyz',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    false
) ON CONFLICT (id) DO UPDATE SET 
    email_confirmed_at = now(),
    encrypted_password = crypt('password123', gen_salt('bf'));

-- 1.1 Create another dummy Auth User (Owner of Empresarial Business)
INSERT INTO auth.users (
    id, instance_id, email, encrypted_password, email_confirmed_at, 
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, is_super_admin
)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'empresarial@simpleshop.xyz',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    false
) ON CONFLICT (id) DO UPDATE SET 
    email_confirmed_at = now(),
    encrypted_password = crypt('password123', gen_salt('bf'));

-- 2. Create Businesses
-- 2.1 Emprendedor Business (Slug: demo)
INSERT INTO public.businesses (id, name, slug)
VALUES ('11111111-1111-1111-1111-111111111111', 'Tienda Emprendedora', 'demo')
ON CONFLICT (id) DO NOTHING;

-- 2.2 Empresarial Business (Slug: multi)
INSERT INTO public.businesses (id, name, slug)
VALUES ('11111111-1111-1111-1111-111111111112', 'Distribuidora Empresarial', 'multi')
ON CONFLICT (id) DO NOTHING;

-- 3. Create Stores
-- 3.1 One store for Emprendedor
INSERT INTO public.stores (id, business_id, name, address, phone, is_main, is_active)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Sede Única',
    'Caracas, Venezuela',
    '0412-1111111',
    true,
    true
) ON CONFLICT (id) DO NOTHING;

-- 3.2 Two stores for Empresarial
INSERT INTO public.stores (id, business_id, name, address, phone, is_main, is_active)
VALUES 
(
    '22222222-2222-2222-2222-222222222223',
    '11111111-1111-1111-1111-111111111112',
    'Sede Central',
    'Chacao, Caracas',
    '0412-2222222',
    true,
    true
),
(
    '22222222-2222-2222-2222-222222222224',
    '11111111-1111-1111-1111-111111111112',
    'Sucursal Valencia',
    'Valencia, Carabobo',
    '0412-3333333',
    false,
    true
) ON CONFLICT (id) DO NOTHING;

-- 4. Create Profiles
-- 4.1 Owner for Emprendedor
INSERT INTO public.profiles (id, full_name, role, business_id)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'Dueño Emprendedor',
    'owner',
    '11111111-1111-1111-1111-111111111111'
) ON CONFLICT (id) DO UPDATE SET role = 'owner', business_id = '11111111-1111-1111-1111-111111111111';

-- 4.2 Owner for Empresarial
INSERT INTO public.profiles (id, full_name, role, business_id)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Dueño Empresarial',
    'owner',
    '11111111-1111-1111-1111-111111111112'
) ON CONFLICT (id) DO UPDATE SET role = 'owner', business_id = '11111111-1111-1111-1111-111111111112';

-- 5. Business Settings
INSERT INTO public.business_settings (business_id, description, currency_code)
VALUES 
('11111111-1111-1111-1111-111111111111', 'Tienda pequeña para probar el plan emprendedor.', 'USD'),
('11111111-1111-1111-1111-111111111112', 'Negocio grande con múltiples sucursales.', 'USD')
ON CONFLICT (business_id) DO NOTHING;

-- 6. Subscriptions
-- Plan IDs from migration: 
-- Emprendedor: 00000000-0000-0000-0000-000000000001
-- Empresarial: 00000000-0000-0000-0000-000000000002

-- First, we need to find price IDs. Since we don't have them fixed, we can lookup or just create active subs.
-- We'll use a subquery to find the first monthly price for each plan.

INSERT INTO public.business_subscriptions (business_id, plan_id, plan_price_id, status, start_date, end_date)
VALUES 
(
    '11111111-1111-1111-1111-111111111111', 
    '00000000-0000-0000-0000-000000000001', 
    (SELECT id FROM public.plan_prices WHERE plan_id = '00000000-0000-0000-0000-000000000001' AND interval = 'monthly' LIMIT 1),
    'active', 
    now(), 
    now() + interval '1 month'
),
(
    '11111111-1111-1111-1111-111111111112', 
    '00000000-0000-0000-0000-000000000002', 
    (SELECT id FROM public.plan_prices WHERE plan_id = '00000000-0000-0000-0000-000000000002' AND interval = 'monthly' LIMIT 1),
    'active', 
    now(), 
    now() + interval '1 month'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Categories
INSERT INTO public.business_categories (id, business_id, name, slug)
VALUES 
('33333333-3333-3333-3333-333333333331', '11111111-1111-1111-1111-111111111111', 'Electrónica', 'electronica'),
('33333333-3333-3333-3333-333333333332', '11111111-1111-1111-1111-111111111112', 'Mayorista', 'mayorista')
ON CONFLICT (id) DO NOTHING;

-- 8. Products
INSERT INTO public.business_products (id, business_id, category_id, name, slug, base_price)
VALUES 
('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333331', 'Smartphone Demo', 'smartphone-demo', 299.99),
('44444444-4444-4444-4444-444444444442', '11111111-1111-1111-1111-111111111112', '33333333-3333-3333-3333-333333333332', 'Caja de Repuestos', 'caja-repuestos', 1500.00)
ON CONFLICT (id) DO NOTHING;

-- 9. Inventory
INSERT INTO public.store_inventory (store_id, product_id, stock)
VALUES
('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444441', 10),
('22222222-2222-2222-2222-222222222223', '44444444-4444-4444-4444-444444444442', 50),
('22222222-2222-2222-2222-222222222224', '44444444-4444-4444-4444-444444444442', 25)
ON CONFLICT (store_id, product_id) DO NOTHING;
