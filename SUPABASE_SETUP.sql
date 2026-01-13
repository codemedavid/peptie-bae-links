-- Create table if it doesn't exist
create table if not exists links (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  text text not null,
  href text not null,
  icon text,
  "order" integer default 0
);

-- Enable RLS
alter table links enable row level security;

-- Policies (Drop and recreate to avoid "already exists" errors)

-- 1. READ: Public (Anon) can read
drop policy if exists "Public links are viewable by everyone" on links;
create policy "Public links are viewable by everyone"
  on links for select
  to anon
  using (true);

-- 2. WRITE: Public (Anon) can write (Since we are using hardcoded client-side auth)
-- WARNING: This effectively makes the table public writable for anyone who knows the API
drop policy if exists "Authenticated users can manage links" on links;
drop policy if exists "Public can manage links" on links;

create policy "Public can manage links"
  on links for all
  to anon
  using (true);

-- SEED DATA
do $$
begin
  if not exists (select 1 from links) then
    insert into links (text, href, icon, "order") values
    ('Place Your Order', 'https://tiny.cc/paureorder', '🛒', 1),
    ('Tirzepatide Overview (Full Product & Education Guide)', 'https://www.canva.com/design/DAG-M5mcJYU/LlFfBr5OHdBKYF1_mzoMoA/view?utm_content=DAG-M5mcJYU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h71df313386', '📘', 2),
    ('Welcome Guide (Start Here)', 'https://tiny.cc/paureguide', '📖', 3),
    ('Contact PAURE', 'https://tiny.cc/paurecontactus', '💬', 4),
    ('Facebook — PAURE Wellness', 'https://www.facebook.com/paurewellness', '📘', 5);
  end if;
end $$;
