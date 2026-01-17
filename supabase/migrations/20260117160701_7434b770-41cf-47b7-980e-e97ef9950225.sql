-- Add additional video ID columns (we already have live_set_video_1, 2, 3)
ALTER TABLE public.site_branding 
ADD COLUMN IF NOT EXISTS live_set_video_4 TEXT,
ADD COLUMN IF NOT EXISTS live_set_video_5 TEXT;

-- Add Instagram post URL columns
ALTER TABLE public.site_branding 
ADD COLUMN IF NOT EXISTS instagram_post_1 TEXT,
ADD COLUMN IF NOT EXISTS instagram_post_2 TEXT,
ADD COLUMN IF NOT EXISTS instagram_post_3 TEXT,
ADD COLUMN IF NOT EXISTS instagram_post_4 TEXT,
ADD COLUMN IF NOT EXISTS instagram_post_5 TEXT,
ADD COLUMN IF NOT EXISTS instagram_post_6 TEXT;