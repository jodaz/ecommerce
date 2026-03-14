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

- **What:** What statuses should a business subscription have?
- **Decision:** Include `pending_activation`, `active`, `expired`, and `cancelled` to improve dashboard UX when a user requests a plan but the manual payment is pending confirmation.

- **What:** How to handle renewals (same plan extension)?
- **Decision:** Create a new record in `business_subscriptions` (consecutive subscriptions). This preserves the history of each individual billing cycle.

- **What:** How to efficiently query the current active plan for a business?
- **Decision:** Calculate on the fly. Query `business_subscriptions` where `start_date <= NOW()` and `end_date >= NOW()` to maintain a single source of truth without denormalization.
## Database Schema Design

### 1. `plans` table
Represents the available tiers (e.g., Emprendedor, Empresarial).
- `id` (UUID, PK)
- `name` (TEXT)
- `description` (TEXT)
- `max_stores` (INTEGER) - Defines the limit (e.g., 1 or 999 for unlimited)
- `created_at` (TIMESTAMP)

### 2. `plan_prices` table
Represents the pricing options for a plan (e.g., monthly vs annual).
- `id` (UUID, PK)
- `plan_id` (UUID, FK to plans)
- `interval` (ENUM: 'monthly', 'annual')
- `price_usd` (NUMERIC) - The cost in USD
- `created_at` (TIMESTAMP)

### 3. `business_subscriptions` table
The historical and current record of a business's subscriptions.
- `id` (UUID, PK)
- `business_id` (UUID, FK to businesses)
- `plan_id` (UUID, FK to plans)
- `plan_price_id` (UUID, FK to plan_prices)
- `status` (ENUM: 'pending_activation', 'active', 'expired', 'cancelled')
- `start_date` (TIMESTAMP)
- `end_date` (TIMESTAMP)
- `created_at` (TIMESTAMP)
