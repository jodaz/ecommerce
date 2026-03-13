-- Supabase Local Seed File
-- Recreates demo store, users, and catalog data
CREATE EXTENSION IF NOT EXISTS pgcrypto CASCADE;

-- 1. Create a dummy Auth User
INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    is_super_admin
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    '00000000-0000-0000-0000-000000000000',
    'admin@jodaz.xyz',
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

-- 2. Create the demo business
INSERT INTO public.businesses (id, name, slug)
VALUES (
    '11111111-1111-1111-1111-111111111111', 
    'Tienda de Prueba', 
    'demo'
) ON CONFLICT (id) DO NOTHING;

-- 3. Create the demo store (branch) for the business
INSERT INTO public.stores (id, business_id, name, address, phone, is_main, is_active)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Sede Principal',
    'Caracas, Venezuela',
    '12345',
    true,
    true
) ON CONFLICT (id) DO NOTHING;

-- 4. Create the profile for the test user linked to the business
INSERT INTO public.profiles (id, full_name, role, business_id)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'Administrador de Prueba',
    'admin',
    '11111111-1111-1111-1111-111111111111'
) ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    business_id = '11111111-1111-1111-1111-111111111111';

-- 5. Add demo categories
INSERT INTO public.business_categories (id, business_id, name, slug)
VALUES 
(
    '33333333-3333-3333-3333-333333333331',
    '11111111-1111-1111-1111-111111111111',
    'Electrónica',
    'electronica'
),
(
    '33333333-3333-3333-3333-333333333332',
    '11111111-1111-1111-1111-111111111111',
    'Accesorios',
    'accesorios'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Add demo products
INSERT INTO public.business_products (id, business_id, category_id, name, slug, description, base_price, image_url)
VALUES 
(
    '44444444-4444-4444-4444-444444444441',
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333331',
    'Smartphone Pro Max',
    'smartphone-pro-max',
    'El mejor teléfono de última generación',
    999.99,
    'https://placehold.co/600x600/18181b/ffffff?text=Smartphone+Pro+Max'
),
(
    '44444444-4444-4444-4444-444444444442',
    '11111111-1111-1111-1111-111111111111',
    '33333333-3333-3333-3333-333333333332',
    'Audífonos Wireless',
    'audifonos-wireless',
    'Audífonos inalámbricos con cancelación de ruido',
    199.99,
    'https://placehold.co/600x600/18181b/ffffff?text=Audifonos+Wireless'
)
ON CONFLICT (id) DO NOTHING;

-- 7. Add inventory records for the products in the main store
INSERT INTO public.store_inventory (id, store_id, product_id, quantity)
VALUES 
(
    '55555555-5555-5555-5555-555555555551',
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444441',
    50
),
(
    '55555555-5555-5555-5555-555555555552',
    '22222222-2222-2222-2222-222222222222',
    '44444444-4444-4444-4444-444444444442',
    100
)
ON CONFLICT (id) DO NOTHING;
