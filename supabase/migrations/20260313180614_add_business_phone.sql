-- Add phone number to business_settings
ALTER TABLE public.business_settings
ADD COLUMN IF NOT EXISTS phone TEXT;
