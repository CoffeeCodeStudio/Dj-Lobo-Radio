-- Add input validation constraints to bookings table
-- Email format validation
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Name length validation (2-100 characters)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_name_length_check
CHECK (length(name) >= 2 AND length(name) <= 100);

-- Message length validation (max 2000 characters)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_message_length_check
CHECK (message IS NULL OR length(message) <= 2000);

-- Phone format validation (optional field, 7-20 digits with optional +, spaces, dashes, parentheses)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_phone_format_check
CHECK (phone IS NULL OR phone ~* '^[+]?[0-9\s\-\(\)]{7,20}$');

-- Event type must be one of the valid options
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_event_type_check
CHECK (event_type IN ('wedding', 'corporate', 'private', 'club', 'other'));

-- Status values validation
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_status_check
CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed'));

-- Location length validation (max 200 characters)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_location_length_check
CHECK (location IS NULL OR length(location) <= 200);