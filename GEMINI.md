# SimpleShop: Multi-tenant E-commerce Platform

## Project Overview
SimpleShop is a high-performance, multi-tenant SaaS e-commerce platform designed for the Venezuelan market. It enables business owners to manage multiple physical stores, unified business settings, and localized payment methods (Zelle, Pago Móvil, etc.) under a single business entity.

### Tech Stack
- **Framework:** Next.js 16.1.1 (Turbopack enabled)
- **Runtime:** Node.js (Latest LTS recommended)
- **Language:** TypeScript (Strict mode)
- **Database/Auth:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (with persist middleware)
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Docker & Google Cloud Run

### Architecture
- **Multi-tenancy:** Domain/Subdomain based isolation. Middleware rewrites requests from `tenant.simpleshop.xyz` to `src/app/sites/[tenant]/...`.
- **RBAC:** Scoped roles (`owner`, `administrative`) linked to specific businesses and stores.
- **API Strategy:** Database operations are abstracted into Next.js App Router API routes (`src/app/api/...`). UI Client Components must NOT query Supabase directly.

## Building and Running

### Development
```bash
pnpm install
pnpm dev
```
Access the landing page at `localhost:3000` or a tenant at `tenant.localhost:3000`.

### Production Build
```bash
pnpm build
pnpm start
```

### Type Checking
```bash
pnpm tsc
```

### Database
Schema is managed via Supabase migrations in `supabase/migrations/`.
- `supabase_schema.sql`: Reference snapshot of the base schema.
- `seed.sql`: Initial seed data for development.

## Development Conventions

### Language Requirement
- **Primary Language:** Spanish (Español 🇻🇪).
- All user-facing content, UI strings, error messages, and internal code comments must be in Spanish.
- Database seeds and mocks must use Spanish data.

### TypeScript & Backend
- **No 'any':** Strict typing is mandatory. Use the generated types in `src/types/supabase.ts`.
- **Server-Side Data:** Prefer Server Components for data fetching. Use `src/lib/supabase/server.ts` for server-side Supabase clients.
- **API Routes:** Keep API logic thin; delegate complex business logic to service functions in `src/lib/api/`.

### Styling
- Adhere to the established "MegaImport" aesthetic: high-contrast black/white theme, bold uppercase tracking for labels, and consistent spacing.
- Use the `cn()` utility from `src/lib/utils.ts` for tailwind class merging.

## Key Directory Structure
- `.agent/`: Custom instructions, rules, and skills for AI agents.
- `src/app/api/`: Backend endpoints.
- `src/app/sites/[tenant]/`: Tenant-specific page logic (The "Shopfront" and "Store Admin").
- `src/features/`: Modularized business features (Onboarding, Inventory, etc.).
- `src/stores/`: Client-side Zustand stores (e.g., `adminStore.ts`).
- `src/types/`: Centralized TypeScript interfaces and Database definitions.
