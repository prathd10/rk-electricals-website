-- Run this in Supabase SQL Editor
-- Creates the temporary OTP storage table used by the 2FA edge functions

CREATE TABLE IF NOT EXISTS admin_otp (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  token         TEXT        NOT NULL UNIQUE,
  email         TEXT        NOT NULL UNIQUE, -- one active OTP per email at all times
  otp_hash      TEXT        NOT NULL,
  access_token  TEXT        NOT NULL,
  refresh_token TEXT        NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  attempts      SMALLINT    DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS — no public policies means only service role (edge functions) can access this table
ALTER TABLE admin_otp ENABLE ROW LEVEL SECURITY;

-- Auto-clean expired records (optional, keeps the table tidy)
-- You can also run this manually: DELETE FROM admin_otp WHERE expires_at < NOW();
