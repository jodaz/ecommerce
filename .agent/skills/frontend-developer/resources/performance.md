# Performance Guidelines (Next.js)

Next.js provides powerful performance optimizations out of the box. Our architecture leverages these to ensure high Lighthouse scores and zero Cumulative Layout Shift (CLS).

---

## 1. Image Optimization (`next/image`)

Always use the `Image` component from `next/image`. This automatically handles resizing, optimization (WebP/AVIF), and lazy loading.

### Rules of Engagement
* Provide `width` and `height` to prevent CLS.
* For background images or images whose dimensions are unknown, use the `fill` prop combined with a container having `position: relative`.
* Use the `priority` prop for the Largest Contentful Paint (LCP) image (e.g., Hero image).

```tsx
import Image from 'next/image';

export function ProductHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
```

---

## 2. Link Optimization (`next/link`)

Always use `Link` from `next/link`.

* **Prefetching:** Next.js automatically prefetches links in the viewport, making navigation feel instantaneous.
* **Scroll Restoration:** Automatic scroll position restoration.

```tsx
import Link from 'next/link';

export function Nav() {
  return <Link href="/search" className="hover:underline">Search</Link>;
}
```

---

## 3. Font Optimization (`next/font`)

Use `next/font/google` or `next/font/local`. This downloads the font at build time and hosts it with your assets, eliminating external network requests and layout shifts.

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 4. Code Splitting & Dynamic Imports

Next.js automatically splits code at the route level. For client-side components that are heavy or conditionally rendered, use `next/dynamic`.

```tsx
import dynamic from 'next/dynamic';

const ExpensiveChart = dynamic(() => import('@/components/charts/ExpensiveChart'), {
  loading: () => <p>Loading Chart...</p>,
  ssr: false, // Prevents server-side rendering for browser-only libraries
});

export function Dashboard() {
  return <ExpensiveChart />;
}
```

---

## 5. Caching Strategies

Leverage the Next.js Data Cache.

* **Full Route Caching:** Static routes are cached by default.
* **Data Cache:** `fetch()` calls are cached across requests by default.
* **Revalidation:** Use `revalidatePath` or `revalidateTag` in Server Actions to purge specific cached data when it changes.

```tsx
// Revalidating after a mutation
'use server';
import { revalidatePath } from 'next/cache';

export async function addComment() {
  // ... db logic ...
  revalidatePath('/posts/[slug]'); 
}
```

---

## 6. Avoiding Hydration Mismatch

Hydration mismatches occur when the server-rendered HTML doesn't match the first client-side render (e.g., using `new Date()` or `Math.random()` directly in a component).

* **Fix:** Use `useEffect` to trigger client-only rendering or use the `suppressHydrationWarning` prop on elements like `time`.

---

## 7. Performance Checklist

* [ ] All images use `next/image`.
* [ ] All fonts use `next/font`.
* [ ] No CLS: Containers have defined aspect ratios or heights.
* [ ] Bundle Size: Avoid importing heavy libraries (like `lodash`) directly; use specific sub-module imports or `next/dynamic`.
* [ ] Cache tags: Meaningful tags used for data fetching to allow precise revalidation.