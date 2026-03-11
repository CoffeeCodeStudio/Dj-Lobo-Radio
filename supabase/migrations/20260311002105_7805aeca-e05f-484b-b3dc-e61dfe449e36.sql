
-- Server-side rate limiting: max 5 messages per 30 seconds per session
CREATE OR REPLACE FUNCTION public.check_chat_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  SELECT count(*) INTO recent_count
  FROM chat_messages
  WHERE session_id = NEW.session_id
    AND created_at > (now() - interval '30 seconds');

  IF recent_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Max 5 messages per 30 seconds.';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_chat_rate_limit
  BEFORE INSERT ON public.chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.check_chat_rate_limit();
