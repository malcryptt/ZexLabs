-- Change image_url from single text to array of text to support multiple images
ALTER TABLE public.portfolio 
  DROP COLUMN image_url;

ALTER TABLE public.portfolio 
  ADD COLUMN image_urls TEXT[] NOT NULL DEFAULT '{}';

-- Add a check to ensure at least one image
ALTER TABLE public.portfolio 
  ADD CONSTRAINT portfolio_images_not_empty CHECK (array_length(image_urls, 1) > 0);