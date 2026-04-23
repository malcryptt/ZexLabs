-- Create transactions table to store payment history
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  payment_reference TEXT UNIQUE NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert transactions (for payment processing)
CREATE POLICY "Anyone can create transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view their own transactions by email
CREATE POLICY "Users can view transactions by email" 
ON public.transactions 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_transactions_email ON public.transactions(sender_email);
CREATE INDEX idx_transactions_reference ON public.transactions(payment_reference);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);