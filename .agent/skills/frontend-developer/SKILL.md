---
name: frontend-dev-guidelines
description: Opinionated frontend development standards for modern Next.js + React + TypeScript applications. Covers Server-first architecture (RSC), App Router, Tailwind CSS, Server Actions, feature-based architecture, performance optimization, and strict TypeScript practices.
---


# Frontend Development Guidelines

**(Next.js App Router · React Server Components · Tailwind CSS · TypeScript · Production-Grade)**

You are a **senior frontend engineer** operating under strict architectural and performance standards.

Your goal is to build **scalable, predictable, and maintainable Next.js applications** using:

* Server-first architecture using React Server Components (RSC)
* Next.js App Router (`app/` directory)
* Feature-based code organization
* Tailwind CSS + shadcn/ui for styling and components
* Mobile-first responsive design
* Strict TypeScript discipline
* Performance-safe defaults

This skill defines **how frontend code must be written**, not merely how it *can* be written.

---

## 1. Frontend Feasibility & Complexity Index (FFCI)

Before implementing a component, page, or feature, assess feasibility.

### FFCI Dimensions (1–5)

| Dimension             | Question                                                         |
| --------------------- | ---------------------------------------------------------------- |
| **Architectural Fit** | Does this align with the Server Components / App Router model?   |
| **Complexity Load**   | How complex is state, data, and interaction logic?               |
| **Performance Risk**  | Does it introduce rendering, bundle size, or CLS risk?           |
| **Reusability**       | Can this be reused without modification?                         |
| **Maintenance Cost**  | How hard will this be to reason about in 6 months?               |

### Score Formula

```
FFCI = (Architectural Fit + Reusability + Performance) − (Complexity + Maintenance Cost)
```

**Range:** `-5 → +15`

### Interpretation

| FFCI      | Meaning    | Action            |
| --------- | ---------- | ----------------- |
| **10–15** | Excellent  | Proceed           |
| **6–9**   | Acceptable | Proceed with care |
| **3–5**   | Risky      | Simplify or split |
| **≤ 2**   | Poor       | Redesign          |

---

## 2. Core Architectural Doctrine (Non-Negotiable)

### 1. Server Components Are the Default
* All components are React Server Components by default.
* Provide data to the client using server-rendered HTML.
* Use `"use client"` **only** when interactivity (hooks, event listeners) or browser APIs are required.
* Keep Client Components as small as possible; pass Server Components as `children` to Client Components if needed.

### 2. Next.js App Router
* Use folder-based routing in the `app/` directory (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`).
* Colocate route-specific components inside the route folder if they are not shared.

### 3. Tailwind CSS + shadcn/ui
* Use pure Tailwind CSS utility classes and shadcn/ui components.
* Avoid other UI component libraries (e.g., MUI).
* shadcn/ui components are the source of truth for all complex primitives (Modals, Popovers, Tabs).
* Use `clsx` and `tailwind-merge` (the `cn` utility) for conditional class joining.

### 4. Feature-Based Organization
* Domain logic lives in `src/features/`
* Reusable primitives (Buttons, Inputs) live in `src/components/`
* The `src/app/` directory is purely for routing and composing features.
* Cross-feature coupling is forbidden.

### 5. Strict TypeScript
* No `any`
* Handle `null` and `undefined` explicitly
* `import type` always

### 6. Mobile-First Responsiveness
* All UI must be designed and implemented mobile-first.
* Use base Tailwind classes for mobile styles (e.g., `flex-col`, `text-sm`).
* Use breakpoint prefixes (`sm:`, `md:`, `lg:`) only to add or override styles for larger screens.
* Avoid using max-width based media queries; stick to Tailwind's min-width default breakpoints.

---

## 3. When to Use This Skill

Use **frontend-dev-guidelines** when:

* Creating components or pages in Next.js
* Adding new features
* Fetching or mutating data (Server Actions vs Client fetching)
* Setting up routing (`app/` router)
* Styling with Tailwind CSS
* Addressing performance issues
* Reviewing or refactoring frontend code

---

## 4. Quick Start Checklists

### New Component Checklist

* [ ] Decide if it should be a Server or Client component (Server by default).
* [ ] If Client component, add `"use client"` at the very top.
* [ ] Use shadcn/ui components for complex interactive parts (Buttons, Dialogs).
* [ ] Implement mobile-first responsive styles (base classes for mobile, prefixes for larger screens).
* [ ] `export default function Component(props: Props)` or `export const Component = ...`
* [ ] Explicitly type props.
* [ ] Styles applied strictly via Tailwind CSS classes.
* [ ] No inline styles unless for dynamic variables.

### New Feature Checklist

* [ ] Create `src/features/{feature-name}/`
* [ ] Subdirs: `actions/` (Server Actions), `components/`, `types/`, `helpers/`
* [ ] Isolate domain logic within the feature folder.
* [ ] Public exports via `index.ts` if creating a module boundary.
* [ ] Compose the feature inside `src/app/` route pages.

---

## 5. Import Aliases (Required)

| Alias         | Path             |
| ------------- | ---------------- |
| `@/`          | `src/`           |
| `~types`      | `src/types`      |
| `~components` | `src/components` |
| `~hooks`      | `src/lib/hooks`  |

Aliases must be used consistently. Use `@/features/...`, `@/components/...`, `~types/...`, and `~hooks/...`.

---

## 6. Component Standards

### Server Component (Default)

```tsx
import { db } from '@/lib/db';
import type { User } from '@/features/users/types';

interface UserProfileProps {
  userId: string;
}

export default async function UserProfile({ userId }: UserProfileProps) {
  // Direct data fetching in the server component
  const user: User = await db.getUser(userId);

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
    </div>
  );
}
```

### Client Component

```tsx
'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ToggleButtonProps {
  initialState?: boolean;
  className?: string;
  onToggle: (state: boolean) => void;
}

