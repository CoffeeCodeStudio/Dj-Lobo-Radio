-- Drop and recreate view with SECURITY INVOKER (default, but explicit)
DROP VIEW IF EXISTS public.chat_messages_public;

CREATE VIEW public.chat_messages_public 
WITH (security_invoker = true)
AS
SELECT 
  id,
  nickname,
  message,
  created_at
FROM public.chat_messages;

-- Grant access to the view
GRANT SELECT ON public.chat_messages_public TO anon, authenticated;

-- Add comment explaining purpose
COMMENT ON VIEW public.chat_messages_public IS 'Public view of chat messages that hides session_id to prevent user tracking';