---
name: supabase-multitenancy
description: This skill should be used when the user asks to implement, modify, query, or interact with the Supabase database in the e-commerce project, specifically regarding tenant (store) isolation and Row-Level Security (RLS).
---

# Supabase Multi-tenant Setup

This skill provides the mandatory guidelines and patterns for interacting with the Supabase multi-tenant architecture in the Next.js e-commerce project.

## When to Use This Skill
This skill should be used when the user asks to implement, modify, query, or interact with the Supabase database, specifically regarding tenant (store) isolation, Next.js App Router integrations, and Row-Level Security (RLS).

## Infrastructure Chosen
- **Database**: Supabase (PostgreSQL)
- **Client**: `@supabase/supabase-js` & `@supabase/ssr`
- **Why**: Built-in Authentication, Row-Level Security (RLS) for rock-solid multi-tenancy, and seamless integration with Next.js App Router.

## Implementation Details

### 1. Database Schema (Logical Multi-tenancy)
The schema utilizes PostgreSQL `UUID`s and a `store_id` foreign key on all tenant-specific tables (`categories`, `products`).

**Row-Level Security (RLS)** is enabled by default. Read (`SELECT`) policies are set to public `USING (true)`, meaning the Next.js Server Components handle the filtering dynamically based on the URL domain.

The exact SQL definitions are located in `supabase_schema.sql` at the root of the project.

### 2. Next.js Integration
We use the standard `@supabase/ssr` pattern:
- **`src/lib/supabase/client.ts`**: Used inside Client Components to subscribe to realtime events or client-side fetches.
- **`src/lib/supabase/server.ts`**: Used inside Server Components and Server Actions. It reads/writes cookies correctly using Next.js 15+ async `cookies()`.

### 3. Querying by Tenant
Because Next.js proxies subdomains to `[tenant]`, inside page or layout components you MUST query like this:

```tsx
import { createClient } from '@/lib/supabase/server';

export default async function TenantPage({ params }: { params: Promise<{ tenant: string }> }) {
  const supabase = await createClient();
  const { tenant } = await params;
  
  // 1. Find the store ID by the domain (tenant slug)
  const { data: store } = await supabase
    .from('stores')
    .select('id, name')
    .eq('domain', tenant)
    .single();

  if (!store) return <div>Store not found</div>;

  // 2. Fetch products for this specific store
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('store_id', store.id);

  return (
    <div>
      <h1>Welcome to {store.name}</h1>
      {/* render products */}
    </div>
  );
}
```
