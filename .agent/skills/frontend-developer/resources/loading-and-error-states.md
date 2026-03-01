# Loading & Error States (Next.js)

In the App Router architecture, loading and error states are handled by specific file-level boundaries (`loading.tsx` and `error.tsx`). This allows for **Streaming SSR**, where the layout and shell are sent immediately, and slow data-fetching regions fill in later.

---

## 1. Loading States (`loading.tsx`)

A `loading.tsx` file creates a **Suspense Boundary** around the page segment. It is automatically rendered when a route segment is first loaded or when its data is being fetched on the server.

### The Skeleton Pattern
* Use `loading.tsx` for page-level transitions.
* Use Tailwind with `animate-pulse` or specific Skeleton components for a premium feel.

```tsx
// src/app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded-md" />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-lg border border-gray-200" />
        ))}
      </div>
    </div>
  );
}
```

### Granular Loading (Manual Suspense)
If only a small part of a page is slow (e.g., an activity feed), wrap just that component in `<Suspense>`.

```tsx
import { Suspense } from 'react';
import { SlowActivityFeed } from '@/features/dashboard/components/SlowActivityFeed';
import { FeedSkeleton } from '@/components/skeletons/FeedSkeleton';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      {/* Rapidly rendered UI */}
      
      <Suspense fallback={<FeedSkeleton />}>
        {/* Only this part will stream in when ready */}
        <SlowActivityFeed />
      </Suspense>
    </div>
  );
}
```

---

## 2. Error States (`error.tsx`)

The `error.tsx` file acts as a **React Error Boundary**. It captures errors in the specific segment and its children, preventing a single error from crashing the entire application.

### The Segment Error Boundary
* Must be a **Client Component**.
* Receives `error` and a `reset` function as props.

```tsx
// src/app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an observability service (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-red-100 rounded-lg bg-red-50">
      <h2 className="text-xl font-bold text-red-900">Something went wrong!</h2>
      <p className="mt-2 text-red-600 font-mono text-sm max-w-lg">{error.message}</p>
      <button
        onClick={() => reset()} // Attempts to re-render the segment
        className="mt-6 px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
```

---

## 3. Empty States

Return specific "Empty" UI components when a data set is empty. Never return `null` if the user expects feedback.

```tsx
export function EmptyOrderList() {
  return (
    <div className="flex flex-col items-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
      <span className="text-4xl">📦</span>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">No Orders Found</h3>
      <p className="mt-1 text-gray-500">When you place an order, it will appear here.</p>
    </div>
  );
}
```

---

## 4. Mutation Feedback (Toasts)

For mutations (Server Actions), never rely on page-level loaders for small updates. Use a toast/snack system initiated from the Client Component level.

* Use `useActionState` to track success/failure.
* Use a minimalist toast library or custom Tailwind component.

```tsx
'use client';

import { createProduct } from '../actions/createProduct';
import { useActionState, useEffect } from 'react';
import { toast } from '@/lib/toast'; // Your chosen minimalist toast implementation

export function CreateProductForm() {
  const [state, formAction] = useActionState(createProduct, null);

  useEffect(() => {
    if (state?.success) toast.success('Product created successfully');
    if (state?.error) toast.error(state.error);
  }, [state]);

  return <form action={formAction}>...</form>;
}
```

---

## 5. Summary Rules

1. **Streaming is Mandatory:** Always provide a `loading.tsx` for top-level app routes to prevent blocking the browser during data fetching.
2. **Graceful Failures:** Every major segment (dashboard, accounts, products) must have an `error.tsx`.
3. **Skeleton Fidelity:** Skeleton UI should roughly match the layout of the loaded component to prevent layout shifts (CLS).
4. **Retry Pattern:** Error boundaries must always provide a "Retry" or "Refresh" action.