---
name: ecommerce-auth-roles
description: Defines the role-based access control (RBAC) and tenant isolation rules for the Next.js e-commerce platform. Use when implementing auth, dashboards, or RLS.
---

# E-commerce Auth & Roles

## When to use this skill
- When implementing authentication or authorization logic in the application.
- When creating or modifying database schemas related to users, stores, or permissions (Row-Level Security).
- When building admin dashboard features that require role-based access control (RBAC) and tenant isolation.

## Roles Definition
The platform uses a strict multi-tenant model with the following defined roles:

1. **Business Owner (Admin)**
   - **Scope:** Can manage multiple stores (Tenant-level isolation).
   - **Permissions:** Full access to all categories, users, settings, shops, stocks, and sales data across all stores they own.
   - **DB representation:** Maps to the junction table `store_users` with role `admin` for each of their stores.

2. **Store Analyst**
   - **Scope:** Strictly ONE specific store.
   - **Permissions:** Restricted access. Can only view/manage stock and sales data from their assigned shop. Cannot modify settings or other users.
   - **DB representation:** Maps to the junction table `store_users` with role `analyst` for their specific `store_id`.

3. **Platform Admin**
   - **Scope:** Global SaaS Platform (Root Domain).
   - **Permissions:** Manages the entire platform, billing, global store settings, and cross-tenant data.
   - **DB representation:** Identified via Supabase's `auth.users.app_metadata ->> 'system_role' = 'superadmin'`.

4. **Customers (Buyers)**
   - **Scope:** Public storefronts (Subdomains).
   - **Permissions:** No authentication required. They can browse and purchase via guest checkout.

## Architecture Guidelines
- **Tenant Mapping:** The `store_users` table is the single source of truth for all relationships between Supabase `auth.users` and `stores`.
- **Database RLS:** Row-Level Security policies MUST use `store_users` to validate `INSERT`, `UPDATE`, and `DELETE` operations based on the user's role and the target `store_id`. Read operations (`SELECT`) for public models (products, categories) are globally open `USING (true)`.
- **Next.js Integration:** Use the Next.js Middleware (`src/proxy.ts`) to intercept `/[tenant]/admin/*` routes and validate session existence safely at the edge. Use Server Components (`layout.tsx` or `page.tsx`) to perform the exact `store_users` check for explicit authorization before rendering.
