-- Add social media fields to site_branding table
ALTER TABLE public.site_branding 
ADD COLUMN IF NOT EXISTS youtube_channel_id TEXT,
ADD COLUMN IF NOT EXISTS instagram_username TEXT,
ADD COLUMN IF NOT EXISTS instagram_access_token TEXT;