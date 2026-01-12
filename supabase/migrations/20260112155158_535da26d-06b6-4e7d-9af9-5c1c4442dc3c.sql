-- Create a view that hides session_id from public queries
CREATE OR REPLACE VIEW public.chat_messages_public AS
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