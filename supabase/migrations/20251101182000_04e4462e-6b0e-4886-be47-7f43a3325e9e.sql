-- Add display_order column to portfolio table for drag and drop ordering
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Set initial order based on created_at (newest first gets lower order number)
UPDATE portfolio 
SET display_order = row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_number
  FROM portfolio
) AS ordered
WHERE portfolio.id = ordered.id AND portfolio.display_order IS NULL;