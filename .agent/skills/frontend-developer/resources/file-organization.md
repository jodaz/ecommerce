# File Organization (Next.js)

This project follows a **Feature-First** architecture alongside the Next.js **App Router** (`app/` directory). This ensures that domain logic remains modular while leveraging the filesystem-based routing of Next.js.

---

## 1. Directory Overview

```
src/
  app/                    <-- 1. Routing & Composition Layer
  features/               <-- 2. Domain Logic Layer
  components/             <-- 3. Shared Primitive Layer
  types/                  <-- 4. Global Type Definition Layer
  lib/                    <-- 5. Infrastructure & Utilities
  hooks/                  <-- 6. Shared React Hooks
```

---

## 2. The `app/` Directory (Routing & Composition)

The `app/` directory is responsible ONLY for routing, layouts, and composing features and shared components.

* Keep page files small.
* Prefer using **Route Groups** `(group-name)` for logical organization without URL impact.
* Colocate route-specific components only if they are entirely unique to that page.

```
src/app/
  (auth)/                 <-- Auth route group
    login/page.tsx
    register/page.tsx
  dashboard/
    layout.tsx
    page.tsx
    loading.tsx
    error.tsx
```

---

## 3. The `features/` Directory (Domain Logic)

A feature is a self-contained module representing a business domain (e.g., `products`, `orders`, `users`). 

**Structure of a feature:**
```
src/features/products/
  actions/                <-- Server Actions (mutations)
  components/             <-- Feature-specific UI
  helpers/                <-- Non-React utility functions
  index.ts                <-- Public API for the feature (Optional)
```

**Crucial Note:** Features should avoid cross-importing from other features' internal subdirectories. If a component is needed by multiple features, promote it to `src/components/`.

---

## 4. The `types/` Directory (Global Types)

All foundational TypeScript interfaces and types live in the root `src/types/` directory.

* **Alias:** Always use `~types/...` to import these.
* **Naming:** Use PascalCase for filenames and exported types.

```
src/types/
  user.ts
  order.ts
  api-response.ts
```

---

## 5. The `components/` Directory (Shared Primitives)

Base UI components (buttons, cards, inputs) that do not belong to a specific feature.

* Use a subfolder structure like `ui/`, `layout/`, or `skeletons/`.
* These components must be highly reusable and agnostic of domain data.

```
src/components/
  ui/
    Button.tsx
    Input.tsx
    Badge.tsx
```

---

## 6. Import Aliases Summary

| Alias         | Path             | Level                    |
| ------------- | ---------------- | ------------------------ |
| `@/`          | `src/`           | Project Root Alias      |
| `~types`      | `src/types`      | Global Types Alias      |
| `@/components/ui` | `src/components/ui` | shadcn-ui components |

---

## 7. Organization Rules

1. **Flat is better than nested:** Avoid going more than 3 directory levels deep within a feature.
2. **Feature Isolation:** If you find yourself importing `{ X } from '@/features/a/components/x'` into `@/features/b/components/y'`, consider moving `X` to `@/components/`.
3. **Public Exports:** Use `index.ts` in features to control what is exposed to the rest of the application.
4. **Colocation:** Keep `loading.tsx` and `error.tsx` right next to the `page.tsx` they protect.