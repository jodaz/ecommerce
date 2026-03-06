---
name: ecommerce-multitenancy
description: This skill provides the core architectural patterns and Next.js App Router conventions used to implement the multi-tenant SaaS e-commerce platform.
---

# E-commerce Multitenancy Architecture

This skill outlines the architectural decisions and workflows applied to support a multi-tenant SaaS architecture in this Next.js e-commerce website.

## When to Use This Skill
This skill should be used when extending, debugging, or modifying the multi-tenant routing, middleware, layout, or shared architecture of the e-commerce project.

## Architectural Patterns

### 1. The Multi-tenant Routing Workflow
- **Goal**: Allow the application to serve multiple stores (tenants) dynamically based on the requested URL.
- **Process**:
  - Intercept incoming requests using Next.js Proxy/Middleware (`src/proxy.ts`).
  - Extract the subdomain (e.g., `tienda` from `tienda.localhost:3000`).
  - Rewrite the internal Next.js routing path to point to `/sites/{tenantId}{path}` without changing the user-facing URL in the browser.

### 2. Layout Separation
- **Goal**: Convert a single-store layout to a tenant-aware layout.
- **Process**:
  - Maintained shared components (`Navbar`, `Footer`) in the `[tenant]/layout.tsx` so every generated tenant gets the global UI.
  - Kept a minimalist, high-conversion SaaS landing page at the application root (`src/app/page.tsx`).

## Development Constraints

- **Package Manager**: Always use `pnpm`.
- **Language**: All generated user-facing content MUST be in Spanish (`es`).
- **Server Components**: Prioritize React Server Components (RSC) and Server Actions in Next.js 15+.
- **Middleware**: Use `src/proxy.ts` (not `middleware.ts` to avoid Next.js 16 deprecation warnings).
