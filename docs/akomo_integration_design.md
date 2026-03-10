# AKomo API Integration - Design Document

## 1. Understanding Summary

- **What is being built:** We are integrating the AKomo API (api.akomo.jodaz.xyz) to fetch and store exchange rates (BCV USD/EUR) in our e-commerce database.
- **Why it exists:** To keep exchange rates synced locally for fast, reliable access across the platform without directly querying the external API on every page load.
- **Who it is for:** Store administrators and customers (to see prices in local currency).
- **Key constraints:**
  - The synchronization must be triggered via a cron job.
  - The cron job must be **cloud-agnostic** (compatible with Vercel for production and Google Cloud for dev).
  - Only **BCV rates** (USD and EUR) will be synced for now.
  - The rates affect the entire platform (global setting, not per-tenant).
- **Explicit non-goals:**
  - We are not syncing Binance P2P rates at this moment.

## 2. Assumptions

- **Cron Route:** We will need a specific API route (e.g., `/api/cron/sync-exchange-rates`) that the cron scheduler (like Vercel Cron or Google Cloud Scheduler) will hit periodically.
- **Security:** Since anyone could theoretically find this URL and hit it (causing unnecessary API calls to AKomo), we need a way to verify the request is coming from our actual cron job. We can do this by checking if the request includes a specific secret token in the Headers (e.g., `Authorization: Bearer <CRON_SECRET>`), which we verify against an environment variable `CRON_SECRET`.
- **Database Schema:** We will need to create a new global table (e.g., `global_exchange_rates`) in Supabase to store this data since it doesn't exist yet and it needs to be available to all tenants.

## 3. Final Design / Implementation Steps

### Phase 1: Database Setup
1. Create a `global_exchange_rates` table in Supabase.
    - Fields: `id` (UUID), `currency` (VARCHAR, e.g., 'USD', 'EUR'), `rate` (NUMERIC), `last_synced_at` (TIMESTAMPTZ).
2. Enable Row Level Security (RLS) on this table.
    - Add a policy allowing `SELECT` for authenticated and anonymous users so the storefront can read the rates.
    - Only the service role (backend cron job) should be able to `INSERT/UPDATE`.

### Phase 2: API Route Creation
1. Create a Next.js App Router API Route at `src/app/api/cron/sync-exchange-rates/route.ts`.
2. Implement Authorization: Check the `Authorization` header against `process.env.CRON_SECRET`.
3. Fetch data from `https://api.akomo.jodaz.xyz/api/exchange-rates`.
4. Parse the response to extract BCV USD and EUR rates.
5. Upsert these rates into the `global_exchange_rates` Supabase table using the `@supabase/ssr` or `supabase-js` client with the `SERVICE_ROLE_KEY` to bypass RLS for writing.

### Phase 3: Environment Setup
1. Add `CRON_SECRET` to `.env.example` and ask the user to configure it in their dev environment and Vercel/GCP.
