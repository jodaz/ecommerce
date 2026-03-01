# TypeScript Standards (Next.js)

Our TypeScript configuration adheres to the strictest possible standards to ensure type safety across the server-client boundary and within the Next.js App Router tree.

---

## 1. Strict Mode

The `tsconfig.json` must have `'strict': true` enabled.

* **No `any`:** Under no circumstances should `any` be used. Use `unknown` if the type is truly uncertain, or `interface` for known structures.
* **Non-Nullable:** Handle `null` and `undefined` explicitly via optional chaining (`?.`) or nullish coalescing (`??`).

---

## 2. Next.js Specific Types

### Page & Layout Props
Always type the props for `page.tsx` and `layout.tsx`.

```tsx
// src/app/products/[id]/page.tsx
interface ProductPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  // ...
}
```

### Server Actions
State within `useActionState` should be strictly typed.

```tsx
// src/features/products/types/action-state.ts
export interface ActionState {
  success?: boolean;
  error?: string;
  data?: any;
}
```

---

## 3. Global vs Feature Types

### Global Types (`src/types/`)
* **Location:** Use `src/types/` for entities used by 3+ features or core system types.
* **Alias:** Use the `~types/...` alias.
* **Structure:** One file per entity (e.g., `user.ts`, `auth.ts`).

### Feature Types (`src/features/{f}/types/`)
* **Location:** Use for types strictly coupled with one domain.
* **Alias:** Use `@/features/f/types`.

---

## 4. Design Patterns

* **Interfaces vs Types:**
  * Use **Interfaces** for public APIs, props, and object definitions (they are more performant and extendable).
  * Use **Types** for unions, intersections, and primitives.

* **Discriminated Unions:**
  Use for state management to ensure all possible paths are handled.

```tsx
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; message: string };
```

---

## 5. Banned Patterns

❌ **`as const` for Enums:** Prefer string literal unions over Enums for better readability and performance.
❌ **`React.FC`:** As noted in the Component Patterns, use standard function declarations.
❌ **Implicit returns:** Always provide explicit return types for functions, especially those exported from a file.
❌ **`any` data fetching:** Every fetch or DB call must be cast to a specific interface.

---

## 6. JSDoc Documentation

Publicly exported components and utility functions must have JSDoc blocks for better developer experience and tooling.

```tsx
/**
 * Renders a primary call-to-action button.
 * @param variant - Visual style of the button.
 * @param isLoading - Whether the button is in a loading state.
 */
export function Button({ variant, isLoading, ...props }: ButtonProps) {
  // ...
}
```

---

## 7. Absolute Rule on Nullability

Never use non-null assertions (`!`). If a value could be null, the code must account for that possibility with a guard or a fallback.

```tsx
// ❌ Bad
const user = await db.getUser(id);
console.log(user!.name);

// 🟢 Good
const user = await db.getUser(id);
if (!user) return <p>User not found</p>;
console.log(user.name);
```