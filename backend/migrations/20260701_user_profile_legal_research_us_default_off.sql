-- Migration date: 2026-07-01

-- Flip the default for legal_research_us (US case-law / CourtListener
-- research tools) from enabled to disabled. This product now targets
-- Turkish legal practice by default; US case-law research should be an
-- opt-in a firm/lawyer turns on explicitly in Account > Features, not
-- something every new Turkish user gets exposed to automatically.
--
-- Only changes the column default for future inserts (new user_profiles
-- rows created via the handle_new_user trigger). Existing rows keep
-- whatever value they already have — this does not touch existing data.

ALTER TABLE public.user_profiles
  ALTER COLUMN legal_research_us SET DEFAULT false;
