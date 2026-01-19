-- Fix Instagram token exposure by creating a separate admin-only secrets table
-- This separates sensitive credentials from public-readable branding data

-- Create admin-only secrets table for sensitive credentials
CREATE TABLE IF NOT EXISTS public.site_secrets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instagram_access_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_secrets ENABLE ROW LEVEL SECURITY;

-- Only admins can access secrets (no public read!)
CREATE POLICY "Admins can read secrets"
ON public.site_secrets FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert secrets"
ON public.site_secrets FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update secrets"
ON public.site_secrets FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete secrets"
ON public.site_secrets FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add updated_at trigger
CREATE TRIGGER update_site_secrets_updated_at
BEFORE UPDATE ON public.site_secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Migrate existing instagram_access_token data to new table (if any exists)
INSERT INTO public.site_secrets (instagram_access_token)
SELECT instagram_access_token FROM public.site_branding WHERE instagram_access_token IS NOT NULL LIMIT 1;

-- Remove sensitive column from public-readable table
ALTER TABLE public.site_branding DROP COLUMN IF EXISTS instagram_access_token;