# Decision Log
- **What:** What happens to extra stores when downgrading from Empresarial (multi-store) to Emprendedor (1 store)?
- **Decision:** Stores are deactivated except for the "main" one.

- **What:** How to determine the main store when downgrading?
- **Decision:** Use the existing `is_main` boolean flag in the `stores` table.

- **What:** How are subscription payments processed?
- **Decision:** Manual payments reported outside the system (via WhatsApp). The dashboard will only display the current active subscription status.

- **What:** Database architecture for plans and subscriptions?
- **Decision:** Option B (Robust approach). Separate `plans` table and a many-to-many `business_subscriptions` table to maintain historical records of which plan a business had/has.

- **What:** How to model monthly vs. annual pricing for plans?
- **Decision:** Base plans with price variants. A base `plans` table and a related `plan_prices` table containing the billing options (e.g., monthly, annual).