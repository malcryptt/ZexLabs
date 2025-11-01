-- Create storage bucket for transaction files
INSERT INTO storage.buckets (id, name, public)
VALUES ('transaction-files', 'transaction-files', false);

-- RLS policies for transaction-files bucket
CREATE POLICY "Admins can view all transaction files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'transaction-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can upload transaction files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'transaction-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update transaction files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'transaction-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete transaction files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'transaction-files' AND public.has_role(auth.uid(), 'admin'));