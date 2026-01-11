-- Add google_calendar_id to site_branding table
ALTER TABLE public.site_branding 
ADD COLUMN IF NOT EXISTS google_calendar_id text DEFAULT NULL;