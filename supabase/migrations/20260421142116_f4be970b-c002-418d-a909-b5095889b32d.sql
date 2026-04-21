
-- Tables
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  avatar_url text,
  created_at timestamptz default now()
);

create table public.team (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

create table public.pricing (
  id uuid primary key default gen_random_uuid(),
  tier_name text not null,
  price text not null,
  features jsonb,
  is_popular boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  client text not null,
  challenge text,
  result text,
  image_url text,
  created_at timestamptz default now()
);

create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  created_at timestamptz default now()
);

create table public.portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text,
  description text,
  created_at timestamptz default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  business_name text,
  service text,
  budget text,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.testimonials enable row level security;
alter table public.team enable row level security;
alter table public.pricing enable row level security;
alter table public.case_studies enable row level security;
alter table public.client_logos enable row level security;
alter table public.portfolio enable row level security;
alter table public.contact_submissions enable row level security;

-- Public read policies for content tables
create policy "public read testimonials" on public.testimonials for select using (true);
create policy "public read team" on public.team for select using (true);
create policy "public read pricing" on public.pricing for select using (true);
create policy "public read case_studies" on public.case_studies for select using (true);
create policy "public read client_logos" on public.client_logos for select using (true);
create policy "public read portfolio" on public.portfolio for select using (true);

-- Authenticated CRUD on content tables
create policy "auth insert testimonials" on public.testimonials for insert to authenticated with check (true);
create policy "auth update testimonials" on public.testimonials for update to authenticated using (true);
create policy "auth delete testimonials" on public.testimonials for delete to authenticated using (true);

create policy "auth insert team" on public.team for insert to authenticated with check (true);
create policy "auth update team" on public.team for update to authenticated using (true);
create policy "auth delete team" on public.team for delete to authenticated using (true);

create policy "auth insert pricing" on public.pricing for insert to authenticated with check (true);
create policy "auth update pricing" on public.pricing for update to authenticated using (true);
create policy "auth delete pricing" on public.pricing for delete to authenticated using (true);

create policy "auth insert case_studies" on public.case_studies for insert to authenticated with check (true);
create policy "auth update case_studies" on public.case_studies for update to authenticated using (true);
create policy "auth delete case_studies" on public.case_studies for delete to authenticated using (true);

create policy "auth insert client_logos" on public.client_logos for insert to authenticated with check (true);
create policy "auth update client_logos" on public.client_logos for update to authenticated using (true);
create policy "auth delete client_logos" on public.client_logos for delete to authenticated using (true);

create policy "auth insert portfolio" on public.portfolio for insert to authenticated with check (true);
create policy "auth update portfolio" on public.portfolio for update to authenticated using (true);
create policy "auth delete portfolio" on public.portfolio for delete to authenticated using (true);

-- Contact submissions: anyone can submit, only authenticated can read
create policy "anyone can submit contact" on public.contact_submissions for insert with check (true);
create policy "auth read contact" on public.contact_submissions for select to authenticated using (true);
