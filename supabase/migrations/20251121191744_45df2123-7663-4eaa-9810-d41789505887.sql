-- Add address column to transactions table
ALTER TABLE public.transactions 
ADD COLUMN address text;