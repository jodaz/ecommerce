# Routing Guide (Next.js App Router)

This codebase uses the **Next.js App Router** (`app/` directory) exclusively. All routing is folder-based, and components inside the `app/` directory are React Server Components by default.

---

## 1. Directory Structure

The `src/app/` directory defines your routes. 

* Each folder represents a route segment.
* Special files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) define the UI for that segment.
* You can use Route Groups `(folderName)` to organize routes without affecting the URL path.

```
src/
  app/
    (marketing)/          <-- Route Group (does not affect URL)
      page.tsx            <-- `/` route
      layout.tsx          <-- Shared layout for marketing pages
      about/
        page.tsx          <-- `/about` route
    (app)/
      layout.tsx          <-- Shared layout for app/dashboard
      dashboard/
        page.tsx          <-- `/dashboard` route
        loading.tsx       <-- Loading UI for dashboard
        error.tsx         <-- Error UI for dashboard
    categories/
      [slug]/             <-- Dynamic Segment
        page.tsx          <-- `/categories/electronics` route
```

---

## 2. Dynamic Segments

Use square brackets `[paramName]` to create dynamic routes.

```tsx
// src/app/categories/[slug]/page.tsx
interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.slug;
  // Fetch data based on the categoryId...
  return <div>Category: {categoryId}</div>;
}
```

---

## 3. Search Parameters

Next.js provides access to URL search parameters directly in Server Components via the `searchParams` prop.

```tsx
// src/app/products/page.tsx
interface ProductsPageProps {
  searchParams: { q?: string; page?: string };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const searchQuery = searchParams.q ?? '';
  const currentPage = Number(searchParams.page) || 1;
  
  // Fetch products based on searchQuery and currentPage
  return <div>Search results for: {searchQuery}</div>;
}
```

**Client-Side Note:** If you need to access search params in a Client Component, use the `useSearchParams()` hook from `next/navigation`.

---

## 4. Navigation

Always use the `Link` component from `next/link` for internal navigation to ensure prefetched routes and smooth client-side transitions.

```tsx
import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-700 transition">
        Go to Dashboard
      </Link>
    </nav>
  );
}
```

For programmatic navigation (e.g., redirecting after a form submission), use the `useRouter()` hook from `next/navigation` in Client Components, or `redirect()` from `next/navigation` in Server Components / Server Actions.

```tsx
// Client side programmatic navigation
'use client';
import { useRouter } from 'next/navigation';

export function LoginRedirect() {
  const router = useRouter();
  
  const handleSuccess = () => {
    router.push('/dashboard');
  };
  // ...
}
```

```tsx
// Server side redirect
'use server';
import { redirect } from 'next/navigation';

export async function submitForm() {
  // process form...
  redirect('/dashboard');
}
```

---

## 5. Parallel & Intercepted Routes

For advanced UI patterns (like modals, or side-by-side split screens), rely on Next.js constructs:

* **Parallel Routes (`@folder`)**: Allows you to simultaneously or conditionally render one or more pages in the same layout.
* **Intercepted Routes (`(..)folder`)**: Allows you to load a route from another part of your application within the current layout (e.g., opening a photo in a modal without losing the context of the feed).

---

## 6. Architecture Boundary: Features vs App

The `src/app/` directory should remain relatively thin. It acts as the composer of your application. Complex domain logic, reusable UI blocks, and API calls should live in `src/features/` or `src/components/`, and be imported into your route files.

```tsx
// src/app/dashboard/page.tsx
// 🟢 Good: App router composes feature components
import { DashboardMetrics } from '@/features/dashboard/components/DashboardMetrics';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DashboardMetrics />
      <RecentActivity />
    </div>
  );
}
```