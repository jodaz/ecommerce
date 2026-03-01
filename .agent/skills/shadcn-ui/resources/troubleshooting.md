# shadcn/ui Troubleshooting

Common issues and how to solve them.

---

## 1. CLI Installation Fails
- Ensure you have a `components.json` file in the root directory. If not, run `npx shadcn-ui@latest init` first.
- If `pnpm` errors occur, try using `pnpm dlx shadcn-ui@latest add [component]`.

## 2. Styling Doesn't Apply
- Verify that `tailwind.config.js` includes the folder where your components live. It should have `@/components/**/*.{ts,tsx}` in the `content` array.
- Check if your `globals.css` contains the necessary CSS variables for `primary`, `background`, etc.

## 3. Hydration Mismatch
- Issues often arise with `Dialog` or `Popover` when their content is rendered differently on server and client.
- Ensure that the trigger and content are consistent, and wrap interactive roots in a `useEffect` based mounting check if absolutely necessary.

## 4. Re-running the CLI
- If you refactored a component extensively, running `add` again will **overwrite** your changes. Always back up customizations before re-running the `add` command on an existing component.
