-- Add validation constraints to chat_messages table
-- These constraints enforce server-side validation that matches client-side rules

-- Nickname length constraint (2-20 characters)
ALTER TABLE public.chat_messages 
ADD CONSTRAINT chat_messages_nickname_length_check 
CHECK (length(nickname) >= 2 AND length(nickname) <= 20);

-- Message length constraint (1-200 characters)
ALTER TABLE public.chat_messages
ADD CONSTRAINT chat_messages_message_length_check
CHECK (length(message) >= 1 AND length(message) <= 200);

-- Ensure no empty strings after trim for nickname
ALTER TABLE public.chat_messages
ADD CONSTRAINT chat_messages_nickname_not_empty_check
CHECK (trim(nickname) <> '');

-- Ensure no empty strings after trim for message
ALTER TABLE public.chat_messages
ADD CONSTRAINT chat_messages_message_not_empty_check
CHECK (trim(message) <> '');