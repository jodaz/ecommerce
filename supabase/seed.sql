-- Seeder for local testing
-- Creates a test user, a demo store, and assigns the admin role

-- 1. Confirm email for the created test user so they can login immediately
UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'admin@jodaz.xyz' AND email_confirmed_at IS NULL;

-- 2. Create the demo store if it doesn't exist
INSERT INTO public.stores (id, name, domain, description)
SELECT 
    '11111111-1111-1111-1111-111111111111', 
    'Tienda de Prueba', 
    'demo', 
    'Una tienda para realizar pruebas'
WHERE NOT EXISTS (SELECT 1 FROM public.stores WHERE domain = 'demo');

-- 3. Assign the admin role to the test user for the demo store
INSERT INTO public.store_users (store_id, user_id, role)
SELECT 
    (SELECT id FROM public.stores WHERE domain = 'demo' LIMIT 1), 
    (SELECT id FROM auth.users WHERE email = 'admin@jodaz.xyz' LIMIT 1), 
    'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM public.store_users 
    WHERE store_id = (SELECT id FROM public.stores WHERE domain = 'demo' LIMIT 1)
    AND user_id = (SELECT id FROM auth.users WHERE email = 'admin@jodaz.xyz' LIMIT 1)
);
