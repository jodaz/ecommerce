---
trigger: always_on
---

* Do not query Supabase directly from UI Client Components (`'use client'`). All database read/write operations must be abstracted and routed through Next.js App Router API Routes (`src/app/api/...`).
* One API file per feature
* No inline axios calls
* No `/api/` prefix in routes