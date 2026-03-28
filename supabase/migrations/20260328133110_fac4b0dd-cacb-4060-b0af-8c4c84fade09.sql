
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

-- Grant usage to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;

-- Remove existing jobs if they exist (idempotent)
SELECT cron.unschedule('cleanup-contact-submissions') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-contact-submissions');
SELECT cron.unschedule('cleanup-old-bookings') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'cleanup-old-bookings');

-- Job 1: Delete contact_submissions older than 1 hour, every 15 minutes
SELECT cron.schedule(
  'cleanup-contact-submissions',
  '*/15 * * * *',
  $$DELETE FROM public.contact_submissions WHERE created_at < now() - interval '1 hour'$$
);

-- Job 2: Delete bookings older than 24 months, 1st of every month at 03:00
SELECT cron.schedule(
  'cleanup-old-bookings',
  '0 3 1 * *',
  $$DELETE FROM public.bookings WHERE created_at < now() - interval '24 months'$$
);
