-- Marketing-site waitlist signups. No RLS policies on purpose: only the
-- service role (used by the `waitlist` edge function) can read or write.
-- Applied to project uqlrfzzszfsnjepuppdk as migration `waitlist_table`.
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

create unique index waitlist_email_unique on public.waitlist (lower(email));

alter table public.waitlist enable row level security;
