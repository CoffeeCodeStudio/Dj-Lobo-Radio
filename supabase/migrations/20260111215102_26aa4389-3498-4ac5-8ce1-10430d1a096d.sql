-- Create gallery_images table for static image management
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view gallery images"
ON public.gallery_images
FOR SELECT
USING (true);

-- Admin write access
CREATE POLICY "Admins can insert gallery images"
ON public.gallery_images
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images"
ON public.gallery_images
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
ON public.gallery_images
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_gallery_images_updated_at
BEFORE UPDATE ON public.gallery_images
FOR EACH ROW
EXECUTE FUNCTION public.update_site_branding_updated_at();

-- Insert 6 placeholder images from Unsplash (DJ/music themed)
INSERT INTO public.gallery_images (image_url, alt_text, sort_order) VALUES
('https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=600&h=600&fit=crop', 'DJ mixing at a club with neon lights', 1),
('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop', 'Concert crowd with colorful stage lights', 2),
('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop', 'Festival crowd at night with purple lights', 3),
('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop', 'DJ turntable close-up', 4),
('https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=600&fit=crop', 'Live music performance with crowd', 5),
('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=600&fit=crop', 'Concert with laser lights and smoke', 6);