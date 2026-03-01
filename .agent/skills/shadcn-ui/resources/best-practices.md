# shadcn/ui Best Practices

Follow these guidelines to maintain a clean and reliable UI layer using shadcn/ui.

---

## 1. Customization Boundary
- **Keep it global**: If a change (like a default border color) applies to all buttons, edit the `src/components/ui/button.tsx` directly.
- **Keep it local**: If a change is specific to a single feature, pass a `className` prop instead of modifying the global component.

## 2. Using the `cn` Utility
Always use the `cn` utility to merge classes. This ensures that Tailwind utility conflicts are resolved correctly (via `tailwind-merge`) and that conditional joining is clean (via `clsx`).

```tsx
import { cn } from "@/lib/utils";

export function CustomCard({ className, children }) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}>
      {children}
    </div>
  );
}
```

## 3. Server vs. Client Components
- Many shadcn components (like Dialog, Popover, Tabs) rely on Radix UI, which uses React state. These **must** be Client Components.
- When using these in a Server Component, create a wrapper Client Component or push the interactivity down into a smaller interactive leaf.

## 4. Primitive Names
- Do not rename exported primitives (e.g., `DialogTrigger`, `DialogHeader`). Familiarity with the shadcn/Radix naming convention is critical for team speed.

## 5. Input Accessibility
- Always use the `Label` component with `Input` and ensure `htmlFor`/`id` match.

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmailField() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}
```
