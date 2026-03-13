-- Demo Seed Data (Manual execution after migration)
-- This creates a sample business and owner for testing.

-- 1. Create a Demo Business
INSERT INTO public.businesses (id, name, slug)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mega Import', 'megaimport');

-- 2. Create Business Settings
INSERT INTO public.business_settings (business_id, description, instagram_url, currency_code)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Los mejores productos importados.', 'https://instagram.com/megaimport', 'USD');

-- 3. Create a Main Store for the business
INSERT INTO public.stores (id, business_id, name, address, is_main)
VALUES ('ssssssss-ssss-ssss-ssss-ssssssssssss', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sucursal Central', 'Caracas, Venezuela', true);

-- 3. Update or Create Profile for the test user
-- NOTE: Replace USER_ID with the actual UUID from auth.users after signup
-- INSERT INTO public.profiles (id, business_id, full_name, role)
-- VALUES ('USER_ID', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Admin Demo', 'owner');
