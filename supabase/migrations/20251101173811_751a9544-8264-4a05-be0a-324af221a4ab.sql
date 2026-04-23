-- Create portfolio table
CREATE TABLE public.portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  project_url TEXT,
  technologies TEXT[],
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Public can view portfolio items
CREATE POLICY "Anyone can view portfolio items" 
ON public.portfolio 
FOR SELECT 
USING (true);

-- Admins can insert portfolio items
CREATE POLICY "Admins can insert portfolio items" 
ON public.portfolio 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update portfolio items
CREATE POLICY "Admins can update portfolio items" 
ON public.portfolio 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete portfolio items
CREATE POLICY "Admins can delete portfolio items" 
ON public.portfolio 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_updated_at
BEFORE UPDATE ON public.portfolio
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage policies for portfolio images
CREATE POLICY "Anyone can view portfolio images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update portfolio images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete portfolio images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);