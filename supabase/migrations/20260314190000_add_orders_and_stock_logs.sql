-- Migration: Add Orders and Inventory Logs
-- This migration adds support for persistent orders and detailed inventory history.

-- 1. Orders Table
CREATE TABLE IF NOT EXISTS public.business_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    customer_id_number TEXT NOT NULL, -- Cedula
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method_id UUID REFERENCES public.business_payment_methods(id) ON DELETE SET NULL,
    payment_reference TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'preparing', 'shipped', 'delivered', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Order Items
CREATE TABLE IF NOT EXISTS public.business_order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES public.business_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.business_products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL
);

-- 3. Inventory Logs (History)
CREATE TABLE IF NOT EXISTS public.inventory_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.business_products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.business_orders(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    change_amount INTEGER NOT NULL,
    previous_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    reason TEXT NOT NULL, -- 'restock', 'correction', 'sale', 'waste', 'transfer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable RLS
ALTER TABLE public.business_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_logs ENABLE ROW LEVEL SECURITY;

-- 5. Read Policies
CREATE POLICY "Orders viewable by business owners" ON public.business_orders 
    FOR SELECT USING (check_is_owner_of_business(business_id));

CREATE POLICY "Order items viewable by business owners" ON public.business_order_items 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.business_orders
            WHERE id = business_order_items.order_id 
            AND check_is_owner_of_business(business_id)
        )
    );

CREATE POLICY "Logs viewable by business owners" ON public.inventory_logs 
    FOR SELECT USING (check_is_owner_of_business(business_id));

-- 6. Write Policies (Checkout)
-- Public can insert orders (for now, or maybe authenticated if we add customers)
-- Since it's a shop, we want visitors to be able to place orders.
CREATE POLICY "Anyone can create orders" ON public.business_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON public.business_order_items FOR INSERT WITH CHECK (true);

-- 7. Management Policies (Admin)
CREATE POLICY "Owners can update orders" ON public.business_orders 
    FOR UPDATE USING (check_is_owner_of_business(business_id));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_business_orders_business_id ON public.business_orders(business_id);
CREATE INDEX IF NOT EXISTS idx_business_order_items_order_id ON public.business_order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product_id ON public.inventory_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_business_id ON public.inventory_logs(business_id);