export function ToggleButton({ initialState = false, className, onToggle }: ToggleButtonProps) {
  const [active, setActive] = useState(initialState);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    onToggle(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={twMerge(
        clsx(
          'px-4 py-2 rounded-md transition-colors',
          active ? 'bg-black text-white' : 'bg-gray-200 text-gray-800',
          className
        )
      )}
    >
      {active ? 'Active' : 'Inactive'}
    </button>
  );
}
```

---

## 7. Data Fetching & Mutations

### Fetching (Queries)
* **Default:** Fetch data directly in Server Components using `await fetch()` or direct DB/Service calls.
* **Client-side Fetching:** If data must be fetched on the client (e.g., polling, highly interactive data, infinite scroll), use SWR, React Query, or `use` hooked with a cached promise.

### Mutations
* **Default:** Use Server Actions for form submissions and data mutations.
* Pass Server Actions from Server Components to Client Components to handle interactivity with progressive enhancement.

```tsx
// @/features/posts/actions/createPost.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  await db.posts.insert({ title });
  revalidatePath('/posts');
}
```

---

## 8. Routing Standards (Next.js App Router)

* Folder-based routing exclusively.
* Use `loading.tsx` to display basic skeletons during async Server Component rendering.
* Use `error.tsx` to handle segment-level errors gracefully.
* Search parameters are accessed via the `searchParams` prop in `page.tsx` (Server side) or `useSearchParams` hook (Client side).

---

## 9. Styling Standards (Tailwind CSS)

### Pure Utility Classes
* Use Tailwind utility classes only. Avoid abstracting to custom CSS files or inline styles unless absolutely necessary for dynamic layout calculations.
* Use `twMerge(clsx(...))` when merging passed `className` props with default component classes to prevent styling collisions.

---

## 10. Performance Defaults

* Use `next/image` for optimized images (Lazy loading, WebP format, responsive sizes).
* Use `next/link` for prefetching and client-side navigation.
* Use `next/font` to optimize font loading and prevent CLS.
* Always analyze bundle sizes to ensure heavy interactive libraries are lazy-loaded (`next/dynamic`) or confined strictly to small Client Components.

---

## 11. Canonical File Structure

```
src/
  app/
    (marketing)/
      page.tsx
      layout.tsx
    dashboard/
      loading.tsx
      page.tsx
  features/
    products/
      actions/
      components/
      helpers/
      index.ts
  components/
    ui/
      Button.tsx
      Input.tsx
  types/
    user.ts
    product.ts
```

---

## 12. Anti-Patterns (Immediate Rejection)

❌ Placing `"use client"` at the top of every file "just in case".
❌ Fetching initial required data in a `useEffect` on the client instead of doing it in a Server Component.
❌ Using MUI, Bootstrap, or custom global CSS instead of Tailwind utility classes.
❌ Passing massive unfetched payloads to client components instead of keeping serialization boundaries small.
❌ Not handling Loading and Error states gracefully via `loading.tsx` and `error.tsx`.

---

## 13. Operator Validation Checklist

Before finalizing code:

* [ ] Are Server Components used wherever possible?
* [ ] Is `"use client"` pushed down the component tree to the exact nodes that need it?
* [ ] Are you using Next.js `Image`, `Link`, and `Font`?
* [ ] Are mutations handled via Server Actions where appropriate?
* [ ] Is all styling exclusively using Tailwind CSS?

---

## 14. Skill Status

**Status:** Stable, opinionated, and enforceable
**Intended Use:** Next.js Applications prioritizing Server Components, Server Actions, and Tailwind CSS.
