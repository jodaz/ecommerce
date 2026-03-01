# Complete Example: Product Management Feature

This example demonstrates a complete feature implementation using Next.js App Router, React Server Components, Server Actions, and Tailwind CSS.

---

## 1. Directory Structure

```
src/
  app/
    products/
      [id]/
        page.tsx
  features/
    products/
      actions/
        updateProduct.ts
      components/
        ProductEditForm.tsx
  types/
    product.ts
```

---

## 2. Global Type Definition

```tsx
// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  updatedAt: string;
}
```

---

## 3. Server Action (Mutation)

```tsx
// src/features/products/actions/updateProduct.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import type { ActionState } from '@/types/action-state';

export async function updateProduct(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));

  if (!name || name.length < 3) {
    return { error: 'Name must be at least 3 characters long.' };
  }

  try {
    await db.product.update({
      where: { id },
      data: { name, price },
    });

    revalidatePath(`/products/${id}`);
    return { success: true };
  } catch (e) {
    return { error: 'Failed to update product.' };
  }
}
```

---

## 4. Client Component (Interactive Form)

```tsx
// src/features/products/components/ProductEditForm.tsx
'use client';

import { useActionState } from 'react';
import { updateProduct } from '../actions/updateProduct';
import type { Product } from '~types/product';
import { cn } from '@/lib/utils';

export function ProductEditForm({ product }: { product: Product }) {
  const [state, formAction, isPending] = useActionState(updateProduct, null);

  return (
    <form action={formAction} className="space-y-6 max-w-xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <input type="hidden" name="id" value={product.id} />
      
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
        <input
          name="name"
          defaultValue={product.name}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price (USD)</label>
        <input
          name="price"
          type="number"
          defaultValue={product.price}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
        />
      </div>

      {state?.error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-all",
          isPending ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900 active:scale-[0.98]"
        )}
      >
        {isPending ? 'Updating...' : 'Update Product'}
      </button>
    </form>
  );
}
```

---

## 5. Page Component (Server Side Composition)

```tsx
// src/app/products/[id]/page.tsx
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ProductEditForm } from '@/features/products/components/ProductEditForm';
import type { Product } from '~types/product';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // Fetch data directly on server
  const product: Product | null = await db.product.findUnique({
    where: { id: params.id }
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Edit Product
          </h1>
          <p className="text-gray-500">ID: {product.id}</p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ProductEditForm product={product} />
          </div>
          
          <aside className="space-y-6">
            <div className="p-6 bg-black text-white rounded-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Last Updated</h3>
              <p className="text-lg font-mono">{new Date(product.updatedAt).toLocaleString()}</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
```