-- ================================================================
-- R.K. Electricals — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- TESTIMONIALS
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  review     text not null,
  rating     integer not null default 5 check (rating between 1 and 5),
  location   text,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

-- PROJECTS
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  category    text not null check (category in ('residential','commercial','builder','amc')),
  image_url   text,
  video_url   text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- LEADS
create table if not exists leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  phone        text not null,
  email        text,
  service_type text,
  message      text,
  status       text not null default 'new' check (status in ('new','contacted','converted','closed')),
  created_at   timestamptz not null default now()
);

-- ================================================================
-- ROW-LEVEL SECURITY (RLS)
-- ================================================================

alter table testimonials enable row level security;
alter table projects      enable row level security;
alter table leads         enable row level security;

-- Public can read active testimonials
create policy "Public read active testimonials"
  on testimonials for select
  using (is_active = true);

-- Public can read active projects
create policy "Public read active projects"
  on projects for select
  using (is_active = true);

-- Public can insert leads (contact form)
create policy "Public insert leads"
  on leads for insert
  with check (true);

-- Authenticated admin can do everything
create policy "Admin full access testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin full access leads"
  on leads for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ================================================================
-- SAMPLE DATA — Remove in production or keep for testing
-- ================================================================

insert into testimonials (name, review, rating, location) values
  ('Suresh Mehta',      'R.K. Electricals did our entire flat wiring. The work is super clean — not a single wire visible. Very professional team, showed up on time and finished ahead of schedule.', 5, 'Borivali West, Mumbai'),
  ('Priya Nair',        'I called them for a faulty switchboard. They identified the problem in 10 minutes and fixed it safely. Honest about pricing — no hidden charges. Highly recommend!',              5, 'Kandivali, Mumbai'),
  ('Arun Deshmukh',     'Used their AMC service for our office. Monthly inspections keep everything running smoothly. No sudden electrical issues since we started. Worth every rupee.',                    5, 'Malad West, Mumbai'),
  ('Kavita Shah',       'Our interior designer recommended R.K. Electricals for our new home. The cove lighting and chandelier installation is absolutely perfect. Very skilled workers.',                  5, 'Dahisar, Mumbai'),
  ('Rakesh Tiwari',     'Builder-level work done for our apartment complex. 30+ flats, all wired on time and passed inspection first attempt. Excellent coordination by Kirit Bhai.',                     5, 'Borivali East, Mumbai');

insert into projects (title, description, category, is_active) values
  ('Modern Flat Wiring — Borivali West',    'Complete concealed wiring with modular switches for a 2BHK apartment.',              'residential', true),
  ('Office Electrical Setup — Kandivali',   'Panel setup, UPS points, and LED lighting for a 1200 sq ft office.',                 'commercial',  true),
  ('Cove & Accent Lighting — New Home',     'Designer cove lighting with LED strips and pendant installation for interior project.','residential', true),
  ('Builder Project — 24 Flat Complex',     'End-to-end rough-in to finish wiring for entire residential building.',              'builder',     true),
  ('AMC Client — Malad Commercial',         'Annual maintenance contract with quarterly inspections and priority support.',        'amc',         true);

-- ================================================================
-- ANALYTICS VIEWS
-- ================================================================

create table if not exists analytics_views (
  id          uuid primary key default gen_random_uuid(),
  visitor_id  text not null,
  path        text not null,
  created_at  timestamptz not null default now()
);

alter table analytics_views enable row level security;

-- Public can insert page views
create policy "Public insert page views"
  on analytics_views for insert
  with check (true);

-- Authenticated admin can read page views
create policy "Admin select page views"
  on analytics_views for select
  using (auth.role() = 'authenticated');

