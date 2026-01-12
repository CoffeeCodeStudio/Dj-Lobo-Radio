-- Add Live Sets video IDs to site branding
ALTER TABLE public.site_branding 
ADD COLUMN live_set_video_1 text DEFAULT NULL,
ADD COLUMN live_set_video_2 text DEFAULT NULL,
ADD COLUMN live_set_video_3 text DEFAULT NULL;