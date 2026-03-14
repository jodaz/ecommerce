-- Demo Seed Data (Manual execution after migration)
-- This creates sample businesses and owners for testing the subscription system.

-- 1. Create Demo Businesses
INSERT INTO public.businesses (id, name, slug)
VALUES 
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mega Import (Emprendedor)', 'megaimport'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Corporación MultiStore (Empresarial)', 'corpmulti')
ON CONFLICT (id) DO NOTHING;

-- 2. Create Business Settings
INSERT INTO public.business_settings (business_id, description, instagram_url, currency_code)
VALUES 
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Los mejores productos importados (Plan Emprendedor).', 'https://instagram.com/megaimport', 'USD'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Soluciones al mayor y detal (Plan Empresarial).', 'https://instagram.com/corpmulti', 'USD')
ON CONFLICT (business_id) DO NOTHING;

-- 3. Create Stores
-- One for megaimport
INSERT INTO public.stores (id, business_id, name, address, is_main)
VALUES ('ssssssss-ssss-ssss-ssss-ssssssssss01', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sucursal Central', 'Caracas, Venezuela', true)
ON CONFLICT (id) DO NOTHING;

-- Two for corpmulti
INSERT INTO public.stores (id, business_id, name, address, is_main)
VALUES 
('ssssssss-ssss-ssss-ssss-ssssssssss02', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Sede Principal Valencia', 'Valencia, Carabobo', true),
('ssssssss-ssss-ssss-ssss-ssssssssss03', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Express Maracay', 'Maracay, Aragua', false)
ON CONFLICT (id) DO NOTHING;

-- 4. Subscriptions
INSERT INTO public.business_subscriptions (business_id, plan_id, plan_price_id, status, start_date, end_date)
VALUES 
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
    '00000000-0000-0000-0000-000000000001', -- Emprendedor
    (SELECT id FROM public.plan_prices WHERE plan_id = '00000000-0000-0000-0000-000000000001' AND interval = 'monthly' LIMIT 1),
    'active', 
    now(), 
    now() + interval '1 month'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc', 
    '00000000-0000-0000-0000-000000000002', -- Empresarial
    (SELECT id FROM public.plan_prices WHERE plan_id = '00000000-0000-0000-0000-000000000002' AND interval = 'monthly' LIMIT 1),
    'active', 
    now(), 
    now() + interval '1 month'
)
ON CONFLICT (id) DO NOTHING;
