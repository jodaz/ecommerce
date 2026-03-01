# Data Fetching & Mutations (Next.js)

The frontend architecture relies on **React Server Components (RSC)** for initial data fetching and **Server Actions** for mutations. Client-side fetching is reserved for specific use cases like highly interactive grids, polling, or infinite scrolling.

---

## 1. Fetching Data (Server Components)

By default, fetch data directly in your React Server Components. This approach eliminates client-side network waterfalls and ships less JavaScript to the browser.

### The Standard Pattern

```tsx
import { db } from '@/lib/db';
import type { Product } from '~types/product';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Fetch data directly on the server
  const product: Product | null = await db.products.findById(params.id);

  // 2. Handle 404s cleanly
  if (!product) {
    notFound();
  }

  // 3. Render directly with the data
  return (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
        {product.name}
      </h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <span className="inline-block mt-4 px-3 py-1 bg-black text-white rounded-full text-sm font-medium">
        ${product.price}
      </span>
    </article>
  );
}
```

### Using Next.js Fetch Wrapper (Caching & Revalidation)

If you are fetching from external APIs, use the extended `fetch` provided by Next.js to control caching and revalidation.

```tsx
export async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'], revalidate: 3600 }, // Cache for 1 hour, or until revalidated by tag
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}
```

---

## 2. Mutations (Server Actions)

Mutations (creates, updates, deletes) are handled via **Server Actions**. These are asynchronous functions executed on the server that can be called directly from Client Components or passed to forms in Server Components.

### Defining a Server Action

Server actions should usually be defined in a dedicated file (e.g., `src/features/products/actions/createProduct.ts`) to avoid mixing client/server boundaries inappropriately.

```tsx
// src/features/products/actions/createProduct.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function createProduct(formData: FormData) {
  // 1. Extract data
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));
  
  // 2. Validate data
  if (!name || isNaN(price)) {
    return { error: 'Invalid product data' };
  }

  // 3. Perform the mutation
  await db.products.insert({ name, price });

  // 4. Revalidate cache and redirect
  revalidatePath('/products');
  redirect('/products');
}
```

### Using a Server Action in a Form (Server Component)

Server Components can pass actions directly to the `action` prop of a form. This works even with JavaScript disabled.

```tsx
// src/app/products/new/page.tsx
import { createProduct } from '@/features/products/actions/createProduct';

export default function NewProductPage() {
  return (
    <form action={createProduct} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" id="price" name="price" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
      </div>
      <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
        Create Product
      </button>
    </form>
  );
}
```

### Using `useActionState` and `useFormStatus` (Client Components)

To provide pending states and inline error messages, you must use Client Components with the `useActionState` and `useFormStatus` hooks.

```tsx
// src/features/products/components/ProductForm.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProduct } from '../actions/createProduct';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={twMerge(
        clsx(
          'px-4 py-2 rounded-md transition-colors',
          pending ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-black hover:bg-gray-800 text-white'
        )
      )}
    >
      {pending ? 'Submitting...' : 'Create Product'}
    </button>
  );
}

export function ProductForm() {
  // useActionState connects form state (errors, success messages) to the server action
  const [state, formAction] = useActionState(createProduct, null);

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      {/* ... inputs ... */}
      
      {state?.error && (
        <p className="text-red-500 text-sm mt-2">{state.error}</p>
      )}
      
      <SubmitButton />
    </form>
  );
}
```

---

## 3. Client-Side Fetching (React Query / SWR)

While RSC is the default, client-side fetching is acceptable and necessary for:
1. Infinite scrolling feeds.
2. Data that updates frequently and needs polling.
3. Complex interactive client-side tables/grids.

To do this, you can initialize React Query in a Client Provider and use hooks like `useQuery` or `useInfiniteQuery`. However, always try to hydrate initial data from the Server Component to avoid empty loading spinners on the first paint.

```tsx
// src/features/dashboard/components/LiveMetrics.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../api/clientApi';

export function LiveMetrics({ initialData }: { initialData: any }) {
  const { data } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    initialData, // Prevents loading state on initial render
    refetchInterval: 5000, // Poll every 5s
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      Active Users: {data.activeUsers}
    </div>
  );
}
```

---

## 4. Banned Patterns

❌ **`useEffect` + `fetch` on Mount:** Never use `useEffect` to load the initial dataset for a page. Use Server Components.
❌ **Route Handlers (`/api/...`) for Internal Data:** If your frontend and backend are in the same Next.js app, do not `fetch('/api/...')` from a Client Component to your own Next.js API routes just to load data. Use Server Actions or Direct DB calls in RSC instead. Route Handlers are meant primarily for external webhook consumers or integrations.