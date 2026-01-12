-- Add YouTube video ID to site branding
ALTER TABLE public.site_branding 
ADD COLUMN youtube_video_id text DEFAULT 'XqZsoesa55w';