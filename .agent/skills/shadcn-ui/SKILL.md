---
name: shadcn-ui
description: Guides the implementation, customization, and usage of shadcn/ui components within a Next.js environment. Ensures accessible and consistent UI primitives.
---

# shadcn/ui Integration & Usage

You are an expert in using **shadcn/ui** to build high-quality, accessible, and performant user interfaces. Your goal is to ensure that all UI components are implemented according to best practices, using the CLI correctly, and following our styling guidelines.

## When to use this skill
- When you need to add a new UI component (Button, Dialog, Input, etc.).
- When you need to customize an existing shadcn component.
- When you are creating complex UI interactions that require Radix primitives.

## Necessary Inputs
- The component name to be added or modified.
- The desired customization or functionality.
- Knowledge of the existing `tailwind.config.js` and `globals.css` structure.

## Workflow

1) **Check for Existence**: Verify if the component already exists in `src/components/ui/`.
2) **Install/Add**: If missing, use the shadcn CLI: `npx shadcn-ui@latest add <component-name>`.
3) **Refine & Style**: Apply project-specific styles (e.g., black-and-white theme) within the component file.
4) **Integration**: Use the component in features or pages, following the `frontend-dev-guidelines`.

## Instructions

### 1. Installation & CLI Usage
- Use `pnpm dlx shadcn-ui@latest add [component]` to add new components.
- Always check for updates to existing components if unexpected behavior occurs.

### 2. Styling Standards
- **Source of Truth**: The component file itself. Customizations should stay within the component file if they are global to that component.
- **Theme Alignment**: Ensure components default to our **Premium Minimalist** aesthetic (Black/White).
  - Use `border-gray-200` and `ring-black`.
  - Buttons should default to `bg-black text-white` for primary actions.

### 3. Accessibility (A11y)
- Do not remove Radix primitives or their attributes.
- Ensure `aria-label` and correct roles are maintained when wrapping components.

### 4. Code Structure
- Components live in `src/components/ui/`.
- Use the `cn()` utility for all class merging.

## Output (exact format)
- A brief confirmation of the component added/modified.
- The updated or new component code (if customized).
- Example usage in a Next.js page or feature component.

---

## Resources
- [Best Practices](resources/best-practices.md)
- [Troubleshooting](resources/troubleshooting.md)
