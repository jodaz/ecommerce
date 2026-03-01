# Common Patterns

This document details required patterns for frequent frontend challenges in a Next.js (App Router) + Tailwind CSS architecture.

---

## 1. The Server/Client Boundary

The most important pattern in Next.js is understanding where the server ends and the client begins. By default, everything is a Server Component unless marked with `"use client"`.

### Composing Server and Client Components

When you need interactivity (a Client Component) but also want to render a Server Component inside it, pass the Server Component as `children`. This prevents the Server Component from being implicitly converted to a Client Component.

```tsx
// src/components/ui/InteractiveWrapper.tsx
'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function InteractiveWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={twMerge(clsx('border rounded-md', isOpen ? 'border-primary' : 'border-gray-200'))}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 bg-gray-50">
        Toggle Content
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}

// src/app/page.tsx
import { InteractiveWrapper } from '@/components/ui/InteractiveWrapper';
import { ServerSideDataList } from './ServerSideDataList';

export default function Home() {
  return (
    <InteractiveWrapper>
      {/* This component executes on the server and is passed over the network as rendered HTML */}
      <ServerSideDataList />
    </InteractiveWrapper>
  );
}
```

---

## 2. Server Actions for Forms & Mutations

Forms should progressively enhance using Server Actions. Use React's `useActionState` (formerly `useFormState`) and `useFormStatus` to handle pending states and displaying server validation errors on the client.

```tsx
// src/features/users/actions/updateProfile.ts
'use server';
import { db } from '@/lib/db';

export async function updateProfile(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  if (name.length < 2) {
    return { error: 'Name must be at least 2 characters.' };
  }
  
  await db.users.update({ name });
  return { success: true };
}

// src/features/users/components/ProfileForm.tsx
'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfile } from '../actions/updateProfile';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="mt-4 px-4 py-2 bg-black text-white rounded">
      {pending ? 'Saving...' : 'Save Profile'}
    </button>
  );
}

export function ProfileForm() {
  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="flex flex-col gap-2 max-w-sm">
      <input 
        name="name" 
        className="border border-gray-300 rounded p-2 focus:ring-black focus:border-black" 
        defaultValue="Current Name" 
      />
      {state?.error && <span className="text-red-500 text-sm">{state.error}</span>}
      {state?.success && <span className="text-green-500 text-sm">Saved!</span>}
      <SubmitButton />
    </form>
  );
}
```

---

## 3. Class Name Merging (Tailwind CSS)

Always use a combination of `clsx` and `tailwind-merge` when building reusable UI components. This ensures conditional classes apply cleanly and Tailwind conflicting utilities (e.g., passing `px-4` to override a default `px-2`) behave predictably.

```tsx
// src/components/ui/Badge.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'error';
}

export function Badge({ variant = 'primary', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        {
          'bg-black text-white': variant === 'primary',
          'bg-gray-100 text-gray-800': variant === 'secondary',
          'bg-red-100 text-red-800': variant === 'error',
        },
        className
      )}
      {...props}
    />
  );
}
```

---

## 4. State Management

1. **Global Constants:** Export from a constants file.
2. **URL Search Params:** Use `searchParams` prop in Server Components, or `useSearchParams`/`useRouter` for client state that needs to be deep-linked (e.g., active tab, search query, filters). This is the preferred method for global state in SSR apps.
3. **Local UI State:** Use `useState` or `useReducer` in Client Components.
4. **Client-side Global State (e.g., Theme, Cart):** Use `Zustand` with `persist` for localStorage integration, initialized in a Client Component.

```tsx
// Using URL for state (Client Side Example)
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function FilterTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = searchParams.get('tab') || 'all';

  const setTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`); // Triggers server re-render
  };

  return (
    <div className="flex gap-2 mb-4">
      {['all', 'active', 'archived'].map(tab => (
        <button
          key={tab}
          onClick={() => setTab(tab)}
          className={cn('px-3 py-1 rounded-md text-sm', activeTab === tab ? 'bg-black text-white' : 'bg-gray-100')}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
```