
CREATE OR REPLACE FUNCTION public.get_cron_jobs()
RETURNS TABLE(jobname text, schedule text, command text, active boolean)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT jobname::text, schedule::text, command::text, active
  FROM cron.job
  ORDER BY jobname;
$$;
