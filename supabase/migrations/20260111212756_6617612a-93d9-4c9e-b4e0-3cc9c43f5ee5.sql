-- Add DELETE policy for admins to moderate chat messages
CREATE POLICY "Admins can delete messages"
ON chat_messages FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE policy for admins (in case they need to edit messages)
CREATE POLICY "Admins can update messages"
ON chat_messages FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));