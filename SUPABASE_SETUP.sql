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
    ('Pricelist', 'https://www.canva.com/design/DAG9DQP5qtk/cb3QfT4fuJ4vlI6bjZ7c_A/edit', '📋', 1),
    ('WhatsApp', 'https://wa.me/638980078807', '💬', 2),
    ('Mobile', 'tel:09993904025', '📞', 3),
    ('Messenger', 'https://m.me/889273047596403', '📨', 4),
    ('TikTok', 'https://tiktok.com/@saepeptiebae', '🎵', 5),
    ('Facebook', 'https://www.facebook.com/share/1AXAx5HUcJ/', '📘', 6);
  end if;
end $$;
