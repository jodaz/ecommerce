# Component Patterns

This document establishes the structural rules for all React components in the Next.js frontend architecture.

---

## 1. File Structure & Colocation

### Single File Principle
* Components under 150 lines should keep their types, sub-components, and styling helpers in the same file.
* Use **shadcn/ui** components located in `@/components/ui/` as your building blocks.
* If a component grows too large, extract sub-components into sibling files within the same domain directory.

### Types Colocation
* Feature-specific types live in `@/features/{feature}/types/`.
* Global types live in `~types/`.
* Component prop types are defined directly above the component export.

---

## 2. Server Components (Default)

Server Components are the default in Next.js. They run on the server, fetch data directly, and ship zero JavaScript to the client.

### Pattern: Async Server Component
* Use `async/await` directly in the component signature.
* Do not use hooks (`useState`, `useEffect`, `useContext`) in Server Components.

```tsx
import { db } from '@/lib/db';
import type { Product } from '~types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  categoryId: string;
}

export default async function ProductList({ categoryId }: ProductListProps) {
  const products: Product[] = await db.products.findMany({ where: { categoryId } });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 3. Client Components (`"use client"`)

Only use `"use client"` when you need browser APIs, interactivity (event listeners), or React state/effects.

### Pattern: The Interactivity Leaf
Push `"use client"` down the component tree as far as possible. Instead of making an entire page a Client Component just for one togglable dropdown, isolate the dropdown.

### Component Structure Order (Client Components)
1. Types / Props
2. Hooks & State
3. Derived values (`useMemo`, simple variables)
4. Handlers
5. Render return

```tsx
'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ExpandableTextProps {
  children: React.ReactNode;
  maxLines?: number;
  className?: string;
}

export function ExpandableText({ children, maxLines = 3, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={twMerge(clsx('text-gray-800', className))}>
      <div className={clsx(!expanded && `line-clamp-${maxLines}`)}>
        {children}
      </div>
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="text-black font-semibold uppercase text-xs mt-2 hover:underline"
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}
```

---

## 4. The `children` Prop (Composition)

Use the `children` prop heavily. This pattern is crucial in App Router to pass unwrappable Server Components into Client Component shells, bypassing serialization errors.

```tsx
// 🟢 Good: Server Component passes children to Client Shell
// /app/layout.tsx
import { ClientSidebarMenu } from '@/components/ClientSidebarMenu';
import { ServerSideNavLinks } from '@/components/ServerSideNavLinks';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientSidebarMenu>
      <ServerSideNavLinks /> {/* Evaluated on server, passed to client shell */}
    </ClientSidebarMenu>
  );
}
```

---

## 5. Prop Types

* Always type props explicitly with an `interface` named `{ComponentName}Props`.
* Prefer `React.ReactNode` for `children` types.
* Avoid `React.FC` or `React.FunctionComponent`; define the component as a standard function (it handles generics better and allows `async` types cleanly in Next.js).

```tsx
// 🟢 Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ variant = 'primary', isLoading, children, className, ...props }: ButtonProps) {
  return <button className={/* ... */} {...props}>{children}</button>;
}

// ❌ Bad (React.FC hides implicit typing and conflicts with async Server Components)
export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
```