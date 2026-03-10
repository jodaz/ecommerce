create table if not exists public.global_exchange_rates (
    id uuid default gen_random_uuid() primary key,
    currency text not null unique,
    rate numeric not null,
    last_synced_at timestamptz default now() not null
);

-- Enable RLS
alter table public.global_exchange_rates enable row level security;

-- Policy: Everyone can read exchange rates
create policy "Rates are viewable by everyone"
    on public.global_exchange_rates for select
    to authenticated, anon
    using (true);

-- Note: No INSERT/UPDATE policies needed because the cron job
-- will use the service_role key to bypass RLS.
