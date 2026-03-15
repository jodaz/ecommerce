# Styling Guide (Tailwind CSS)

This project strictly adheres to **Tailwind CSS** for all styling. UI component libraries like MUI, Bootstrap, or custom CSS-in-JS solutions are forbidden.

---

## 1. The Principle of Utility-First

Always favor utility classes over custom CSS. Utility classes ensure a consistent design language and keep the CSS bundle small.

### 🟢 Do:
* Use standard Tailwind classes (`px-4`, `flex`, `text-black`, etc.).
* Use **shadcn/ui** for complex primitives (Inputs, Selects, Dialogs).
* Use the minimalist black-and-white primary palette unless specified otherwise.

### ❌ Don't:
* Create `.css` files unless for global resets or complex third-party library overrides.
* Use the `style={...}` prop for static styles.
* Use UI library-specific styling props (e.g., MUI's `sx`).

---

## 2. Conditional Styling & Composition

For components that accept external `className` props or have internal conditional logic, use `clsx` and `tailwind-merge`. This pattern is non-negotiable for building reliable reusable components.

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-6 py-2 font-medium transition-all duration-200 rounded-md active:scale-95',
        variant === 'primary' ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black border border-black hover:bg-gray-50',
        className // Allows external overrides
      )}
      {...props}
    />
  );
}
```

---

## 3. Dark Mode & Theming

The primary design aesthetic is **Premium Minimalist** (Black and White).

* **Light Mode:** White background, black/gray-900 text, gray-200 borders.
* **Dark Mode:** Black/gray-950 background, white text, gray-800 borders.

Use the `dark:` prefix for all components to ensure they behave correctly in dark modes.

```html
<div class="bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800">
  ...
</div>
```

---

## 4. Typography

Use a high-quality modern sans-serif font (Inter, Roboto, or Outfit) via `next/font`.

* **Headings:** `text-2xl` to `text-5xl`, `font-bold` or `font-semibold`, `tracking-tight`.
* **Body:** `text-base` or `text-sm`, `leading-relaxed`.
* **Capitals:** For buttons or small UI labels, use `uppercase tracking-widest text-[10px]`.

---

## 5. Layout & Spacing

* **Mobile-First Responsiveness:** Always style starting from the smallest screen. Base classes are for mobile; use `sm:`, `md:`, `lg:` only for larger screen overrides.
* **Containers:** Use `max-w-7xl mx-auto px-4 md:px-8`.
* **Grids:** Always prefer `grid` over `flex` for page-level layouts.
* **Gaps:** Use standard spacing scale (`gap-4`, `gap-8`).

```tsx
export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {/* Product Items */}
    </div>
  );
}
```

---

## 6. Micro-animations

Leverage Tailwind's transition utilities for a premium feel.

* **Hovers:** Use `hover:opacity-80` or `hover:-translate-y-1`.
* **Transitions:** Always add `transition-all duration-300`.
* **Focus States:** Distinct black outlines: `focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2`.

---

## 7. Banned Patterns

❌ **Inline Styles:** Except for dynamic values (e.g., progress bar width).
❌ **Relative Units (em):** Use Tailwind's default `rem` based scale.
❌ **Important (`!`):** Avoid using `!important` classes. Fix the specificity or use `tailwind-merge` instead.
✅ **UI Primitives:** Use **shadcn/ui** for complex interactive components (Dialogs, Popovers) as they align with the project's minimalist Zinc aesthetic.