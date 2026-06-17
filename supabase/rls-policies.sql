-- ============================================================
-- RK ELECTRICALS — SUPABASE ROW LEVEL SECURITY POLICIES
-- ============================================================
-- Run this entire script in:
--   Supabase Dashboard → SQL Editor → New query → Run
--
-- Safe to run multiple times (uses DROP IF EXISTS first).
-- ============================================================


-- ============================================================
-- TABLE: projects
-- Public  → can only read active (is_active = true) rows
-- Admin   → full access (read all, insert, update, delete)
-- ============================================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_projects"   ON projects;
DROP POLICY IF EXISTS "admin_read_all_projects"        ON projects;
DROP POLICY IF EXISTS "admin_insert_projects"          ON projects;
DROP POLICY IF EXISTS "admin_update_projects"          ON projects;
DROP POLICY IF EXISTS "admin_delete_projects"          ON projects;

-- Visitors see only published projects
CREATE POLICY "public_read_active_projects"
  ON projects FOR SELECT TO anon
  USING (is_active = true);

-- Admin sees everything (including hidden ones)
CREATE POLICY "admin_read_all_projects"
  ON projects FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_insert_projects"
  ON projects FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_projects"
  ON projects FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_delete_projects"
  ON projects FOR DELETE TO authenticated
  USING (true);


-- ============================================================
-- TABLE: testimonials
-- Public  → can only read active (is_active = true) rows
-- Admin   → full access
-- ============================================================

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_testimonials"  ON testimonials;
DROP POLICY IF EXISTS "admin_read_all_testimonials"       ON testimonials;
DROP POLICY IF EXISTS "admin_insert_testimonials"         ON testimonials;
DROP POLICY IF EXISTS "admin_update_testimonials"         ON testimonials;
DROP POLICY IF EXISTS "admin_delete_testimonials"         ON testimonials;

-- Visitors see only published reviews
CREATE POLICY "public_read_active_testimonials"
  ON testimonials FOR SELECT TO anon
  USING (is_active = true);

-- Admin sees everything
CREATE POLICY "admin_read_all_testimonials"
  ON testimonials FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_insert_testimonials"
  ON testimonials FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_testimonials"
  ON testimonials FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_delete_testimonials"
  ON testimonials FOR DELETE TO authenticated
  USING (true);


-- ============================================================
-- TABLE: leads
-- Public (anon) → INSERT only (contact form submissions)
-- Admin         → read, update status, delete
-- ============================================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_leads"   ON leads;
DROP POLICY IF EXISTS "admin_read_leads"      ON leads;
DROP POLICY IF EXISTS "admin_update_leads"    ON leads;
DROP POLICY IF EXISTS "admin_delete_leads"    ON leads;

-- Anyone can submit a contact form
CREATE POLICY "public_insert_leads"
  ON leads FOR INSERT TO anon
  WITH CHECK (true);

-- Only admin can read leads
CREATE POLICY "admin_read_leads"
  ON leads FOR SELECT TO authenticated
  USING (true);

-- Admin can update lead status (new → contacted → converted → closed)
CREATE POLICY "admin_update_leads"
  ON leads FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Admin can delete leads
CREATE POLICY "admin_delete_leads"
  ON leads FOR DELETE TO authenticated
  USING (true);


-- ============================================================
-- TABLE: analytics_views
-- Public (anon) → INSERT only (page view tracking)
-- Admin         → SELECT (to view traffic stats in dashboard)
-- ============================================================

ALTER TABLE analytics_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_analytics"  ON analytics_views;
DROP POLICY IF EXISTS "admin_read_analytics"     ON analytics_views;

-- Public visitors can log their page view
CREATE POLICY "public_insert_analytics"
  ON analytics_views FOR INSERT TO anon
  WITH CHECK (true);

-- Only admin can read analytics data
CREATE POLICY "admin_read_analytics"
  ON analytics_views FOR SELECT TO authenticated
  USING (true);


-- ============================================================
-- DONE — what each role can now do:
--
-- anon (public visitors):
--   projects         → SELECT where is_active = true
--   testimonials     → SELECT where is_active = true
--   leads            → INSERT only
--   analytics_views  → INSERT only
--
-- authenticated (admin logged in via /login):
--   projects         → SELECT all, INSERT, UPDATE, DELETE
--   testimonials     → SELECT all, INSERT, UPDATE, DELETE
--   leads            → SELECT all, UPDATE, DELETE
--   analytics_views  → SELECT all
-- ============================================================
