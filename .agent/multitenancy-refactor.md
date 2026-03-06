# E-commerce Multitenancy Refactoring

This document outlines the skills, workflows, and rules applied during the refactoring of the e-commerce website to support a multi-tenant SaaS architecture (similar to `events-saas`).

## 🛠️ Skills Utilized

1. **`nextjs-app-router-patterns` / `nextjs-best-practices`**:
   - **Pattern**: Dynamic route segments for tenants (`[tenant]`).
   - **Implementation**: Moved existing core application routes (`admin`, `products`, `contact`, and `page.tsx`) under `src/app/sites/[tenant]/`.
   - **Optimization**: Renamed Next.js 16 deprecated `middleware.ts` to `proxy.ts` to prevent build warnings.

2. **`clean-code` & `architecture`**:
   - **Pattern**: Separation of concerns.
   - **Implementation**: Maintained shared components (`Navbar`, `Footer`) in the `[tenant]/layout.tsx` while keeping a distinct landing page at the root `app/page.tsx` for the main SaaS portal.

3. **`frontend-dev-guidelines`**:
   - **Pattern**: Language and localization standards.
   - **Implementation**: Set the root HTML language strictly to Spanish (`<html lang="es">`) matching the target audience of the SaaS platform.

4. **`bash-pro` & File Management**:
   - **Pattern**: Safe and efficient terminal operations for refactoring.
   - **Implementation**: Leveraged parallel file movement and directory creation without disrupting existing imports or layout structures.

## 🔄 Workflows Implemented

### 1. The Multi-tenant Routing Workflow
- **Goal**: Allow the application to serve multiple stores (tenants) dynamically based on the requested URL.
- **Process**:
  - Intercept incoming requests using Next.js Proxy/Middleware (`src/proxy.ts`).
  - Extract the subdomain (e.g., `tienda` from `tienda.localhost:3000`).
  - Rewrite the internal Next.js routing path to point to `/sites/{tenantId}{path}` without changing the user-facing URL in the browser.

### 2. E-commerce Core Migration Workflow
- **Goal**: Convert a single-store layout to a tenant-aware layout.
- **Process**:
  - Restructured `src/app/` to isolate the SaaS landing page from the tenant portals.
  - Transplanted the core e-commerce layout into `src/app/sites/[tenant]/layout.tsx` so every generated tenant gets the global Navbar and Footer.
  - Kept a minimalist, high-conversion landing page at the application root (`src/app/page.tsx`).

## 📜 Development Rules & Constraints Applied

- **Package Manager Rule**: *Always use `pnpm`.*
  - Enforced during the verification and build phases (`pnpm build`).
- **Language Rule**: *Spanish focus.*
  - All default copy, landing page texts, and HTML lang attributes are set to Spanish to cater to the primary demographic (e.g., "Mega Import C.A.", "Plataforma SaaS de E-commerce").
- **Deployment Safety Rule**:
  - Ensure zero build errors post-refactor. The `pnpm build` was run directly to validate Next.js 16.1.1 (Turbopack) optimizations, static page generation, and dynamic route behavior.
