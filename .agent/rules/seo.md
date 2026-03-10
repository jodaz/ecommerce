---
trigger: model_decision
description: When working on the frontend of the website (landing, terms, every related page which is not included in "sites" directory)
---

# SEO and Metadata Standards

All page components in this project must follow these SEO and metadata standards to ensure optimal search engine visibility and consistent social sharing.

## Mandatory Metadata

Every page component (`page.tsx`) MUST export a `metadata` object of type `Metadata` from `next`.

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | simpleshop",
  description: "Descriptive description in Spanish.",
};
```

## Rules

1. **Language**: All public-facing metadata (titles, descriptions) MUST be in Spanish, following the project's primary language rule.
2. **Branding**: Titles should follow the pattern `[Page Name] | simpleshop` for consistency.
3. **Descriptions**: Meta descriptions should be concise (under 160 characters) and provide a clear overview of the page's content.
4. **Main Layout**: The root `layout.tsx` should provide fallback metadata for any page that might miss it, but local page overrides are always preferred.
