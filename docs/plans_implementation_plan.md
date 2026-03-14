# Implementation Plan: Subscription Plans

## Phase 1: Database Schema & Migration
1. **Create Enums:**
   - `pricing_interval` ('monthly', 'annual')
   - `subscription_status` ('pending_activation', 'active', 'expired', 'cancelled')
2. **Create Tables:**
   - `plans` (id, name, description, max_stores, created_at)
   - `plan_prices` (id, plan_id, interval, price_usd, created_at)
   - `business_subscriptions` (id, business_id, plan_id, plan_price_id, status, start_date, end_date, created_at, updated_at)
3. **Seed Data:**
   - Insert "Emprendedor" (max_stores: 1) and "Empresarial" (max_stores: 999) plans.
   - Insert monthly/annual prices for both.
4. **Row Level Security (RLS):**
   - `plans` and `plan_prices`: Public read access.
   - `business_subscriptions`: Owners can read their own business's subscriptions.
5. **Update TypeScript Types:**
   - Update `src/types/supabase.ts` with the new tables and enums.

## Phase 2: Backend Logic (Manual Endpoint)
1. **Create Admin API Endpoint:**
   - Route: `POST /api/admin/subscriptions/change`
   - Purpose: Allow manual creation/update of a business's subscription.
   - Request Body: `{ business_id, plan_id, plan_price_id, start_date, end_date, status }`
2. **Endpoint Logic:**
   - Authenticate the request (e.g., using a secret admin token or verifying the user has global admin privileges).
   - If setting a new `active` subscription, optionally mark current active subscriptions for this business as `expired` or `cancelled` to avoid overlap.
   - **Downgrade handling:** If the new plan is "Emprendedor" (max_stores = 1), execute a query to update `stores` where `business_id = X` and `is_main = false`, setting `is_active = false`.
   - Insert the new record into `business_subscriptions`.

## Phase 3: Integration (Future)
- Update middleware or layout queries to check the active subscription when attempting to access multi-store features.
- Update the dashboard UI to show the current plan.
